import React, { useState } from "react";
import { motion } from "framer-motion";
import { config } from '@/config';
import { Button, Typography, Switch } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
  ServerIcon,
  BellIcon,
  FingerPrintIcon,
  GlobeAltIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { PageTitle, Footer } from "@/widgets/layout";

// Stripe Payment Modal Component
const StripePaymentModal = ({ plan, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  // Get client user data from localStorage
  const clientUser = JSON.parse(localStorage.getItem("clientUser"));
  const subscriptions = clientUser?.subscriptions || [];

  // Find the latest active subscription (with end date after current date)
  const getLatestActiveSubscription = () => {
    if (!subscriptions.length) return null;

    const now = new Date();
    const activeSubscriptions = subscriptions.filter(sub => {
      const endDate = new Date(sub.end_date);
      return endDate > now;
    });

    if (!activeSubscriptions.length) return null;

    // Sort by end_date descending to get the latest one
    activeSubscriptions.sort((a, b) =>
        new Date(b.end_date) - new Date(a.end_date)
    );

    return activeSubscriptions[0];
  };

  const latestActiveSubscription = getLatestActiveSubscription();
  const hasActiveSubscription = !!latestActiveSubscription;

  const [customerDetails, setCustomerDetails] = useState({
    name: clientUser?.user?.name || '',
    email: clientUser?.user?.email || '',
    phone: clientUser?.user?.phone || '',
    package_type: plan.title.toLowerCase(),
    duration: plan.period === 'year' ? 'yearly' : 'monthly',
    // Set default based on whether user has existing subscription
    startNow: !hasActiveSubscription,
    startOnExpiry: hasActiveSubscription ? false : false,
    // Include subscription details if available
    existing_subscription_id: hasActiveSubscription ? latestActiveSubscription.id : null,
    existing_subscription_end_date: hasActiveSubscription ? latestActiveSubscription.end_date : null
  });

  // Handle checkbox changes (make them radio-like - only one selectable)
  const handleDateOptionChange = (option) => {
    setCustomerDetails(prev => ({
      ...prev,
      startNow: option === 'now',
      startOnExpiry: option === 'expiry'
    }));
  };

  // Create PaymentIntent when component mounts
  React.useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/create-payment-intent`,
            {
              amount: plan.price * 100,
              currency: 'aed',
              plan: plan.title,
              billing: plan.period,
              // Include package_date in the request
              package_date: customerDetails.startNow ? 'now' : 'expiry',
              // Include existing subscription details if available
              existing_subscription_id: customerDetails.existing_subscription_id,
              existing_subscription_end_date: customerDetails.existing_subscription_end_date
            }
        );
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      }
    };

    createPaymentIntent();
  }, [plan, customerDetails.startNow, customerDetails.startOnExpiry]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);

    try {
      // Validate customer details
      if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
        throw new Error('Please fill in all customer details');
      }

      if (!/^\S+@\S+\.\S+$/.test(customerDetails.email)) {
        throw new Error('Please enter a valid email address');
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: customerDetails.name,
                email: customerDetails.email,
                phone: customerDetails.phone
              }
            },
          }
      );

      if (stripeError) throw stripeError;

      if (paymentIntent.status === 'succeeded') {
        // Save customer details to backend
        await axios.post(`http://127.0.0.1:8000/api/save-customer-details`, {
          ...customerDetails,
          payment_intent_id: paymentIntent.id,
          amount: plan.price,
          currency: 'aed',
          client_id: clientUser?.user?.id,
          package_date: customerDetails.startNow ? 'now' : 'expiry',
          // Include existing subscription details if available
          existing_subscription_id: customerDetails.existing_subscription_id,
          existing_subscription_end_date: customerDetails.existing_subscription_end_date
        });

        setPaymentSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };


  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
          <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {paymentSuccess ? (
              <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <Typography variant="h3" className="text-2xl font-bold mb-2">
                  Payment Successful!
                </Typography>
                <Typography className="text-gray-600 mb-6">
                  Thank you for subscribing to {plan.title} plan.
                </Typography>
                <Button
                    onClick={onClose}
                    color="green"
                    className="w-full"
                >
                  Continue to Dashboard
                </Button>
              </div>
          ) : (
              <>
                <Typography variant="h3" className="text-2xl font-bold mb-4">
                  Subscribe to {plan.title} Plan
                </Typography>
                <Typography className="text-xl font-semibold mb-6">
                  AED {plan.price}/{plan.period}
                </Typography>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name On Card
                      </label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={customerDetails.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Confirmation
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          value={customerDetails.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100 cursor-not-allowed"
                          required
                          readOnly
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={customerDetails.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Package Type
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                          {customerDetails.package_type}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                          {customerDetails.duration}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Package Starting Date
                      </label>

                      <div className="mt-2 space-x-4">
                        <label className="inline-flex items-center">
                          <input
                              type="radio"
                              name="package_date"
                              checked={customerDetails.startNow}
                              onChange={() => handleDateOptionChange('now')}
                              disabled={!hasActiveSubscription} // Disable if no existing subscription
                              className="form-radio text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">Now</span>
                        </label>

                        {hasActiveSubscription && (
                            <label className="inline-flex items-center">
                              <input
                                  type="radio"
                                  name="package_date"
                                  checked={customerDetails.startOnExpiry}
                                  onChange={() => handleDateOptionChange('expiry')}
                                  className="form-radio text-blue-600"
                              />
                              <span className="ml-2 text-gray-700">On Expiry</span>
                            </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Details
                    </label>
                    <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                        className="p-3 border rounded-lg"
                    />
                  </div>

                  {error && (
                      <div className="text-red-500 mb-4 text-sm">
                        {error}
                      </div>
                  )}

                  <Button
                      type="submit"
                      disabled={!stripe || loading || !clientSecret}
                      className="w-full"
                  >
                    {loading ? 'Processing...' : `Pay AED ${plan.price}`}
                  </Button>
                </form>
              </>
          )}
        </div>
      </div>
  );
};

// PricingCard Component
const PricingCard = ({ title, price, period, features, popular, onSelect }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const clientId = localStorage.getItem("clientId");
  const [hovered, setHovered] = useState(false);

  const handleSubscribeClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/signin'; // Redirect to signin page if not logged in
      return;
    }
    onSelect(); // Call the original onSelect if logged in
  };

  return (
      <motion.div
          whileHover={{ y: -10 }}
          animate={hovered ? { scale: 1.02 } : { scale: 1 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className={`relative rounded-2xl border ${popular ? 'border-blue-500 bg-gradient-to-b from-blue-50 to-white' : 'border-gray-200 bg-white'} shadow-lg overflow-hidden transition-all duration-300`}
      >
        {popular && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 transform translate-x-2 translate-y-2 rotate-12">
              MOST POPULAR
            </div>
        )}

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Typography variant="h3" className={`text-2xl font-bold ${popular ? 'text-blue-600' : 'text-gray-800'}`}>
              {title}
            </Typography>
            {popular && (
                <div className="bg-blue-100 rounded-full p-2">
                  <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                </div>
            )}
          </div>

          <div className="mb-8">
            <Typography variant="h1" className="text-5xl font-extrabold text-gray-900 mb-2">
              AED {price}
              <span className="text-xl font-medium text-gray-500">/{period}</span>
            </Typography>
          </div>

          <Tooltip
              content={!isLoggedIn ? "First Sign in or Signup to Subscribe the Package" : ""}
              placement="top"
              disabled={isLoggedIn}
          >
          <span>
            <Button
                onClick={handleSubscribeClick}
                size="lg"
                fullWidth
                className={`mb-8 rounded-lg ${
                    popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-900"
                } text-white font-bold py-3`}
            >
              Subscribe Now
            </Button>
          </span>
          </Tooltip>

          <div className="space-y-4">
            {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <Typography className="text-gray-700">{feature}</Typography>
                </div>
            ))}
          </div>
        </div>
      </motion.div>
  );
};

