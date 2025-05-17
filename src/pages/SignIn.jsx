import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function SigninPage({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed");

      toast.success("Login successful");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("clientId", result.user.id);
      localStorage.setItem("clientUser", JSON.stringify(result));
      console.log("Client User:", JSON.stringify(result));
      navigate("/");
     // location.reload();

    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Floating particles animation
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }));

  return (
      <>
        {/* Fixed Background with Particles */}
        <section className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-0 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      left: `${particle.left}%`,
                      top: `${particle.top}%`
                    }}
                    animate={{
                      y: [0, -50, 0],
                      x: [0, 20, 0]
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: particle.delay
                    }}
                />
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
              className="w-full max-w-md px-6 py-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          >
            {/* Glowing Card Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-xl opacity-75"></div>

              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/30 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/30 rounded-full filter blur-3xl"></div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                >
                  <Typography variant="h2" className="text-4xl font-bold text-white mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                    Welcome Back
                  </span>
                  </Typography>
                  <Typography className="text-blue-100">
                    Sign in to your SmartVisitor account
                  </Typography>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-blue-300" />
                      </div>
                      <Input
                          color="white"
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="pl-10"
                          labelProps={{
                            className: "ml-[8%]",
                          }}
                      />
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-blue-300" />
                      </div>
                      <Input
                          color="white"
                          label="Password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="pl-10"
                          labelProps={{
                            className: "ml-[8%]",
                          }}
                      />
                    </div>
                  </motion.div>

                  {/* Forgot Password Link */}
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-right"
                  >
                    <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-blue-300 hover:text-white text-sm font-medium"
                    >
                      Forgot password?
                    </button>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="pt-2"
                  >
                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-lg font-semibold py-4 rounded-xl shadow-lg ${
                            loading ? "opacity-80" : ""
                        }`}
                        size="lg"
                    >
                      {loading ? (
                          <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </span>
                      ) : (
                          <span className="flex items-center justify-center">
                        Sign In <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </span>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Status Messages */}
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-100 flex items-start"
                    >
                      <CheckCircleIcon className="w-6 h-6 mt-0.5 mr-3 flex-shrink-0 text-green-300" />
                      <div>
                        <p className="font-medium">Login successful!</p>
                        <p className="text-sm mt-1 text-green-200">Redirecting you to dashboard...</p>
                      </div>
                    </motion.div>
                )}

                {status && status !== "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-100 flex items-start"
                    >
                      <ExclamationCircleIcon className="w-6 h-6 mt-0.5 mr-3 flex-shrink-0 text-red-300" />
                      <div>
                        <p className="font-medium">Login Error</p>
                        <p className="text-sm mt-1 text-red-200">{status}</p>
                      </div>
                    </motion.div>
                )}

                {/* Footer Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex flex-col items-center space-y-4 text-center text-blue-100 text-sm"
                >
                  <button
                      onClick={() => navigate('/')}
                      className="flex items-center text-blue-300 hover:text-white"
                  >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Back to homepage
                  </button>

                  <p>
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-blue-300 hover:text-white font-medium underline underline-offset-4"
                    >
                      Create one now
                    </button>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </>
  );
}
