import React from 'react';
import { Video, ShieldCheck, HeartHandshake, ArrowRight, Calendar} from 'lucide-react';
import {Link} from "react-router"
import MindSettlerSection_img from '../../assets/images/MindsettlarSection_img.jpg' // Exchange img at line 21

const MindSettlerSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-[#3F2965]/5 to-[#Dd1764]/5 py-16 lg:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-[#Dd1764]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Interactive Visuals */}
          <div className="relative group perspective-1000">
            {/* Main Image Container with Float Animation */}
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[#3F2965]/20">
              {/* Placeholder for the illustration - You can replace the src below with your actual illustration */}
              <img 
                 src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop"//{MindSettlerSection_img}
                alt="Online Mental Health Consultation" 
                className="w-full h-100 object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-[#3F2965]/50 to-transparent flex items-end p-8">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-semibold text-lg">Private & Secure</p>
                  <p className="text-sm opacity-90">Encrypted sessions for your peace of mind.</p>
                </div>
              </div>
            </div>

            {/* Floating Badge 1: Video Call */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-bounce-slow z-20 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="bg-[#Dd1764]/10 p-2 rounded-full">
                  <Video className="w-6 h-6 text-[#Dd1764]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Live Session</p>
                  <p className="text-[#3F2965] font-bold text-sm">Connected</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#3F2965] leading-tight">
                How <span className="text-[#Dd1764]">MindSettler</span> Empowers Your Well-being
              </h2>
              <div className="w-20 h-1.5 bg-linear-to-r from-[#Dd1764] to-[#3F2965] rounded-full" />
            </div>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                MindSettler is more than just counseling; it is a holistic 
                <span className="font-semibold text-[#3F2965]"> psycho-education platform</span> designed to help you understand your mental health. We offer a safe, private space that fits seamlessly into your daily life.
              </p>
              
              <p>
                Whether you prefer <span className="text-[#Dd1764] font-medium">online connectivity</span> from home or structured offline sessions, our mentors guide you through life challenges with practical, easy-to-apply methods. We focus on awareness and personalized support to help you navigate stress, career confusion, or emotional overwhelm.
              </p>

              <ul className="space-y-3 mt-4">
                {[
                  "Safe and confidential environment",
                  "Structured psycho-education sessions",
                  "Personalized guidance for life challenges"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <HeartHandshake className="w-5 h-5 text-[#Dd1764] shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-[#Dd1764] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#c01356] transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Hover shine effect */}
                <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-[#3F2965]/10"></div>
              </button>
              
              <Link to='/booking'>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#3F2965] border-2 border-[#3F2965]/10 rounded-xl font-bold text-lg hover:border-[#3F2965] hover:bg-[#3F2965]/5 transition-all duration-300">
                <Calendar className="w-5 h-5" />
                Book Consultation
              </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
      
      {/* Custom Styles for slow bounce animations if not in tailwind config */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default MindSettlerSection;