// Feature Comparison Table
const FeatureComparison = () => {
  const features = [
    {
      name: "Visitor Check-in",
      tiers: {
        basic: true,
        professional: true,
        enterprise: true
      }
    },
    {
      name: "Host Notifications",
      tiers: {
        basic: "Email only",
        professional: "Email & SMS",
        enterprise: "Email, SMS, WhatsApp"
      }
    },
    {
      name: "Visitor Capacity",
      tiers: {
        basic: "Up to 200/mo",
        professional: "Unlimited",
        enterprise: "Unlimited"
      }
    },
    {
      name: "Custom Integrations",
      tiers: {
        basic: false,
        professional: false,
        enterprise: true
      }
    },
    {
      name: "Visitor Analytics",
      tiers: {
        basic: "Basic",
        professional: "Advanced",
        enterprise: "Premium + API"
      }
    },
    {
      name: "Support",
      tiers: {
        basic: "Email",
        professional: "Email & Chat",
        enterprise: "24/7 Priority"
      }
    }
  ];

  return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
          <tr className="border-b border-gray-200">
            <th className="py-6 px-6 text-left font-medium text-gray-500">Features</th>
            <th className="py-6 px-6 text-center font-medium text-gray-500">Basic</th>
            <th className="py-6 px-6 text-center font-medium text-blue-600">Professional</th>
            <th className="py-6 px-6 text-center font-medium text-gray-500">Enterprise</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {features.map((feature, index) => (
              <tr key={index}>
                <td className="py-5 px-6 text-gray-700 font-medium">{feature.name}</td>
                <td className="py-5 px-6 text-center">
                  {typeof feature.tiers.basic === 'boolean' ? (
                      feature.tiers.basic ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                          <span className="text-gray-400">—</span>
                      )
                  ) : (
                      <span className="text-gray-700">{feature.tiers.basic}</span>
                  )}
                </td>
                <td className="py-5 px-6 text-center bg-blue-50">
                  {typeof feature.tiers.professional === 'boolean' ? (
                      feature.tiers.professional ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                          <span className="text-gray-400">—</span>
                      )
                  ) : (
                      <span className="text-gray-700">{feature.tiers.professional}</span>
                  )}
                </td>
                <td className="py-5 px-6 text-center">
                  {typeof feature.tiers.enterprise === 'boolean' ? (
                      feature.tiers.enterprise ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-500 mx-auto" />
                      ) : (
                          <span className="text-gray-400">—</span>
                      )
                  ) : (
                      <span className="text-gray-700">{feature.tiers.enterprise}</span>
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

// Feature Highlight Component
const FeatureHighlight = ({ icon, title, description }) => {
  const IconComponent = icon;
  return (
      <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <IconComponent className="h-6 w-6 text-blue-600" />
          </div>
          <Typography variant="h4" className="text-lg font-bold text-gray-800">
            {title}
          </Typography>
        </div>
        <Typography className="text-gray-600">
          {description}
        </Typography>
      </motion.div>
  );
};

// Main Component
export default function AboutPackage() {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const stripePromise = loadStripe(config.STRIPE_PUB_KEY);

  const pricingPlans = [
    {
      title: "Basic",
      monthlyPrice: "40",
      annualPrice: "36",
      period: "month",
      features: [
        "Up to 200 visitor check-ins/month",
        "Email notifications",
        "Basic visitor logs",
        "Email support"
      ]
    },
    {
      title: "Professional",
      monthlyPrice: "80",
      annualPrice: "72",
      period: "month",
      features: [
        "Unlimited visitor check-ins",
        "Email & SMS notifications",
        "Advanced analytics",
        "System Fields Configuration",
        "Priority chat support"
      ],
      popular: true
    },
    {
      title: "Enterprise",
      monthlyPrice: "120",
      annualPrice: "108",
      period: "month",
      features: [
        "Unlimited everything",
        "Custom integrations",
        "System Fields Configuration",
        "Background Image options",
        "24/7 priority support",
        "Custom workflows"
      ]
    }
  ];

  const features = [
    {
      icon: FingerPrintIcon,
      title: "Secure Check-in",
      description: "Ensure safety by capturing complete visitor details for a seamless and secure entry process."
    },
    {
      icon: BellIcon,
      title: "Host Notifications",
      description: "Instant alerts via email or SMS notify hosts the moment a visitor arrives."
    },
    {
      icon: ChartBarIcon,
      title: "Powerful Analytics",
      description: "Gain insights into visitor trends, peak hours, and access intuitive visual reports with ease."
    },
    {
      icon: CogIcon,
      title: "Flexible Configuration",
      description: "Easily customize visible fields to suit your requirements with dynamic form control."
    },
    {
      icon: ServerIcon,
      title: "Reliable Infrastructure",
      description: "Built on a stable, user-friendly interface designed for efficiency and clarity."
    },
    {
      icon: GlobeAltIcon,
      title: "24/7 Support",
      description: "Get round-the-clock assistance through both email and live chat whenever you need help."
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan({
      title: plan.title,
      price: annualBilling ? plan.annualPrice : plan.monthlyPrice,
      period: annualBilling ? 'year' : 'month',
      packageType: plan.title.toLowerCase()
    });
    setShowPaymentModal(true);
  };

  return (
      <>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-blue-400"
                    style={{
                      width: `${Math.random() * 300 + 100}px`,
                      height: `${Math.random() * 300 + 100}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0.1,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                />
            ))}
          </div>

          <div className="container mx-auto px-6 py-24 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
              <Typography variant="h1" className="text-5xl md:text-7xl font-bold text-white mb-6">
                Simple, <span className="text-blue-200">Transparent</span> Pricing
              </Typography>
              <Typography className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                No hidden fees. Choose the plan that works for your organization and scale as you grow.
              </Typography>

              {/* Billing toggle */}
              <motion.div
                  className="flex items-center justify-center mb-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
              >
                <Typography className="mr-4 text-white font-medium">Monthly</Typography>
                <Switch
                    checked={annualBilling}
                    onChange={() => setAnnualBilling(!annualBilling)}
                    color="blue"
                    className="bg-gray-400"
                    containerProps={{
                      className: "mx-2",
                    }}
                    circleProps={{
                      className: "before:hidden left-1.5 border-2",
                    }}
                />
                <Typography className="ml-4 text-white font-medium">
                  Annual <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">Save 10%</span>
                </Typography>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="relative py-20 px-6 bg-gray-50 -mt-16 z-20">
          <div className="container mx-auto max-w-7xl">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-3 gap-8"
            >
              {pricingPlans.map((plan, index) => (
                  <PricingCard
                      key={index}
                      title={plan.title}
                      price={annualBilling ? plan.annualPrice : plan.monthlyPrice}
                      period={annualBilling ? 'year' : 'month'}
                      features={plan.features}
                      popular={plan.popular}
                      onSelect={() => handlePlanSelect(plan)}
                  />
              ))}
            </motion.div>

            {/* Enterprise CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16 bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm"
            >
              <div className="max-w-2xl mx-auto">
                <Typography variant="h2" className="text-3xl font-bold text-gray-800 mb-4">
                  Need something more?
                </Typography>
                <Typography className="text-gray-600 mb-6">
                  Our enterprise plan offers custom solutions for large organizations with complex requirements.
                </Typography>
                <Button
                    size="lg"
                    variant="outlined"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 font-bold rounded-lg px-8 py-3"
                    onClick={() => (window.location.href = "/Contact")}
                >
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
              <Typography variant="h2" className="text-4xl font-bold text-gray-900 mb-4">
                Plan <span className="text-blue-600">Comparison</span>
              </Typography>
              <Typography className="text-gray-600 max-w-2xl mx-auto">
                See how our plans stack up against each other
              </Typography>
            </motion.div>

            <FeatureComparison />
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
              <Typography variant="h2" className="text-4xl font-bold text-gray-900 mb-4">
                Powerful <span className="text-blue-600">Features</span>
              </Typography>
              <Typography className="text-gray-600 max-w-2xl mx-auto">
                Everything you need for modern visitor management
              </Typography>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                  <FeatureHighlight
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                  />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              <Typography variant="h2" className="text-4xl font-bold text-white mb-6">
                Ready to <span className="text-blue-200">Elevate</span> Your Visitor Experience?
              </Typography>
              <Typography className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
                Join thousands of organizations using SmartVisitor for secure, efficient visitor management.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                      size="lg"
                      className="bg-white text-blue-800 font-bold rounded-lg px-8 py-4 shadow-lg"
                      onClick={() => (window.location.href = "/Contact")}
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                      variant="outlined"
                      size="lg"
                      className="text-white border-2 border-white hover:bg-white/10 font-bold rounded-lg px-8 py-4"
                      onClick={() => {
                        window.location.href = "/AppDemo";
                      }}
                  >
                    Schedule Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stripe Payment Modal */}
        {showPaymentModal && (
            <Elements stripe={stripePromise}>
              <StripePaymentModal
                  plan={selectedPlan}
                  onClose={() => setShowPaymentModal(false)}
              />
            </Elements>
        )}

        <Footer />
      </>
  );
}
