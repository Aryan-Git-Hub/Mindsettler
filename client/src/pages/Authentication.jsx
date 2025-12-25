import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

// --- 1. ENHANCED HIGH-DENSITY BACKGROUND ---
const MindDustBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 180 }; // Increased radius for better interaction

    const handleMouseMove = (e) => { 
      mouse.x = e.clientX; 
      mouse.y = e.clientY; 
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Smaller size for higher density (looks more like dust/mist)
        this.size = Math.random() * 1.8 + 0.2; 
        this.baseX = this.x;
        this.baseY = this.y;
        // Randomized density for varied organic movement
        this.density = (Math.random() * 25) + 1;
        this.color = Math.random() > 0.6 ? '#3F2965' : '#DD1764';
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          // Pushes particles away from the mouse
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        } else {
          // Gently drift back to original position
          this.x += (this.baseX - this.x) * 0.03;
          this.y += (this.baseY - this.y) * 0.03;
        }
      }
    }

    // --- INCREASED PARTICLE COUNT HERE ---
    const init = () => {
      particles = [];
      const numberOfParticles = 3000; // Increased from 120
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { 
        p.draw(); 
        p.update(); 
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// --- 2. THE MAIN AUTH PAGE (SAME AS BEFORE) ---
const AuthPage = () => {
  const [view, setView] = useState('login'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      setIsSubmitting(true);
      const API = axios.create({ baseURL: 'http://localhost:4000/api' });
      const response = await API.post(`/user/${view === 'login' ? 'login' : view === 'signup' ? 'signup' : 'forgot-password'}`, data);
      const responseData = await response.data;
      if (responseData.success) {
        localStorage.setItem('token', data.token);
        setView('success');
        setIsSubmitting(false);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission Error:', error.response?.data?.message);
      setView('login');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fcfaff] overflow-hidden p-6 font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-150 h-150 bg-[#3F2965]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-150 h-150 bg-[#DD1764]/10 rounded-full blur-[140px]" />
      </div>
      
      <MindDustBackground />

      <AnimatePresence mode="wait">
        {view === 'success' ? (
          <SuccessState key="success" onBack={() => setView('login')} />
        ) : (
          <motion.div
            key={view}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="relative z-10 w-full max-w-115 bg-white/75 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-2xl border border-white/50 text-center"
          >
            {/* Minimalist Logo */}
            <div className="w-12 h-12 bg-linear-to-br from-[#3F2965] to-[#DD1764] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="text-white" fill="white" size={20} />
            </div>

            <h2 className="text-3xl font-black text-[#3F2965] mb-2">
                {view === 'login' ? "Welcome Back" : view === 'signup' ? "Create Account" : "Reset Password"}
            </h2>
            <p className="text-gray-400 text-sm mb-8">Secure your mental well-being journey.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {view === 'signup' && <Input icon={<User />} placeholder="Full Name" name="name" required />}
              <Input icon={<Mail />} type="email" placeholder="Email Address" name="email" required />
              {view !== 'forgot' && <Input icon={<Lock />} type="password" placeholder="Password" name="password" required />}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#3F2965] hover:bg-[#DD1764] text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? <Sparkles className="animate-spin" /> : "CONTINUE"}
                {!isSubmitting && <ArrowRight size={18} />}
              </motion.button>
            </form>

            <div className="mt-8 flex flex-col gap-3">
               <button onClick={() => setView(view === 'login' ? 'signup' : 'login')} className="text-sm font-bold text-[#DD1764]">
                 {view === 'login' ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY HAVE AN ACCOUNT? LOG IN"}
               </button>
               {view === 'login' && (
                 <button onClick={() => setView('forgot')} className="text-xs text-gray-400 hover:text-[#3F2965]">
                   Forgot your password?
                 </button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Input
const Input = ({ icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#DD1764] transition-colors">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <input 
      {...props} 
      className="w-full pl-12 pr-6 py-4 bg-gray-50/50 rounded-2xl border-2 border-transparent focus:border-[#DD1764]/20 focus:bg-white outline-none transition-all font-semibold"
    />
  </div>
);

const SuccessState = ({ onBack }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-10 bg-white p-12 rounded-[3.5rem] text-center shadow-2xl max-w-sm">
    <CheckCircle2 size={50} className="text-green-500 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-[#3F2965]">Check your email</h2>
    <p className="text-gray-400 my-4 text-sm">We've sent a magic link to your inbox.</p>
    <button onClick={onBack} className="text-[#DD1764] font-bold underline">Back to Login</button>
  </motion.div>
);

export default AuthPage;