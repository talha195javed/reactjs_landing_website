import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@material-tailwind/react";
import CountUp from 'react-countup';
import {
  FingerPrintIcon,
  UsersIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ClockIcon,
  QrCodeIcon,
  BuildingOffice2Icon,
  ArrowRightIcon
} from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";

const FeatureCard = ({ icon, title, description, color, index }) => {
  return (
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:border-transparent relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"
             style={{ backgroundImage: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)` }}>
        </div>
        <div className="relative z-10">
          <div className={`w-14 h-14 rounded-xl mb-6 bg-gradient-to-br ${color.from} ${color.to} flex items-center justify-center shadow-md`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="mt-6">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center group-hover:translate-x-2 transition-transform"
                    onClick={() => (window.location.href = "/Contact")}>
              Learn more
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </motion.div>
  );
};

const FeatureHighlight = ({ title, description, features, image, reverse = false }) => {
  return (
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 py-20`}>
        <div className="lg:w-1/2">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h3>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="space-y-6">
            {features.map((feature, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors">{feature}</p>
                </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img
                src={image}
                alt={title}
                className="w-full h-auto"
            />
          </div>
        </div>
      </div>
  );
};

export function Feature() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

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
            <div className="container mx-auto">
              {/* Animated Title with Gradient Text */}
              <motion.h1
                  className="text-5xl sm:text-7xl md:text-8xl font-bold leading-tight text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
              >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                                Smart Visitor
                            </span>
                <br />
                <span className="text-white">Features</span>
                <br />
                <span className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 tracking-wide">
                                Powerful Tools for Every Need
                            </span>
              </motion.h1>

              {/* Enhanced Description with Icon */}
              <motion.p
                  className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
              >
                <svg
                    className="w-6 h-6 inline-block mr-2 -mt-1 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Discover the comprehensive suite of features designed to revolutionize your visitor management system with cutting-edge technology.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Scrollable Content */}
        <div ref={containerRef} className="relative z-10 mt-[100vh] bg-white">
          {/* Features Overview Section */}
          <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] -mr-[400px] -mt-[400px] bg-blue-100/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative">
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
              >
                            <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100/50 rounded-full mb-4 border border-blue-200 backdrop-blur-sm">
                                Comprehensive Feature Set
                            </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Everything You Need for <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Seamless Visitor Management</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our platform combines security, efficiency, and user experience in one powerful solution.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <FingerPrintIcon className="w-8 h-8" />,
                    title: "Secure Check-in",
                    description: "Ensure safety by capturing complete visitor details for a seamless and secure entry process.",
                      color: { from: "from-indigo-500", to: "to-indigo-600" }
                  },
                  {
                    icon: <QrCodeIcon className="w-8 h-8" />,
                    title: "QR Code Check-In",
                    description: "Visitors can check-in instantly using on-site QR codes.",
                      color: { from: "from-indigo-500", to: "to-indigo-600" }
                  },
                  {
                    icon: <ShieldCheckIcon className="w-8 h-8" />,
                    title: "Reliable Infrastructure",
                    description: "Built on a stable, user-friendly interface designed for efficiency and clarity.",
                      color: { from: "from-indigo-500", to: "to-indigo-600" }
                  },
                  {
                    icon: <UsersIcon className="w-8 h-8" />,
                    title: "Host Notifications",
                    description: "Instant alerts to hosts when their visitors arrive via email, SMS notification.",
                      color: { from: "from-indigo-500", to: "to-indigo-600" }
                  },
                  {
                    icon: <ChartBarIcon className="w-8 h-8" />,
                    title: "Advanced Analytics",
                    description: "Comprehensive dashboards with visitor trends, peak times, and facility utilization.",
                      color: { from: "from-indigo-500", to: "to-indigo-600" }
                  },
                  {
                    icon: <BuildingOffice2Icon className="w-8 h-8" />,
                    title: "24/7 Support",
                    description: "Get round-the-clock assistance through both email and live chat whenever you need help.",
                    color: { from: "from-indigo-500", to: "to-indigo-600" }
                  }
                ].map((feature, index) => (
                    <FeatureCard key={index} index={index} {...feature} />
                ))}
              </div>
            </div>
          </section>

          {/* Feature Highlights Section */}
          <section className="bg-white">
            <div className="container mx-auto px-4">
              <FeatureHighlight
                  title="Smart Check-In Experience"
                  description="Transform your visitor arrival process with our intuitive check-in system that adapts to your security needs and brand identity."
                  features={[
                    "Pre Register Visitor Option",
                    "CheckIn and CheckOut Easy and User Friendly Flows",
                    "Pre-registration by Admin",
                    "Accessibility features for all users"
                  ]}
                  image="/img/checkin-feature.jpg"
              />

              <FeatureHighlight
                  title="Advanced Security Controls"
                  description="Protect your premises with our comprehensive security features that work silently in the background."
                  features={[
                    "Real-time Visitor Records",
                    "ID Capture and Facial Image Capture",
                    "User Agreement "
                  ]}
                  image="/img/security-feature.jpg"
                  reverse
              />

              <FeatureHighlight
                  title="Comprehensive Visitor Analytics"
                  description="Gain valuable insights into your visitor patterns and facility usage with our powerful analytics dashboard."
                  features={[
                    "Real-time visitor tracking",
                    "Complete Visitors History",
                    "Separate Dashboard for CheckIn and Checkout Users",
                    "Option for Editing Visitor Details"
                  ]}
                  image="/img/analytics-feature.jpg"
              />
            </div>
          </section>

          {/* Integration Section */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                            <span className="inline-block px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100/50 rounded-full mb-4 border border-indigo-200 backdrop-blur-sm">
                                Seamless Integration
                            </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Works With Your Existing <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Tools and Systems</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  SmartVisitor integrates with your current infrastructure to provide a unified experience.
                </p>
              </div>

            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('/img/grid-pattern-white.svg')]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { number: 99, suffix: "%", label: "Reduction in Check-In Time" },
                  { number: 100, suffix: "%", label: "ID Verification Accuracy" },
                  { number: 85, suffix: "%", label: "Reduction in Front Desk Workload" },
                  { number: 70, suffix: "%", label: "Increase in Visitor Satisfaction" }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-colors text-center"
                    >
                      <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent">
                        <CountUp end={stat.number} duration={3} />{stat.suffix}
                      </div>
                      <div className="text-lg opacity-90">{stat.label}</div>
                    </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/img/dot-pattern.svg')]"></div>
              <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-[80px]"></div>
              <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Ready to Transform Your Visitor Management?
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                  Experience the power of SmartVisitor with a personalized demo tailored to your organization's needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                      size="lg"
                      onClick={() => {
                          window.location.href = "/AppDemo";
                      }}>
                    Request Demo
                  </Button>
                  <Button
                      variant="outlined"
                      className="px-8 py-4 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-xl text-lg font-semibold backdrop-blur-sm transition-all"
                      size="lg"
                      onClick={() => (window.location.href = "/Contact")}>
                                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Contact Sales
                                    </span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </>
  );
}

export default Feature;
