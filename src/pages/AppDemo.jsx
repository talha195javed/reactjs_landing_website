import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button, Typography, Input, Textarea } from "@material-tailwind/react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon
} from "@heroicons/react/24/outline";
import { PageTitle, Footer } from "@/widgets/layout";

export default function RequestDemoPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "I would like to request a demo of SmartVisitor"
  });

  const [clientInfo, setClientInfo] = useState({
    ip_address: "",
    user_agent: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Get client IP and user agent when component mounts
  useEffect(() => {
    const getUserIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setClientInfo({
          ip_address: data.ip || "",
          user_agent: navigator.userAgent
        });
      } catch (error) {
        console.log("IP detection failed, using fallback");
        setClientInfo({
          ip_address: "",
          user_agent: navigator.userAgent
        });
      }
    };

    getUserIP();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submissionData = {
        ...formData,
        ...clientInfo,
        demo_request: true
      };

      const response = await fetch('http://127.0.0.1:8000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitStatus('success');
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "I would like to request a demo of SmartVisitor"
      });

    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <MapPinIcon className="w-8 h-8 text-blue-500" />,
      title: "Our Headquarters",
      details: "Alfutaim Office Tower Day to Day building\n" +
          "\n" +
          "1st floor - Office 102 Smart Hub HQ, Dubai, UAE",
    },
    {
      icon: <PhoneIcon className="w-8 h-8 text-blue-500" />,
      title: "Contact Support",
      details: "+971 50 440 6565\n24/7 Global Support Team",
    },
    {
      icon: <EnvelopeIcon className="w-8 h-8 text-blue-500" />,
      title: "Email Us",
      details: "hello@smartclassic.ae",
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-blue-500" />,
      title: "Business Hours",
      details: "Monday - Friday: 8am - 6pm PST\nEmergency support available 24/7",
    }
  ];

  const demoFeatures = [
    {
      icon: <CalendarIcon className="w-10 h-10 text-blue-600" />,
      title: "Schedule Your Demo",
      description: "Choose a convenient time for your personalized walkthrough of our platform."
    },
    {
      icon: <UserGroupIcon className="w-10 h-10 text-blue-600" />,
      title: "Tailored to Your Needs",
      description: "See how SmartVisitor can address your specific visitor management challenges."
    },
    {
      icon: <ShieldCheckIcon className="w-10 h-10 text-blue-600" />,
      title: "Security Focused",
      description: "Learn about our enterprise-grade security features and compliance standards."
    },
    {
      icon: <DevicePhoneMobileIcon className="w-10 h-10 text-blue-600" />,
      title: "Mobile Experience",
      description: "See our mobile apps in action for both visitors and your security team."
    }
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '16px',
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  return (
      <>
        {/* Fixed Hero Section */}
        <section className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-0 overflow-hidden">
          {/* Enhanced Background with Parallax Effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-110"
                style={{
                  backgroundImage: "url('/img/main-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  willChange: "transform",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
            >
              {/* Multi-layer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/60 to-indigo-900/80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>

              {/* Subtle Animated Particles */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          width: `${Math.random() * 6 + 2}px`,
                          height: `${Math.random() * 6 + 2}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                          animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
              </div>
            </div>
          </div>

          {/* Hero Content with Enhanced Styling */}
          <motion.div
              className="relative z-20 text-center px-4 w-full"
              style={{ opacity, y }}
          >
            <div className="container mx-auto px-4 py-12">
              {/* Animated Title with Gradient Text */}
              <motion.h1
                  className="text-5xl sm:text-7xl md:text-8xl font-bold leading-tight text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
              >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                Request a Demo
              </span>
                <br />
                <span className="text-white">Experience SmartVisitor</span>
                <br />
                <span className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 tracking-wide">
                First-Hand
              </span>
              </motion.h1>

              {/* Mission Statement */}
              <motion.div
                  className="max-w-4xl mx-auto mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <svg
                      className="w-10 h-10 mb-4 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">See It In Action</h2>
                  <p className="text-lg text-blue-100">
                    Our 30-minute demo will show you how SmartVisitor can transform your visitor management and security processes.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-white cursor-pointer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </section>

        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
        `}</style>

        <div ref={containerRef} className="relative z-10 mt-[48vh] bg-white">
          <section className="py-20 px-6 bg-white">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col lg:flex-row gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2"
                >
                  <Typography variant="h2" className="text-4xl font-bold text-gray-900 mb-6">
                    Schedule Your <span className="text-blue-600">Personalized Demo</span>
                  </Typography>
                  <Typography className="text-gray-600 mb-8">
                    Fill out this form to schedule a 30-minute demo with one of our specialists. We'll show you how SmartVisitor can:
                  </Typography>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Streamline your visitor check-in process</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Enhance facility security</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Provide digital visitor badges</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Integrate with your existing systems</span>
                    </li>
                  </ul>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                          type="text"
                          name="name"
                          label="Your Name"
                          size="lg"
                          value={formData.name}
                          onChange={handleChange}
                          required
                      />
                      <Input
                          type="email"
                          name="email"
                          label="Email Address"
                          size="lg"
                          value={formData.email}
                          onChange={handleChange}
                          required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                          type="tel"
                          name="phone"
                          label="Phone Number"
                          size="lg"
                          value={formData.phone}
                          onChange={handleChange}
                      />
                      <Input
                          type="text"
                          name="company"
                          label="Company Name"
                          size="lg"
                          value={formData.company}
                          onChange={handleChange}
                      />
                    </div>
                    <Textarea
                        name="message"
                        label="Anything specific you'd like to see?"
                        size="lg"
                        value={formData.message}
                        onChange={handleChange}
                    />

                    {isSubmitting && (
                        <div className="text-center py-4">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                          <p className="mt-2 text-blue-600">Scheduling your demo...</p>
                        </div>
                    )}

                    {submitStatus === 'success' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 flex items-start">
                          <CheckCircleIcon className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                          <p>Thank you for your demo request! Our team will contact you shortly to schedule your session.</p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-start">
                          <ExclamationCircleIcon className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                          <p>There was an error submitting your request. Please try again.</p>
                        </div>
                    )}

                    {!isSubmitting && submitStatus !== 'success' && (
                        <div className="pt-2">
                          <Button
                              type="submit"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold py-4"
                              size="lg"
                          >
                            Request Demo
                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                          </Button>
                        </div>
                    )}
                  </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2"
                >
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                    <Typography variant="h3" className="text-2xl font-bold text-gray-800 mb-8">
                      What to Expect in Your Demo
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {demoFeatures.map((feature, index) => (
                          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center mb-3">
                              <div className="p-2 bg-blue-50 rounded-lg mr-4">
                                {feature.icon}
                              </div>
                              <Typography variant="h4" className="text-lg font-semibold text-gray-800">
                                {feature.title}
                              </Typography>
                            </div>
                            <Typography className="text-gray-600">
                              {feature.description}
                            </Typography>
                          </div>
                      ))}
                    </div>

                    <div className="space-y-8">
                      <Typography variant="h3" className="text-2xl font-bold text-gray-800 mb-4">
                        Contact Information
                      </Typography>
                      {contactMethods.map((method, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg mr-6">
                              {method.icon}
                            </div>
                            <div>
                              <Typography variant="h4" className="text-lg font-semibold text-gray-800 mb-2">
                                {method.title}
                              </Typography>
                              <Typography className="text-gray-600 whitespace-pre-line">
                                {method.details}
                              </Typography>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200">
                    <LoadScript googleMapsApiKey="AIzaSyAPe7DZUCghCVkrZHPlkttSVah5XO1Q3U8">
                      <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          center={center}
                          zoom={15}
                      >
                        <Marker position={center} />
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/img/main-bg.jpg')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 animate-[shimmer_8s_linear_infinite]"></div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
              >
                <Typography variant="h2" className="text-4xl font-bold text-white mb-8">
                  Not Ready for a Demo Yet?
                </Typography>
                <Typography className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
                  Explore our resources to learn more about SmartVisitor's capabilities.
                </Typography>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        size="lg"
                        className="bg-white text-blue-800 font-bold rounded-lg px-8 py-4 shadow-lg"
                    >
                      View Product Tour
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="outlined"
                        size="lg"
                        className="text-white border-2 border-white hover:bg-white/10 font-bold rounded-lg px-8 py-4"
                    >
                      Download Brochure
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </div>
      </>
  );
}
