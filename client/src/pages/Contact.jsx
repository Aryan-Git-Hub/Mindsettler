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

// Floating particles background
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 10 + 5,
          height: Math.random() * 10 + 5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: i % 2 === 0 ? "rgba(63, 41, 101, 0.1)" : "rgba(221, 23, 100, 0.1)",
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

// Contact Info Card Component
const ContactCard = ({ icon, title, detail, description, color, delay, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      relative overflow-hidden cursor-pointer
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
        ${color === "pink" 
          ? "bg-linear-to-br from-[#DD1764]/5 to-transparent" 
          : "bg-linear-to-br from-[#3F2965]/5 to-transparent"
        }
      `}
    />

    {/* Icon */}
    <div
      className={`
        relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
        flex items-center justify-center mb-4
        transition-transform duration-300 group-hover:scale-110
        ${color === "pink"
          ? "bg-linear-to-br from-[#DD1764]/10 to-[#DD1764]/5 text-[#DD1764]"
          : "bg-linear-to-br from-[#3F2965]/10 to-[#3F2965]/5 text-[#3F2965]"
        }
      `}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>

    {/* Content */}
    <h3 className="relative font-bold text-base sm:text-lg text-[#3F2965] mb-1">
      {title}
    </h3>
    <p className={`relative text-sm sm:text-base font-semibold mb-1 ${
      color === "pink" ? "text-[#DD1764]" : "text-[#3F2965]/80"
    }`}>
      {detail}
    </p>
    {description && (
      <p className="relative text-xs sm:text-sm text-[#3F2965]/50">
        {description}
      </p>
    )}

    {/* Arrow indicator */}
    <div className="absolute top-5 right-5 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
      <ArrowRight size={18} className={color === "pink" ? "text-[#DD1764]" : "text-[#3F2965]"} />
    </div>
  </motion.div>
);

// Input Component
const FormInput = ({ label, error, ...props }) => (
  <div className="space-y-1.5 sm:space-y-2">
    <label className="block text-xs sm:text-sm font-semibold text-[#3F2965] ml-1">
      {label}
      {props.required && <span className="text-[#DD1764] ml-0.5">*</span>}
    </label>
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-linear-to-r from-[#3F2965] to-[#DD1764] rounded-xl sm:rounded-2xl opacity-0 group-focus-within:opacity-10 blur transition-opacity duration-300" />
      {props.as === "textarea" ? (
        <textarea
          {...props}
          className={`
            relative w-full p-3.5 sm:p-4
            bg-[#F8F6F3]/80 hover:bg-[#F8F6F3]
            border-2 border-transparent
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
            bg-[#F8F6F3]/80 hover:bg-[#F8F6F3]
            border-2 border-transparent
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
            className="w-20 h-20 mx-auto mb-5 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30"
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
            className="w-full py-3 bg-linear-to-r from-[#3F2965] to-[#5a3d8a] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
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

  const contactInfo = [
    {
      icon: <Phone />,
      title: "Call Us",
      detail: "+1 (234) 567-890",
      description: "Mon-Fri, 9am-6pm",
      color: "purple",
    },
    {
      icon: <MessageCircle />,
      title: "WhatsApp",
      detail: "+1 (234) 567-891",
      description: "Quick responses",
      color: "purple",
    },
    {
      icon: <Mail />,
      title: "Email",
      detail: "support@mindsettler.com",
      description: "We reply within 24h",
      color: "purple",
    },
    {
      icon: <Instagram />,
      title: "Instagram",
      detail: "@mindsettler_official",
      description: "Follow for updates",
      color: "pink",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-[#fdfcf8] font-sans text-[#3F2965]">
        
        {/* === HERO SECTION === */}
        <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-28 px-4 overflow-hidden">
          <FloatingElements />

          {/* Background decorations */}
          <div className="absolute top-20 left-0 w-72 h-72 bg-[#3F2965]/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-0 w-96 h-96 bg-[#DD1764]/5 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50 mb-6"
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3F2965] via-[#DD1764] to-[#3F2965]">
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
                  className="flex items-center gap-2 text-[#3F2965]/50"
                >
                  <item.icon size={16} className="text-[#DD1764]" />
                  <span className="text-xs sm:text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === MAIN CONTENT === */}
        <section className="relative px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-28">
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
                    <ContactCard
                      key={index}
                      {...item}
                      delay={index * 0.1}
                    />
                  ))}
                </div>

                {/* Additional info card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative overflow-hidden p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-[#3F2965] to-[#5a3d8a] text-white"
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
                      Our support team is available for emergencies. Don't hesitate to reach out.
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#3F2965] font-bold text-sm rounded-xl hover:bg-white/90 transition-colors"
                    >
                      <Phone size={16} />
                      Call Now
                    </a>
                  </div>
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
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#3F2965] via-[#DD1764] to-[#3F2965] rounded-t-3xl" />

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
                        bg-linear-to-r from-[#DD1764] via-[#e83d7f] to-[#DD1764]
                        bg-size-[200%_100%] bg-left hover:bg-right
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
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={18} className="group-hover:translate-x-1 transition-transform" />
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
        <section className="py-12 sm:py-16 bg-linear-to-r from-[#3F2965]/5 via-transparent to-[#DD1764]/5">
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
                  className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/50 shadow-sm"
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
      <div className="h-20 sm:h-32 bg-linear-to-b from-[#fdfcf8] to-white" />

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