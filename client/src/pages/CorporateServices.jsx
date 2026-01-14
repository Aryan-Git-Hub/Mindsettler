import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Users, LineChart, ShieldCheck, Mail, Phone,
  MessageSquare, ChevronRight, Loader2, CheckCircle2, AlertCircle
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import CSbgimg from "../assets/images/CorporateService-BGimg.jpg";
import Footer from "../components/common/Footer.jsx";
import API from "../api/axios"; // Ensure this points to your axios instance

const CorporateServices = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "", // Maps to workEmail in controller
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      // Sending data to your new controller
      await API.post("/user/corporate/send", {
        contactPerson: formData.contactPerson,
        companyName: formData.companyName,
        workEmail: formData.email,
        message: formData.message,
      });

      setStatus({ loading: false, success: true, error: "" });
      setFormData({ companyName: "", contactPerson: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus((prev) => ({ ...prev, success: false })), 5000);
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || "Failed to send inquiry. Please try again.",
      });
    }
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const services = [
    {
      title: "Custom Workshops",
      description: "Interactive sessions on stress management, emotional intelligence, and work-life harmony.",
      icon: <Users className="w-6 h-6 text-[#Dd1764]" />,
    },
    {
      title: "Leadership Coaching",
      description: "Empowering managers to lead with empathy and identify burnout within their teams.",
      icon: <ShieldCheck className="w-6 h-6 text-[#Dd1764]" />,
    },
    {
      title: "Employee Counseling",
      description: "Confidential 1-on-1 sessions for employees through our structured MindSettler framework.",
      icon: <MessageSquare className="w-6 h-6 text-[#Dd1764]" />,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-[#fcfaff] min-h-screen font-sans text-[#3F2965] overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center pt-20 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={CSbgimg} alt="Corporate Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-10">
              <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Healthy Minds, <br />
                <span className="text-[#Dd1764]">Thriving Businesses.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 0.4, duration: 1 }} className="text-lg text-purple-100 leading-relaxed mb-10">
                MindSettler partners with organizations to build resilient cultures. From psycho-education workshops to personalized guidance, we provide the tools your team needs.
              </motion.p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <a href="#contact" className="inline-block bg-[#Dd1764] text-white px-10 py-4 rounded-full font-bold hover:bg-[#c41457] transition-colors shadow-xl">
                  Request a Consultation
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: LineChart, label: "Boost Productivity", desc: "Reduce absenteeism through proactive support." },
              { icon: Building2, label: "Stronger Culture", desc: "Foster a safe, stigma-free environment." },
              { icon: ShieldCheck, label: "Secure & Private", desc: "Strict HIPAA-compliant privacy protocols." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-8 bg-white rounded-2xl shadow-sm border border-purple-50">
                <item.icon className="w-12 h-12 text-[#3F2965] mx-auto mb-6" />
                <h3 className="font-bold text-xl mb-3">{item.label}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-[#F3F0F7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Our Corporate Offerings</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div key={index} whileHover={{ y: -10 }} className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden">
                  <div className="bg-[#Dd1764]/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">{service.description}</p>
                  <div className="flex items-center gap-2 text-[#Dd1764] font-bold">Explore Details <ChevronRight className="w-4 h-4" /></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-purple-50">
            {/* Info Side */}
            <div className="bg-[#3F2965] text-white p-12 md:w-2/5">
              <h2 className="text-4xl font-bold mb-8">Let's Talk.</h2>
              <p className="mb-12 text-purple-100/80 text-lg">Ready to transform your workplace? Our team is standing by.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-white/10 rounded-xl"><Mail className="w-6 h-6 text-[#Dd1764]" /></div>
                  <span className="font-medium">corporate@mindsettler.com</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-white/10 rounded-xl"><Phone className="w-6 h-6 text-[#Dd1764]" /></div>
                  <span className="font-medium">+1 (555) 000-0000</span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-12 md:w-3/5">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Status Messages */}
                <AnimatePresence>
                  {status.success && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:col-span-2 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 font-bold text-sm">
                      <CheckCircle2 size={20} /> Partnership request submitted successfully!
                    </motion.div>
                  )}
                  {status.error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:col-span-2 bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-bold text-sm">
                      <AlertCircle size={20} /> {status.error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col group">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Contact Person</label>
                  <input required name="contactPerson" value={formData.contactPerson} onChange={handleChange} type="text" className="border-b-2 border-slate-100 py-2 focus:border-[#Dd1764] outline-none transition-all bg-transparent" placeholder="Your name..." />
                </div>
                
                <div className="flex flex-col group">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Company Name</label>
                  <input required name="companyName" value={formData.companyName} onChange={handleChange} type="text" className="border-b-2 border-slate-100 py-2 focus:border-[#Dd1764] outline-none transition-all bg-transparent" placeholder="Company name..." />
                </div>

                <div className="flex flex-col md:col-span-2 group">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Work Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="border-b-2 border-slate-100 py-2 focus:border-[#Dd1764] outline-none transition-all bg-transparent" placeholder="email@company.com" />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows="3" className="border-2 border-slate-50 rounded-xl p-4 focus:border-[#Dd1764] outline-none transition-all bg-purple-50/20" placeholder="How can we help your team?"></textarea>
                </div>

                <motion.button disabled={status.loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="md:col-span-2 bg-[#3F2965] text-white py-5 rounded-xl font-bold hover:shadow-2xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70">
                  {status.loading ? <Loader2 className="animate-spin" /> : "Submit Partnership Request"}
                </motion.button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CorporateServices;