import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Switch } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  ServerIcon,
  BellIcon,
  ClockIcon,
  FingerPrintIcon,
  CalendarIcon,
  DocumentTextIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import { PageTitle, Footer } from "@/widgets/layout";

const PricingCard = ({ title, price, period, features, popular, annualPrice, onSelect }) => {
  const [hovered, setHovered] = useState(false);

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
              {/*AED{price}*/} Free Trial
              <span className="text-xl font-medium text-gray-500">/{period}</span>
            </Typography>
            {annualPrice && (
                <Typography className="text-sm text-gray-500">
                  {/*AED{annualPrice} annually (save 20%)*/}
                </Typography>
            )}
          </div>

          <Button
              onClick={onSelect}
              size="lg"
              fullWidth
              className={`mb-8 rounded-lg ${popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} text-white font-bold py-3`}
          >
            Get Started
          </Button>

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
        enterprise: "Email, SMS"
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
      name: "Custom integrations",
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
        enterprise: "Premium"
      }
    },
    {
      name: "System Configuration",
      tiers: {
        basic: "Standard",
        professional: "Enhanced",
        enterprise: "Enterprise-grade"
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

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingPlans = [
    {
      title: "Basic",
      monthlyPrice: "500",
      annualPrice: "450",
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
      monthlyPrice: "1000",
      annualPrice: "800",
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
      monthlyPrice: "1500",
      annualPrice: "1250",
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


  return (
      <>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 overflow-hidden">
          {/* Animated background elements */}
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
                  Annual <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">Save 20%</span>
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
                      period={plan.period}
                      features={plan.features}
                      popular={plan.popular}
                      annualPrice={annualBilling ? null : `${plan.annualPrice * 12}`}
                      onSelect={() => setSelectedPlan(plan.title)}
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
                    onClick={() => (window.location.href = "/Contact")}>
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

        {/* Testimonials */}
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
                Trusted by <span className="text-blue-600">Leading</span> Organizations
              </Typography>
              <Typography className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of companies transforming their visitor experience
              </Typography>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "SmartVisitor reduced our check-in times by 75% and eliminated our paper logs completely.",
                  author: "Sarah K., Office Manager",
                  company: "TechForward Inc."
                },
                {
                  quote: "The analytics helped us optimize our front desk staffing and improve visitor satisfaction.",
                  author: "Michael T., Security Director",
                  company: "Urban Properties"
                },
                {
                  quote: "Implementation was seamless and our visitors love the professional experience.",
                  author: "Priya M., Facilities Coordinator",
                  company: "Global Consulting"
                }
              ].map((testimonial, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      ))}
                    </div>
                    <Typography className="text-gray-700 italic mb-6">
                      "{testimonial.quote}"
                    </Typography>
                    <div>
                      <Typography className="font-bold text-gray-800">{testimonial.author}</Typography>
                      <Typography className="text-gray-600">{testimonial.company}</Typography>
                    </div>
                  </motion.div>
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
                      onClick={() => (window.location.href = "/Contact")}>
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
                      }}>
                    Schedule Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </>
  );
}
