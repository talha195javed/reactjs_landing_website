import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button, Typography } from "@material-tailwind/react";
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  LightBulbIcon,
  ArrowRightIcon,
  PlayIcon
} from "@heroicons/react/24/outline";
import { useInView } from 'react-intersection-observer';
import { PageTitle, Footer } from "@/widgets/layout";

const VideoPopup = ({ onClose }) => {
  return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75 p-4">
        <div className="relative w-full max-w-4xl">
          <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <video
              className="w-full rounded-xl shadow-2xl"
              controls
              autoPlay
              muted
              loop
          >
            <source src="/img/demo.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
  );
};

export default function AboutPage() {
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const stats = [
    { value: '10+', label: 'Organizations', icon: '🏢', animation: { scale: [1, 1.1, 1] } },
    { value: '98%', label: 'Satisfaction', icon: '😊', animation: { rotate: [0, 5, -5, 0] } },
    { value: '24/7', label: 'Global Support', icon: '🌎', animation: { y: [0, -10, 0] } },
    { value: '2024', label: 'Founded', icon: '🚀', animation: { x: [0, 5, -5, 0] } },
  ];

  const features = [
    {
      icon: <BuildingOfficeIcon className="h-8 w-8" />,
      title: "User Ease",
      description: "Visitors sign in using our intuitive interface with contactless options."
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Instant Notifications",
      description: "Hosts receive real-time alerts via multiple communication channels."
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Efficient Greeting",
      description: "Visitors are welcomed promptly by their hosts."
    },
    {
      icon: <LightBulbIcon className="h-8 w-8" />,
      title: "Checkout System",
      description: "Simple sign-out process with optional feedback collection."
    }
  ];

  const team = [
    {
      name: "Mr Ibrahim",
      role: "Founder & CEO",
      image: "/img/Mr-Ibrahim.jpeg",
      bio: ""
    },
    {
      name: "Chamara Dissanayake\n",
      role: "Software Engineer",
      image: "/img/cl.webp",
      bio: ""
    },
    {
      name: "M Talha Javed",
      role: "Software Developer",
      image: "/img/tl.webp",
      bio: ""
    },
    {
      name: "Wai Oo Aung",
      role: "Software Developer",
      image: "/img/wai.png",
      bio: ""
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Company Launch",
      description: "Founded with vision to modernize visitor management",
      icon: "🚀"
    },
    {
      year: "Q2 2024",
      title: "First Enterprise Client",
      description: "Secured Fortune 500 company as customer",
      icon: "🏆"
    },
    {
      year: "Q3 2024",
      title: "Product 2.0 Release",
      description: "Launched AI features and advanced analytics",
      icon: "✨"
    },
    {
      year: "Now",
      title: "Global Expansion",
      description: "Serving clients across multiple continents",
      icon: "🌍"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
                  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url('/img/main-bg.jpg')",
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
      Our Story
    </span>
                <br />
                <span className="text-white">Who We Are</span>
                <br />
                <span className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 tracking-wide">
      SmartVisitor.io
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Redefining Visitor Management</h2>
                  <p className="text-lg text-blue-100">
                    We set out to create a solution that combines cutting-edge technology with intuitive design, transforming security check-ins from a chore into a seamless experience.
                  </p>
                </div>
              </motion.div>



              {/* Team CTA */}
              <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
              >

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

        {/* Add this to your global CSS */}
        <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>

        {/* Scrollable Content */}
        <div ref={containerRef} className="relative z-10 mt-[100vh] bg-white">
          {/* Animated Stats Section */}
          <section className="relative py-20 px-6 bg-white">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ y: -10 }}
                        className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <motion.div
                          animate={stat.animation}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-3xl mb-2"
                      >
                        {stat.icon}
                      </motion.div>
                      <Typography variant="h2" className="text-4xl font-bold text-blue-600 mb-1">
                        {stat.value}
                      </Typography>
                      <Typography className="text-gray-600 font-medium">
                        {stat.label}
                      </Typography>
                    </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* About Section with Floating Animation */}
          <section className="py-28 px-6 bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/img/dots-pattern.svg')] opacity-5"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2"
                >
                  <Typography variant="h2" className="text-4xl font-bold text-gray-900 mb-6">
                    About <span className="text-blue-600">SmartVisitor</span>
                  </Typography>
                  <Typography className="text-gray-600 text-lg mb-6">
                    We're transforming traditional visitor management into seamless, secure, and delightful experiences for both guests and hosts.
                  </Typography>
                  <Typography className="text-gray-600 text-lg mb-8">
                    Our solution combines cutting-edge technology with human-centered design to create systems that actually work in real-world environments.
                  </Typography>

                  <motion.div
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-blue-600 font-medium cursor-pointer"
                  >
                    Learn more about our mission
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 relative"
                >
                  <motion.div
                      whileHover={{ rotate: 2 }}
                      transition={{ duration: 0.5 }}
                      className="relative rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img
                        src="/img/smart1.webp"
                        alt="Modern office reception"
                        className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <Typography className="font-medium">
                        "Transforming visitor experiences since 2024"
                      </Typography>
                    </div>
                  </motion.div>
                  <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-100 rounded-lg -z-10 opacity-80"
                  ></motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="py-28 px-6 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
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

            <div className="container mx-auto max-w-7xl relative z-10">
              {/* Section Header */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-20"
              >
                <Typography variant="h2" className="text-4xl font-bold text-white mb-4">
                  Our <span className="text-cyan-300">Core Values</span>
                </Typography>
                <Typography className="text-blue-200 max-w-2xl mx-auto text-lg">
                  The principles that guide everything we do at SmartVisitor
                </Typography>
              </motion.div>

              {/* Core Values Grid */}
              <motion.div
                  className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
              >
                {[
                  {
                    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                    title: 'Security First',
                    description: 'Enterprise-grade protection for every visitor interaction, with compliance built into our DNA.',
                    color: 'from-blue-500 to-blue-600'
                  },
                  {
                    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
                    title: 'Innovation Driven',
                    description: 'Continuous improvement through emerging technologies and user feedback.',
                    color: 'from-purple-500 to-indigo-600'
                  },
                  {
                    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                    title: 'Exceptional Experiences',
                    description: 'Delighting both visitors and administrators with thoughtful, human-centered design.',
                    color: 'from-cyan-400 to-blue-500'
                  }
                ].map((value, index) => (
                    <motion.div
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 50 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.6, type: 'spring', damping: 10 }}
                        whileHover={{ y: -10 }}
                        className={`bg-gradient-to-br ${value.color} p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all shadow-xl hover:shadow-2xl`}
                    >
                      <motion.div
                          className="w-16 h-16 mb-6 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                        </svg>
                      </motion.div>

                      <Typography variant="h3" className="text-2xl font-bold text-white mb-4">
                        {value.title}
                      </Typography>

                      <Typography className="text-blue-100 text-lg">
                        {value.description}
                      </Typography>

                      <motion.div
                          className="mt-6 flex items-center text-blue-200 font-medium cursor-pointer group"
                          whileHover={{ x: 5 }}
                      >
                        Learn more
                        <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </motion.div>
                ))}
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                  className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-700/20 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
              />

              <motion.div
                  className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
              />
            </div>
          </section>
          {/* Features with Floating Cards */}

          <section className="py-28 px-6 bg-white">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-20"
              >
                <Typography variant="h2" className="text-4xl font-bold text-gray-900 mb-6">
                  Key <span className="text-blue-600">Features</span>
                </Typography>
                <Typography className="text-gray-600 max-w-2xl mx-auto">
                  Discover how SmartVisitor enhances your visitor management workflow
                </Typography>
              </motion.div>

              <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-8"
              >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ y: -10 }}
                        className="flex items-start p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          className="flex-shrink-0 p-4 bg-blue-50 rounded-lg mr-6"
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <Typography variant="h3" className="text-xl font-semibold mb-3 text-gray-800">
                          {feature.title}
                        </Typography>
                        <Typography className="text-gray-600">
                          {feature.description}
                        </Typography>
                      </div>
                    </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Animated Timeline */}
          <section className="py-28 px-6 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-20"
              >
                <Typography variant="h2" className="text-4xl font-bold text-gray-900 mb-6">
                  Our <span className="text-blue-600">Journey</span>
                </Typography>
                <Typography className="text-gray-600 max-w-2xl mx-auto">
                  From startup to industry innovator in visitor management
                </Typography>
              </motion.div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 transform -translate-x-1/2"></div>

                <div className="space-y-16">
                  {milestones.map((milestone, index) => (
                      <motion.div
                          key={index}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                      >
                        <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <Typography variant="h3" className="text-2xl font-bold text-gray-800 mb-2">
                            {milestone.title}
                          </Typography>
                          <Typography className="text-gray-600 mb-2">
                            {milestone.description}
                          </Typography>
                          <Typography className="text-blue-600 font-bold">
                            {milestone.year}
                          </Typography>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="w-16 h-16 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center shadow-lg mx-4 z-10"
                        >
                          <span className="text-2xl">{milestone.icon}</span>
                        </motion.div>

                        <div className="flex-1 opacity-0">
                          {/* Empty div for spacing */}
                        </div>
                      </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3D Team Section */}
          <section className="py-28 px-6 bg-white">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-20"
              >
                <Typography variant="h2" className="text-4xl font-bold text-gray-900 mb-6">
                  Meet Our <span className="text-blue-600">Team</span>
                </Typography>
                <Typography className="text-gray-600 max-w-2xl mx-auto">
                  The talented professionals behind SmartVisitor
                </Typography>
              </motion.div>

              <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ y: -15 }}
                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-rotate-1"
                    >
                      <div className="relative h-64 overflow-hidden group">
                        <motion.div
                            className="w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                          <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="p-6 text-center">
                        <Typography variant="h3" className="text-xl font-bold mb-1">
                          {member.name}
                        </Typography>
                        <Typography className="text-blue-600 font-medium mb-3">
                          {member.role}
                        </Typography>
                        <Typography className="text-gray-600 text-sm">
                          {member.bio}
                        </Typography>
                      </div>
                    </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Animated CTA Section */}
          <section className="py-28 px-6 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/img/grid-pattern.svg')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 animate-[shimmer_8s_linear_infinite]"></div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
              >
                <Typography variant="h2" className="text-4xl font-bold text-white mb-8">
                  Ready to <span className="text-blue-200">Transform</span> Your Visitor Experience?
                </Typography>
                <Typography className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
                  Join thousands of organizations using SmartVisitor for secure, efficient visitor management.
                </Typography>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        size="lg"
                        className="bg-white text-blue-800 font-bold rounded-lg px-8 py-4 shadow-lg"
                        onClick={() => {
                          window.location.href = "/AppDemo";
                        }}>
                      Request Demo
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="outlined"
                        size="lg"
                        className="text-white border-2 border-white hover:bg-white/10 font-bold rounded-lg px-8 py-4"
                        onClick={() => (window.location.href = "/Contact")}>
                      Contact Sales
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </div>

        {/* Video Popups */}
        {showVideoPopup && <VideoPopup onClose={() => setShowVideoPopup(false)} />}
      </>
  );
}
