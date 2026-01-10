import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Instagram, Send, Loader2, CheckCircle } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import API from "../api/axios"; // Adjust path to your axios instance
import FAQSection from "../components/common/FAQ";

const ContactPage = () => {
  // State for form and status
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await API.post("/user/contact/send", formData);
      if (res.data.success) {
        setStatus({ type: "success", text: "Thank you! Your message has been sent." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Oops! Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <Phone size={24} />, title: "Phone", detail: "+1 (234) 567-890", bgColor: "bg-[#3F2965]/5" },
    { icon: <MessageCircle size={24} />, title: "WhatsApp", detail: "+1 (234) 567-891", bgColor: "bg-[#3F2965]/5" },
    { icon: <Mail size={24} />, title: "Email", detail: "support@mindsettler.com", bgColor: "bg-[#3F2965]/5" },
    { icon: <Instagram size={24} />, title: "Instagram", detail: "@mindsettler_official", bgColor: "bg-[#Dd1764]/5" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-25 bg-slate-50 font-sans text-[#3F2965]">
        <section className="pt-5 pb-32 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold mb-6">
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto text-[#3F2965]/70 leading-relaxed">
            MindSettler provides a safe environment. Reach out for guidance or to book a consultation.
          </motion.p>
        </section>

        <div className="max-w-6xl mx-auto px-6 -mt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side (Icons) */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.div key={index} whileHover={{ y: -5 }} className={`${item.bgColor} p-8 rounded-3xl flex flex-col items-center text-center transition-all shadow-sm border border-white/50`}>
                    <div className="mb-4">{React.cloneElement(item.icon, { className: item.title === "Instagram" ? "text-[#Dd1764]" : "text-[#3F2965]" })}</div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm opacity-70">{item.detail}</p>
                  </motion.div>
                ))}
              </div>
              <div className="w-full h-64 rounded-4xl overflow-hidden shadow-lg border-4 border-white">
                <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0182993870!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050c58!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1625123456789!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
              </div>
            </div>

            {/* Right Side (Form) */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50">
              <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
              <p className="text-[#3F2965]/60 mb-8">Fill out the form below and we'll get back to you shortly.</p>

              {/* Status Message */}
              {status && (
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-2 text-sm font-bold ${status.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                  {status.type === "success" && <CheckCircle size={18} />}
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your Name..." className="w-full p-4 rounded-2xl bg-[#F5F2ED]/50 outline-none focus:ring-2 focus:ring-[#3F2965]/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1">Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="example@yourmail.com" className="w-full p-4 rounded-2xl bg-[#F5F2ED]/50 outline-none focus:ring-2 focus:ring-[#3F2965]/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1">Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} type="text" placeholder="Booking / General Inquiry" className="w-full p-4 rounded-2xl bg-[#F5F2ED]/50 outline-none focus:ring-2 focus:ring-[#3F2965]/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1">Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Type Here..." className="w-full p-4 rounded-2xl bg-[#F5F2ED]/50 outline-none focus:ring-2 focus:ring-[#3F2965]/10 resize-none transition-all"></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full py-4 bg-[#Dd1764] hover:bg-[#c01456] text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <>Send Now <Send size={18} /></>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <div class="h-40 bg-linear-to-b from-[#f9fafc] to-[#fdfcf8]"></div>
      <FAQSection />
      <Footer />
    </>
  );
};

export default ContactPage;