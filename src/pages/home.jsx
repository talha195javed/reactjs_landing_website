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
    BuildingOffice2Icon
} from "@heroicons/react/24/solid";
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

const WorkVideoPopup = ({ onClose }) => {
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
                    <source src="/img/smart_visitor.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export function Home() {
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [showWorkVideoPopup, setShowWorkVideoPopup] = useState(false);
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
                            <span className="text-white">Management</span>
                            <br />
                            <span className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 tracking-wide">
                    SmartVisitor.io
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
                            Transform your visitor experience with our AI-powered platform that combines
                            <span className="font-semibold text-blue-300"> security</span>,
                            <span className="font-semibold text-purple-300"> efficiency</span>, and
                            <span className="font-semibold text-cyan-300"> elegance</span> in one seamless solution.
                        </motion.p>

                        {/* Enhanced CTA Buttons with Hover Effects */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Button
                                className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                                size="lg"
                                onClick={() => {
                                    window.location.href = "/AppDemo";
                                }}
                            >
                    <span className="flex items-center justify-center">
                        Request Demo
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                            </Button>
                            <Button
                                className="px-10 py-4 bg-transparent border-2 border-white/40 hover:border-white text-white hover:bg-white/10 font-semibold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1"
                                size="lg"
                                onClick={() => setShowWorkVideoPopup(true)}
                            >
                    <span className="flex items-center justify-center">
                        How it Works
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                            </Button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            className="mt-16 flex flex-col items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <div className="flex items-center space-x-2 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm text-blue-200/80 tracking-wider">
                                TRUSTED BY FORTUNE 500 COMPANIES WORLDWIDE
                            </p>
                            <div className="flex items-center justify-center space-x-8 mt-4">
                                {['logo1', 'logo2', 'logo3', 'logo4'].map((logo, i) => (
                                    <div key={i} className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity">
                                        {/* Replace with actual logo components */}
                                        <div className="h-full w-20 bg-white/20 rounded"></div>
                                    </div>
                                ))}
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
                        onClick={() => {/* Scroll to next section */}}
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

                {/* Video Demo Section - Modern Glass Morphism Design */}
                <section className="py-20 bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] -mr-[300px] -mt-[300px] bg-blue-100/20 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] -ml-[400px] -mb-[400px] bg-purple-100/20 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="container mx-auto px-4 relative">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <motion.div
                                className="lg:w-1/2"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-block bg-blue-100/20 backdrop-blur-sm border border-blue-200/30 px-4 py-2 rounded-full mb-6">
                                    <span className="text-blue-600 font-medium">Next Generation Platform</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Visitor Experience</span>
                                </h2>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Our AI-powered platform transforms visitor management into a seamless, secure, and delightful experience for both guests and staff.
                                </p>

                                <div className="space-y-6 mb-10">
                                    {[
                                        "Ensure safety by capturing complete visitor details for a seamless and secure entry process.",
                                        "Visitors can check-in instantly using on-site QR codes",
                                        "Built on a stable, user-friendly interface designed for efficiency and clarity.",
                                        "Instant alerts to hosts when their visitors arrive via email, SMS notification.",
                                        "Comprehensive visit analytics dashboard"
                                    ].map((feature, index) => (
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

                                <div className="flex flex-wrap gap-4">
                                    <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-500/20 transition-all"
                                            onClick={() => (window.location.href = "/Feature")}>
                                        Explore Features
                                    </Button>
                                    <Button variant="outlined" className="px-8 py-4 border-gray-300 hover:border-blue-600 hover:bg-blue-50/50 rounded-xl text-lg font-semibold transition-all"
                                            onClick={() => setShowVideoPopup(true)}>
                                        Watch Demo
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                className="lg:w-1/2 relative"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-sm z-10"></div>
                                    <div className="absolute top-4 left-4 right-4 flex gap-2 z-20">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <video
                                        className="w-full h-auto relative z-0"
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                        poster="/img/video-poster.jpg"
                                    >
                                        <source src="/img/smart_visitor.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute -bottom-6 -right-6 z-20">
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-float">
                                            <QrCodeIcon className="h-10 w-10 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Animated Trusted By Section */}
                <section className="py-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/grid-pattern.svg')] opacity-10"></div>
                        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
                                <p className="text-blue-600 uppercase text-xs font-bold tracking-wider">
                                    Trusted by industry leaders
                                </p>
                            </div>

                            <div className="relative w-full h-32">
                                <div className="absolute inset-0 flex items-center">
                                    {/* First marquee */}
                                    {/* First marquee */}
                                    <motion.div
                                        className="flex items-center absolute top-0 left-0"
                                        animate={{ x: ["0%", "-100%"] }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    >
                                        {[1, 2].map((duplicate) => (
                                            <React.Fragment key={`duplicate-${duplicate}`}>
                                                {[
                                                    "/img/sc.png", "/img/3ami.jpeg", "/img/nex.jpeg",
                                                    "/img/masar.png", "/img/perfume.jpg", "/img/dps.png",
                                                    "/img/bodyshop.jpg", "/img/ahp.webp", "/img/images.jpeg",
                                                    "/img/asu.jpeg"
                                                ].map((logo, index) => (
                                                    <div
                                                        key={`${duplicate}-${index}`}
                                                        className="flex-shrink-0 w-40 h-20 mx-8 grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center"
                                                    >
                                                        <div className="relative w-full h-full">
                                                            <img
                                                                src={logo}
                                                                alt="Partner logo"
                                                                className="max-h-full max-w-full object-contain"
                                                                onError={(e) => e.target.style.display = 'none'}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section - Card Grid with Hover Effects */}
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
          Enterprise-Grade Features
        </span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                Powerful Tools for <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Seamless Operations</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Every feature designed to enhance security, streamline processes, and deliver exceptional visitor experiences.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path fillRule="evenodd" d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75z" clipRule="evenodd" />
                                            <path d="M7.5 15.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" />
                                        </svg>
                                    ),
                                    title: "Smart Check-In",
                                    description: "Ensure safety by capturing complete visitor details for a seamless and secure entry process.",
                                    color: "from-blue-500 to-blue-600"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                        </svg>
                                    ),
                                    title: "QR Code Check-In",
                                    description: "Visitors can check-in instantly using on-site QR codes.",
                                    color: "from-purple-500 to-purple-600"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                        </svg>
                                    ),
                                    title: "Reliable Infrastructure",
                                    description: "Built on a stable, user-friendly interface designed for efficiency and clarity.",
                                    color: "from-amber-500 to-amber-600"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                                        </svg>
                                    ),
                                    title: "Host Notifications",
                                    description: "Instant alerts to hosts when their visitors arrive via email, SMS notification.",
                                    color: "from-green-500 to-green-600"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                                        </svg>
                                    ),
                                    title: "Advanced Analytics",
                                    description: "Comprehensive dashboards with visitor trends, peak times, and facility utilization.",
                                    color: "from-red-500 to-red-600"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
                                            <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                                        </svg>
                                    ),
                                    title: "24/7 Support",
                                    description: "Get round-the-clock assistance through both email and live chat whenever you need help.",
                                    color: "from-indigo-500 to-indigo-600"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:border-transparent relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0" style={{ backgroundImage: `linear-gradient(135deg, ${feature.color.replace('from-', '').replace('to-', '').split(' ')[0]} 0%, ${feature.color.split(' ')[2]} 100%)` }}></div>
                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-xl mb-6 bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                        <div className="mt-6">
                                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center group-hover:translate-x-2 transition-transform">
                                                Learn more
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section - Animated Counters */}
                <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[url('/img/grid-pattern-white.svg')]"></div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full animate-spin-slow"></div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { number: 10, suffix: "+", label: "Enterprise Clients" },
                                { number: 99, suffix: "%", label: "Satisfaction Rate" },
                                { number: 1000, suffix: "+", label: "Daily Check-Ins" },
                                { number: 24, suffix: "/7", label: "Support Coverage" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-colors"
                                >
                                    <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent">
                                        <CountUp end={stat.number} duration={3} separator="," />{stat.suffix}
                                    </div>
                                    <div className="text-lg opacity-90">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section - Carousel Style */}
                <section className="py-20 bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] -mr-[400px] -mt-[400px] bg-purple-100/20 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="container mx-auto px-4 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
        <span className="inline-block px-4 py-2 text-sm font-semibold text-purple-600 bg-purple-100/50 rounded-full mb-4 border border-purple-200 backdrop-blur-sm">
          Customer Success Stories
        </span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                Loved by Organizations <br className="hidden md:block" /> Worldwide
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Don't take our word for it - hear from our customers about their experience.
                            </p>
                        </motion.div>

                        <div className="relative">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        quote: "SmartVisitor transformed our front desk operations. What used to take 5 minutes now takes under 30 seconds, and our visitors are consistently impressed with the professional experience.",
                                        name: "Amir Jawad",
                                        title: "CEO 3Amigos",
                                        avatar: "/img/3ami.jpeg",
                                        rating: 5
                                    },
                                    {
                                        quote: "The security features alone justified the investment. Real-time watchlist screening has prevented three unauthorized access attempts in the last quarter.",
                                        name: "Michael Chen",
                                        title: "M Usman",
                                        avatar: "/img/ahp.webp",
                                        rating: 5
                                    },
                                    {
                                        quote: "Our visitor satisfaction scores increased by 40% after implementation. The digital badges and automated notifications create a seamless experience.",
                                        name: "Emma Rodriguez",
                                        title: "Security Incharge",
                                        avatar: "/img/asu.jpeg",
                                        rating: 4
                                    }
                                ].map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-blue-100/20 rounded-full"></div>
                                        <div className="relative z-10">
                                            <div className="flex mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div className="text-gray-600 mb-6">
                                                <p className="text-lg italic">"{testimonial.quote}"</p>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <img
                                                        src={testimonial.avatar}
                                                        alt={testimonial.name}
                                                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
                                                    />
                                                    <div className="absolute bottom-0 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                                    <div className="text-sm text-gray-600">{testimonial.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section - Floating Elements */}
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
                                Ready to Revolutionize Your <br className="hidden md:block" /> Visitor Management?
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                                Join the thousands of forward-thinking organizations using SmartVisitor to create secure, efficient, and memorable visitor experiences.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                                    size="lg"
                                    onClick={() => (window.location.href = "/Contact")}
                                >
                                    Get Started Today
                                </Button>
                                <Button
                                    variant="outlined"
                                    className="px-8 py-4 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-xl text-lg font-semibold backdrop-blur-sm transition-all"
                                    size="lg"
                                    onClick={() => {
                                        window.location.href = "/AppDemo";
                                    }}>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Schedule Demo
            </span>
                                </Button>
                            </div>
                            <div className="mt-8 text-sm text-gray-400">
                                No credit card required • 30-day free trial • Cancel anytime
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>

            {/* Video Popups */}
            {showVideoPopup && <VideoPopup onClose={() => setShowVideoPopup(false)} />}
            {showWorkVideoPopup && <WorkVideoPopup onClose={() => setShowWorkVideoPopup(false)} />}
        </>
    );
}

export default Home;
