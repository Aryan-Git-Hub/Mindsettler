import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Instagram, Send } from 'lucide-react';
import Navbar from '../components/common/Navbar';



const ContactPage = () => {
  const contactInfo = [
    {
      icon: <Phone className="text-[#3F2965]" size={24} />,
      title: "Phone",
      detail: "+1 (234) 567-890",
      bgColor: "bg-[#3F2965]/5"
    },
    {
      icon: <MessageCircle className="text-[#3F2965]" size={24} />,
      title: "WhatsApp",
      detail: "+1 (234) 567-891",
      bgColor: "bg-[#3F2965]/5"
    },
    {
      icon: <Mail className="text-[#3F2965]" size={24} />,
      title: "Email",
      detail: "support@mindsettler.com",
      bgColor: "bg-[#3F2965]/5"
    },
    {
      icon: <Instagram className="text-[#Dd1764]" size={24} />,
      title: "Instagram",
      detail: "@mindsettler_official",
      bgColor: "bg-[#Dd1764]/5"
    }
  ];

  return (
    <>
    <div className="h-25" />
    <div className="min-h-screen bg-[#FDFCF9] font-sans text-[#3F2965]">
      {/* Header Section */}
      <section className="pt-5 pb-32 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-[#3F2965]/70 leading-relaxed"
        >
          MindSettler provides a safe and confidential environment for your mental well-being. 
          Reach out for guidance, awareness, or to book your personalized consultation.
        </motion.p>
      </section>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Cards & Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`${item.bgColor} p-8 rounded-[24px] flex flex-col items-center text-center transition-all shadow-sm border border-white/50`}
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm opacity-70">{item.detail}</p>
                </motion.div>
              ))}
            </div>

            {/* Google Map Placeholder */}
            <div className="w-full h-64 rounded-[32px] overflow-hidden shadow-lg border-4 border-white">
              <iframe 
                title="MindSettler Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.83543450937!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1633000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-[40px] shadow-xl shadow-[#3F2965]/5 border border-gray-50"
          >
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <p className="text-[#3F2965]/60 mb-8">Fill out the form below and we'll get back to you shortly.</p>
            
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name..." 
                  className="w-full p-4 rounded-2xl bg-[#F5F2ED]/50 border-none focus:ring-2 focus:ring-[#3F2965]/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="example@yourmail.com" 
                  className="w-full p-4 rounded-2xl bg-[#F5F2ED]/50 border-none focus:ring-2 focus:ring-[#3F2965]/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Booking / General Inquiry" 
                  className="w-full p-4 rounded-2xl bg-[#F5F2ED]/50 border-none focus:ring-2 focus:ring-[#3F2965]/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Type Here..." 
                  className="w-full p-4 rounded-2xl bg-[#F5F2ED]/50 border-none focus:ring-2 focus:ring-[#3F2965]/10 outline-none transition-all resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 bg-[#Dd1764] hover:bg-[#c01456] text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#Dd1764]/20"
              >
                Send Now <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;