import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Send,
  Loader2,
  CheckCircle,
  Sparkles,
  Heart,
  Clock,
  MapPin,
  ArrowRight,
  X,
  Star,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import API from "../api/axios";
import FAQSection from "../components/common/FAQ";

// Bubble Animation Background Component
const BubbleBackground = () => {
  const bubbles = [
    // Large bubbles
    { size: 280, x: "5%", y: "8%", opacity: 0.15, color: "purple", delay: 0 },
    { size: 320, x: "75%", y: "5%", opacity: 0.12, color: "pink", delay: 0.5 },
    { size: 250, x: "85%", y: "25%", opacity: 0.18, color: "purple", delay: 1 },
    { size: 300, x: "-5%", y: "35%", opacity: 0.14, color: "pink", delay: 1.5 },
    { size: 280, x: "70%", y: "45%", opacity: 0.16, color: "purple", delay: 2 },
    { size: 260, x: "10%", y: "55%", opacity: 0.13, color: "pink", delay: 0.3 },
    { size: 290, x: "80%", y: "65%", opacity: 0.15, color: "purple", delay: 0.8 },
    { size: 270, x: "0%", y: "75%", opacity: 0.17, color: "pink", delay: 1.2 },
    { size: 310, x: "65%", y: "85%", opacity: 0.14, color: "purple", delay: 1.8 },

    // Medium bubbles
    { size: 180, x: "30%", y: "12%", opacity: 0.12, color: "pink", delay: 0.2 },
    { size: 160, x: "55%", y: "20%", opacity: 0.14, color: "purple", delay: 0.7 },
    { size: 200, x: "20%", y: "30%", opacity: 0.11, color: "pink", delay: 1.1 },
    { size: 170, x: "45%", y: "42%", opacity: 0.13, color: "purple", delay: 0.4 },
    { size: 190, x: "60%", y: "55%", opacity: 0.15, color: "pink", delay: 0.9 },
    { size: 175, x: "35%", y: "68%", opacity: 0.12, color: "purple", delay: 1.4 },
    { size: 185, x: "50%", y: "78%", opacity: 0.14, color: "pink", delay: 1.7 },
    { size: 165, x: "25%", y: "88%", opacity: 0.11, color: "purple", delay: 2.1 },

    // Small bubbles
    { size: 100, x: "15%", y: "18%", opacity: 0.1, color: "purple", delay: 0.1 },
    { size: 90, x: "40%", y: "8%", opacity: 0.12, color: "pink", delay: 0.6 },
    { size: 110, x: "68%", y: "32%", opacity: 0.09, color: "purple", delay: 1.3 },
    { size: 95, x: "8%", y: "48%", opacity: 0.11, color: "pink", delay: 0.5 },
    { size: 105, x: "90%", y: "52%", opacity: 0.1, color: "purple", delay: 1.6 },
    { size: 85, x: "42%", y: "62%", opacity: 0.12, color: "pink", delay: 1.9 },
    { size: 115, x: "78%", y: "72%", opacity: 0.08, color: "purple", delay: 2.2 },
    { size: 92, x: "18%", y: "82%", opacity: 0.11, color: "pink", delay: 0.8 },
    { size: 88, x: "55%", y: "92%", opacity: 0.1, color: "purple", delay: 1.0 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main bubbles */}
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
            background:
              bubble.color === "purple"
                ? `radial-gradient(circle at 30% 30%, rgba(139, 92, 246, ${bubble.opacity + 0.05}), rgba(63, 41, 101, ${bubble.opacity}))`
                : `radial-gradient(circle at 30% 30%, rgba(251, 207, 232, ${bubble.opacity + 0.1}), rgba(221, 23, 100, ${bubble.opacity}))`,
            filter: "blur(1px)",
          }}
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [bubble.opacity * 0.8, bubble.opacity, bubble.opacity * 0.8],
            x: [0, 10, -10, 0],
            y: [0, -15, 5, 0],
          }}
          transition={{
            duration: 8 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}

      {/* Extra floating small bubbles for depth */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`small-${i}`}
          className="absolute rounded-full"
          style={{
            width: 40 + Math.random() * 60,
            height: 40 + Math.random() * 60,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 2 === 0
                ? `radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.15), rgba(139, 92, 246, 0.08))`
                : `radial-gradient(circle at 30% 30%, rgba(251, 207, 232, 0.18), rgba(244, 114, 182, 0.1))`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Soft gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)
          `,
        }}
      />
    </div>
  );
};

// Contact Info Card Component
const ContactCard = ({ icon, title, detail, description, color, delay, href, isExternal }) => (
  <motion.a
    href={href}
    target={isExternal ? "_blank" : "_self"}
    rel={isExternal ? "noopener noreferrer" : ""}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`
      relative overflow-hidden cursor-pointer block
      p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl
      bg-white/80 backdrop-blur-sm
      border border-white/50
      shadow-lg hover:shadow-2xl
      transition-all duration-300
      group
    `}
  >
    {/* Gradient overlay on hover */}
    <div
      className={`
        absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        ${
          color === "pink"
            ? "bg-gradient-to-br from-[#DD1764]/5 to-transparent"
            : "bg-gradient-to-br from-[#3F2965]/5 to-transparent"
        }
      `}
    />

    {/* Icon */}
    <div
      className={`
        relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
        flex items-center justify-center mb-4
        transition-transform duration-300 group-hover:scale-110
        ${
          color === "pink"
            ? "bg-gradient-to-br from-[#DD1764]/10 to-[#DD1764]/5 text-[#DD1764]"
            : "bg-gradient-to-br from-[#3F2965]/10 to-[#3F2965]/5 text-[#3F2965]"
        }
      `}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>

    {/* Content */}
    <h3 className="relative font-bold text-base sm:text-lg text-[#3F2965] mb-1">
      {title}
    </h3>
    <p
      className={`relative text-sm sm:text-base font-semibold mb-1 ${
        color === "pink" ? "text-[#DD1764]" : "text-[#3F2965]/80"
      }`}
    >
      {detail}
    </p>
    {description && (
      <p className="relative text-xs sm:text-sm text-[#3F2965]/50">
        {description}
      </p>
    )}

    {/* Arrow indicator */}
    <div className="absolute top-5 right-5 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
      <ArrowRight
        size={18}
        className={color === "pink" ? "text-[#DD1764]" : "text-[#3F2965]"}
      />
    </div>
  </motion.a>
);

// Input Component
const FormInput = ({ label, error, ...props }) => (
  <div className="space-y-1.5 sm:space-y-2">
    <label className="block text-xs sm:text-sm font-semibold text-[#3F2965] ml-1">
      {label}
      {props.required && <span className="text-[#DD1764] ml-0.5">*</span>}
    </label>
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-xl sm:rounded-2xl opacity-0 group-focus-within:opacity-10 blur transition-opacity duration-300" />
      {props.as === "textarea" ? (
        <textarea
          {...props}
          className={`
            relative w-full p-3.5 sm:p-4
            bg-white/80 hover:bg-white
            border-2 border-[#3F2965]/10
            focus:border-[#3F2965]/20 focus:bg-white
            rounded-xl sm:rounded-2xl
            outline-none transition-all duration-300
            text-[#3F2965] text-sm sm:text-base
            placeholder-[#3F2965]/30
            resize-none
          `}
        />
      ) : (
        <input
          {...props}
          className={`
            relative w-full p-3.5 sm:p-4
            bg-white/80 hover:bg-white
            border-2 border-[#3F2965]/10
            focus:border-[#3F2965]/20 focus:bg-white
            rounded-xl sm:rounded-2xl
            outline-none transition-all duration-300
            text-[#3F2965] text-sm sm:text-base
            placeholder-[#3F2965]/30
          `}
        />
      )}
    </div>
  </div>
);

// Success Modal
const SuccessModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={18} className="text-slate-400" />
          </button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#3F2965] mb-2">
            Message Sent! 🎉
          </h3>
          <p className="text-sm sm:text-base text-[#3F2965]/60 mb-6">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#3F2965] to-[#5a3d8a] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Got it!
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Main Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/user/contact/send", formData);
      if (res.data.success) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Contact info with actual links
  const contactInfo = [
    {
      icon: <Phone />,
      title: "Call Us",
      detail: "+91 9974631313",
      description: "Mon-Fri, 9am-6pm",
      color: "purple",
      href: "tel:+919974631313",
      isExternal: false,
    },
    {
      icon: <MessageCircle />,
      title: "WhatsApp",
      detail: "+91 9974631313",
      description: "Quick responses",
      color: "purple",
      href: "https://wa.me/919974631313?text=Hi%20MindSettler%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
      isExternal: true,
    },
    {
      icon: <Mail />,
      title: "Email",
      detail: "contact@mindsettler.com",
      description: "We reply within 24h",
      color: "purple",
      href: "mailto:contact@mindsettler.com?subject=Inquiry%20from%20Website",
      isExternal: false,
    },
    {
      icon: <Instagram />,
      title: "Instagram",
      detail: "@mindsettlerbypb",
      description: "Follow for updates",
      color: "pink",
      href: "https://www.instagram.com/mindsettlerbypb?igsh=MTdkeXcxaHd5dG50Ng==",
      isExternal: true,
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen font-sans text-[#3F2965] relative"
        style={{
          background: `linear-gradient(135deg, 
            #faf5ff 0%, 
            #f5f0ff 20%,
            #fdf2f8 40%, 
            #fce7f3 60%,
            #f3e8ff 80%,
            #faf5ff 100%
          )`,
        }}
      >
        {/* Bubble Animation Background */}
        <BubbleBackground />

        {/* === HERO SECTION === */}
        <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 px-4 overflow-hidden">
          <div className="relative max-w-4xl mx-auto text-center z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/50 mb-6"
            >
              <Heart size={14} className="text-[#DD1764]" />
              <span className="text-xs sm:text-sm font-semibold text-[#3F2965]">
                We're here to help
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6"
            >
              Let's Start a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3F2965] via-[#DD1764] to-[#3F2965]">
                Conversation
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-[#3F2965]/60 max-w-2xl mx-auto leading-relaxed"
            >
              MindSettler provides a safe, supportive environment. Reach out for
              guidance, book a consultation, or just say hello.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-10"
            >
              {[
                { icon: Clock, text: "24h Response" },
                { icon: Star, text: "5-Star Support" },
                { icon: MapPin, text: "Global Reach" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[#3F2965]/60 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  <item.icon size={16} className="text-[#DD1764]" />
                  <span className="text-xs sm:text-sm font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === MAIN CONTENT === */}
        <section className="relative px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-28 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* === LEFT: CONTACT CARDS === */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Section title - Mobile only */}
                <div className="lg:hidden mb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3F2965]">
                    Reach Out
                  </h2>
                  <p className="text-sm text-[#3F2965]/50">
                    Choose your preferred way to connect
                  </p>
                </div>

                {/* Contact cards grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {contactInfo.map((item, index) => (
                    <ContactCard key={index} {...item} delay={index * 0.1} />
                  ))}
                </div>

                {/* Additional info card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative overflow-hidden p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#3F2965] to-[#5a3d8a] text-white"
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#DD1764]/20 rounded-full blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={18} className="text-yellow-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                        Quick Support
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">
                      Need Urgent Help?
                    </h3>
                    <p className="text-sm text-white/70 mb-4 leading-relaxed">
                      Our support team is available for emergencies. Don't
                      hesitate to reach out.
                    </p>
                    <a
                      href="tel:+919974631313"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#3F2965] font-bold text-sm rounded-xl hover:bg-white/90 transition-colors"
                    >
                      <Phone size={16} />
                      Call Now
                    </a>
                  </div>
                </motion.div>

                {/* Social Connect Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="relative overflow-hidden p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg"
                >
                  <h3 className="text-lg font-bold text-[#3F2965] mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex gap-3">
                    {/* WhatsApp */}
                    <motion.a
                      href="https://wa.me/919974631313?text=Hi%20MindSettler%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30"
                    >
                      <MessageCircle size={22} />
                    </motion.a>

                    {/* Instagram */}
                    <motion.a
                      href="https://www.instagram.com/mindsettlerbypb?igsh=MTdkeXcxaHd5dG50Ng=="
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center text-white shadow-lg shadow-pink-500/30"
                    >
                      <Instagram size={22} />
                    </motion.a>

                    {/* Email */}
                    <motion.a
                      href="mailto:contact@mindsettler.com?subject=Inquiry%20from%20Website"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3F2965] to-[#5a3d8a] flex items-center justify-center text-white shadow-lg shadow-purple-500/30"
                    >
                      <Mail size={22} />
                    </motion.a>

                    {/* Phone */}
                    <motion.a
                      href="tel:+919974631313"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DD1764] to-[#e83d7f] flex items-center justify-center text-white shadow-lg shadow-pink-500/30"
                    >
                      <Phone size={22} />
                    </motion.a>
                  </div>
                  <p className="text-xs text-[#3F2965]/50 mt-4">
                    Click any icon to connect instantly
                  </p>
                </motion.div>
              </div>

              {/* === RIGHT: CONTACT FORM === */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                <div className="relative bg-white/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[40px] shadow-xl border border-white/50">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3F2965] via-[#DD1764] to-[#3F2965] rounded-t-3xl" />

                  {/* Form header */}
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#3F2965] mb-2">
                      Get In Touch
                    </h2>
                    <p className="text-sm sm:text-base text-[#3F2965]/50">
                      Fill out the form and we'll respond within 24 hours.
                    </p>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm font-medium"
                      >
                        <X size={16} />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* Name & Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <FormInput
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Subject */}
                    <FormInput
                      label="Subject"
                      name="subject"
                      type="text"
                      placeholder="Booking / General Inquiry / Feedback"
                      value={formData.subject}
                      onChange={handleChange}
                    />

                    {/* Message */}
                    <FormInput
                      label="Message"
                      name="message"
                      as="textarea"
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`
                        relative w-full py-4 sm:py-4.5
                        bg-gradient-to-r from-[#DD1764] via-[#e83d7f] to-[#DD1764]
                        bg-[length:200%_100%] bg-left hover:bg-right
                        text-white font-bold text-sm sm:text-base
                        rounded-xl sm:rounded-2xl
                        transition-all duration-500
                        flex items-center justify-center gap-2
                        shadow-xl shadow-[#DD1764]/20
                        hover:shadow-2xl hover:shadow-[#DD1764]/30
                        disabled:opacity-70 disabled:cursor-not-allowed
                        overflow-hidden group
                      `}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Privacy note */}
                  <p className="mt-4 sm:mt-5 text-center text-[10px] sm:text-xs text-[#3F2965]/40">
                    By submitting, you agree to our{" "}
                    <a href="#" className="underline hover:text-[#DD1764]">
                      Privacy Policy
                    </a>
                    . We'll never share your information.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* === TESTIMONIALS STRIP === */}
        <section className="relative py-12 sm:py-16 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#3F2965] mb-2">
                What People Say
              </h3>
              <p className="text-sm text-[#3F2965]/50">
                Trusted by thousands seeking mental wellness
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  text: "The support team responded within hours. Truly exceptional service!",
                  author: "Sarah M.",
                  role: "Verified Client",
                },
                {
                  text: "MindSettler helped me find the right therapist. Life-changing experience.",
                  author: "James K.",
                  role: "Verified Client",
                },
                {
                  text: "Professional, caring, and always available. Highly recommend!",
                  author: "Emily R.",
                  role: "Verified Client",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/50 shadow-lg"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#3F2965]/70 italic mb-4 leading-relaxed">
                    "{item.text}"
                  </p>
                  <div>
                    <p className="font-bold text-sm text-[#3F2965]">
                      {item.author}
                    </p>
                    <p className="text-xs text-[#DD1764]">{item.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Gradient spacer */}
      <div
        className="h-20 sm:h-32"
        style={{
          background: `linear-gradient(180deg, #faf5ff 0%, #fdfcf8 100%)`,
        }}
      />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

export default ContactPage;