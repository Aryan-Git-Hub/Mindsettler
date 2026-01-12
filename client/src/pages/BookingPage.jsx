import { useState, useEffect, useRef } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Info,
  MessageSquare,
  Loader2,
  Check,
  Search,
  AlertCircle,
  Wallet,
  ArrowRight,
  X,
  Sparkles,
  Sun,
  Moon,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import StatsSection from "../components/common/StatsSection"

// ==================== ANIMATION STYLES ====================
const animationStyles = `
  /* Custom Scrollbar */
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { 
    background: linear-gradient(180deg, #3F2965, #Dd1764); 
    border-radius: 10px; 
  }
  .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }

  /* Keyframes */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes slideInModal {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes successPop {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  @keyframes checkDraw {
    to { stroke-dashoffset: 0; }
  }

  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }

  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(221, 23, 100, 0.3); }
    50% { box-shadow: 0 0 40px rgba(221, 23, 100, 0.5); }
  }

  /* Animation Classes */
  .animate-fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  .animate-fade-in-down {
    animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  .animate-fade-in-left {
    animation: fadeInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  .animate-fade-in-right {
    animation: fadeInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  .animate-scale-in {
    animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-modal-in {
    animation: slideInModal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-success-pop {
    animation: successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  /* Skeleton Loading */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  /* Stagger Delays */
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
  .delay-600 { animation-delay: 0.6s; }
  .delay-700 { animation-delay: 0.7s; }

  /* Hover Effects */
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px -12px rgba(63, 41, 101, 0.25);
  }

  .hover-scale {
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hover-scale:hover {
    transform: scale(1.02);
  }
  .hover-scale:active {
    transform: scale(0.98);
  }

  /* Ripple Effect */
  .ripple-container {
    position: relative;
    overflow: hidden;
  }
  .ripple-container .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    pointer-events: none;
  }
  .ripple-container .ripple.active {
    animation: ripple 0.6s linear;
  }

  /* Glass Effect */
  .glass {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* Gradient Text - Updated to white/pink/light purple blend */
  .gradient-text {
    background: linear-gradient(135deg, #E9D5FF, #FBCFE8, #F9A8D4, #DDD6FE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Alternative gradient text with more white */
  .gradient-text-soft {
    background: linear-gradient(135deg, #FDFCFF, #F3E8FF, #FCE7F3, #FAE8FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 10px rgba(219, 39, 119, 0.2);
  }

  /* Progress Bar */
  .progress-fill {
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Progress Stepper Gradient */
  .stepper-gradient {
    background: linear-gradient(135deg, #FAE8FF, #FBCFE8, #F3E8FF);
  }

  .stepper-gradient-active {
    background: linear-gradient(135deg, #E9D5FF, #FBCFE8, #F9A8D4);
  }
`;

// ==================== COMPONENTS ====================

// Animated Background Shapes
const FloatingShapes = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div 
      className="absolute top-20 left-10 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl animate-float"
      style={{ animationDelay: "0s" }}
    />
    <div 
      className="absolute top-40 right-20 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl animate-float"
      style={{ animationDelay: "1s" }}
    />
    <div 
      className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-50/50 rounded-full blur-3xl animate-float"
      style={{ animationDelay: "2s" }}
    />
  </div>
);

// Progress Stepper - Updated with white/pink/light purple blend
const ProgressStepper = ({ currentStep }) => {
  const steps = [
    { label: "Therapy", icon: Sparkles },
    { label: "Schedule", icon: CalendarIcon },
    { label: "Confirm", icon: Check },
  ];

  return (
    <div className="animate-fade-in-down mb-4 md:mb-6">
      <div className="flex items-center justify-center gap-1 md:gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isComplete = index < currentStep;
          
          return (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center
                    transition-all duration-500 ease-out
                    ${isActive 
                      ? "bg-linear-to-br from-[#FAE8FF] via-[#FBCFE8] to-[#E9D5FF] text-pink-600 shadow-lg shadow-pink-200/50 border border-pink-200/50" 
                      : "bg-slate-100 text-slate-300"
                    }
                    ${isComplete ? "scale-90" : ""}
                  `}
                >
                  {isComplete ? (
                    <Check size={14} className="animate-scale-in md:w-4.5 md:h-4.5" />
                  ) : (
                    <Icon size={14} className="md:w-4.5 md:h-4.5" />
                  )}
                </div>
                <span className={`
                  text-[8px] md:text-[10px] font-bold uppercase mt-1 md:mt-2 tracking-wide md:tracking-wider
                  transition-colors duration-300
                  ${isActive ? "text-pink-500" : "text-slate-300"}
                `}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-4 md:w-16 h-1 mx-1 md:mx-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full bg-linear-to-r from-[#F3E8FF] via-[#FBCFE8] to-[#FAE8FF] progress-fill`}
                    style={{ width: isComplete ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Skeleton Loader
const SlotSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {[...Array(8)].map((_, i) => (
      <div 
        key={i} 
        className="h-14 rounded-2xl skeleton"
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
  </div>
);

// Animated Button with Ripple
const RippleButton = ({ children, onClick, className, disabled, ...props }) => {
  const buttonRef = useRef(null);

  const createRipple = (e) => {
    if (disabled) return;
    
    const button = buttonRef.current;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    ripple.className = "ripple active";
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      className={`ripple-container ${className}`}
      onClick={createRipple}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Section Title
const SectionTitle = ({ icon, title, subtitle, delay = 0 }) => (
  <div 
    className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4 animate-fade-in-up"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-linear-to-br from-pink-50 to-purple-50 text-[#Dd1764] shadow-sm hover-scale shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-black text-sm md:text-base text-[#3F2965] uppercase tracking-tight">
        {title}
      </h3>
      <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wide md:tracking-widest flex items-center gap-1">
        {subtitle}
      </span>
    </div>
  </div>
);

// Enhanced Slot Group with Staggered Animation
const SlotGroup = ({
  title,
  icon,
  slots,
  selectedSlot,
  onSelect,
  formatter,
}) => (
  <div className="animate-fade-in-up">
    <SectionTitle
      icon={icon}
      title={title}
      subtitle={`${slots.length} Available`}
    />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
      {slots.map((s, index) => (
        <RippleButton
          key={s}
          onClick={() => onSelect(s)}
          className={`
            py-3 md:py-4 rounded-xl md:rounded-2xl border-2 text-[10px] md:text-[11px] font-black
            transition-all duration-300 ease-out hover-lift
            animate-fade-in-up
            ${selectedSlot === s
              ? "bg-linear-to-br from-[#3F2965] to-[#4a3275] border-[#3F2965] text-white shadow-lg shadow-purple-200"
              : "bg-white border-slate-100 text-slate-500 hover:border-[#3F2965]/30 hover:text-[#3F2965]"
            }
          `}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <span className="flex items-center justify-center gap-1 md:gap-2">
            {selectedSlot === s && <Check size={12} className="animate-scale-in md:w-3.5 md:h-3.5" />}
            <span className="whitespace-nowrap">{formatter(s)}</span>
          </span>
        </RippleButton>
      ))}
    </div>
  </div>
);

// Enhanced Therapy Card
const TherapyCard = ({ therapy, isSelected, onClick, index }) => (
  <button
    onClick={onClick}
    className={`
      w-full text-left p-3 md:p-4 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-bold border-2
      transition-all duration-300 ease-out hover-lift
      animate-fade-in-left
      ${isSelected
        ? "bg-linear-to-r from-pink-50 to-purple-50 border-[#Dd1764] text-[#3F2965] shadow-md"
        : "border-transparent text-slate-400 hover:bg-slate-50 hover:text-slate-600"
      }
    `}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className="flex items-center gap-2 md:gap-3">
      <div className={`
        w-2 h-2 rounded-full transition-all duration-300 shrink-0
        ${isSelected ? "bg-[#Dd1764] scale-125" : "bg-slate-200"}
      `} />
      <span className="flex-1 leading-tight">{therapy}</span>
      {isSelected && (
        <ChevronRight size={14} className="shrink-0 text-[#Dd1764] animate-scale-in" />
      )}
    </div>
  </button>
);

// Session Type Toggle
const SessionTypeToggle = ({ sessionType, setSessionType }) => (
  <div className="flex gap-2 md:gap-4 mb-6 md:mb-10 animate-fade-in-up delay-200">
    {[
      { type: "online", icon: Video, label: "Online Session" },
      { type: "offline", icon: MapPin, label: "In-Person Visit" },
    ].map(({ type, icon: Icon, label }) => (
      <RippleButton
        key={type}
        onClick={() => setSessionType(type)}
        className={`
          flex-1 p-3 md:p-5 rounded-xl md:rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 
          font-black text-xs md:text-sm transition-all duration-300 hover-scale
          ${sessionType === type
            ? "border-[#3F2965] bg-linear-to-br from-[#3F2965] to-[#4a3275] text-white shadow-lg shadow-purple-200"
            : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
          }
        `}
      >
        <div className={`
          p-1.5 md:p-2 rounded-lg md:rounded-xl transition-all duration-300
          ${sessionType === type ? "bg-white/20" : "bg-slate-50"}
        `}>
          <Icon size={16} className="md:w-5 md:h-5" />
        </div>
        <span className="text-[10px] sm:text-xs md:text-sm">{type === "online" ? "Online" : "In-Person"}</span>
      </RippleButton>
    ))}
  </div>
);

// Confirmation Modal
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedTherapy, 
  selectedDate, 
  selectedSlot, 
  formatTo12Hr 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl md:rounded-[2.5rem] p-5 md:p-8 max-w-md w-full shadow-2xl animate-modal-in">
        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-[#Dd1764] to-[#3F2965] rounded-full opacity-10 blur-2xl" />
        
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 text-[#3F2965]">
          <div className="p-2 md:p-3 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl md:rounded-2xl animate-bounce-subtle">
            <Wallet size={20} className="md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg md:text-xl">Confirm Payment</h3>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium">Secure Transaction</p>
          </div>
        </div>

        <div className="p-3 md:p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl md:rounded-2xl mb-4 md:mb-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            You're booking{" "}
            <span className="font-black text-[#3F2965]">{selectedTherapy}</span>
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl md:rounded-2xl p-3 md:p-5 mb-5 md:mb-8 space-y-2 md:space-y-3">
          {[
            { label: "Date", value: selectedDate, icon: CalendarIcon },
            { label: "Time", value: formatTo12Hr(selectedSlot), icon: Clock },
            { label: "Fee", value: "₹500", icon: Wallet },
          ].map((item, i) => (
            <div 
              key={item.label}
              className="flex items-center justify-between text-[11px] md:text-xs font-bold animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-slate-400 flex items-center gap-2">
                <item.icon size={14} />
                {item.label}
              </span>
              <span className="text-[#3F2965]">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl mb-6 animate-fade-in-up delay-300">
          <Shield size={16} className="text-green-600" />
          <span className="text-xs font-medium text-green-700">
            Your payment is secure and encrypted
          </span>
        </div>

        <div className="flex gap-4">
          <RippleButton
            onClick={onClose}
            className="flex-1 py-4 text-xs font-black uppercase text-slate-400 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </RippleButton>
          <RippleButton
            onClick={onConfirm}
            className="flex-1 py-4 text-xs font-black uppercase text-white bg-linear-to-r from-[#Dd1764] to-[#e91e7e] rounded-xl shadow-lg shadow-pink-200 hover:opacity-90 transition-opacity"
          >
            Confirm & Pay
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

// Success Overlay
const SuccessOverlay = ({ isOpen, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-linear-to-br from-[#3F2965]/95 to-[#2a1a47]/95 backdrop-blur-md" />
      
      <div className="relative bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 max-w-lg w-full text-center shadow-2xl animate-modal-in overflow-hidden">
        {/* Confetti-like decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-float"
              style={{
                background: i % 2 === 0 ? "#Dd1764" : "#3F2965",
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative">
          {/* Success Icon */}
          <div className="relative mx-auto mb-6">
            <div className="w-24 h-24 bg-linear-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto animate-success-pop">
              <div className="w-16 h-16 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Check size={32} className="text-white" strokeWidth={3} />
              </div>
            </div>
            {/* Pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-24 h-24 rounded-full border-4 border-green-200"
                style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
              />
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#3F2965] mb-2 animate-fade-in-up delay-200">
            Booking Confirmed!
          </h2>
          <p className="text-slate-500 mb-8 font-medium animate-fade-in-up delay-300">
            Your session has been scheduled successfully. We've sent a confirmation to your email.
          </p>

          <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-8 animate-fade-in-up delay-400">
            <p className="text-xs font-bold text-[#3F2965]">
              💡 Tip: Add this session to your calendar to stay reminded!
            </p>
          </div>

          <RippleButton
            onClick={onNavigate}
            className="w-full py-5 bg-linear-to-r from-[#3F2965] to-[#4a3275] text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-purple-200 hover:opacity-90 transition-opacity animate-fade-in-up delay-500"
          >
            View My Sessions <ArrowRight size={20} />
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

// Error Alert
const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="mb-6 p-4 bg-linear-to-r from-red-50 to-pink-50 border border-red-100 text-red-600 rounded-2xl flex items-start gap-3 animate-fade-in-down shadow-sm">
      <div className="p-1 bg-red-100 rounded-lg shrink-0">
        <AlertCircle size={16} />
      </div>
      <p className="text-sm font-bold flex-1">{message}</p>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-red-100 rounded-lg transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

// Empty State
const EmptyState = () => (
  <div className="text-center py-16 bg-linear-to-br from-slate-50 to-purple-50/30 rounded-4xl border-2 border-dashed border-slate-200 animate-fade-in-up">
    <div className="relative inline-block">
      <Clock className="mx-auto text-slate-200 mb-4 animate-float" size={56} />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
        <X size={12} className="text-slate-400" />
      </div>
    </div>
    <p className="text-sm font-black text-slate-400 uppercase mb-2">
      No Slots Available
    </p>
    <p className="text-xs text-slate-300">
      Try selecting a different date
    </p>
  </div>
);

// ==================== MAIN COMPONENT ====================
const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollableRef = useRef(null);

  // --- States ---
  const [selectedSlot, setSelectedSlot] = useState("");
  const [sessionType, setSessionType] = useState("online");
  const [selectedTherapy, setSelectedTherapy] = useState(
    "Cognitive Behavioural Therapy (CBT)"
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availabilityId, setAvailabilityId] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // --- UI States ---
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const therapies = [
    "Cognitive Behavioural Therapy (CBT)",
    "Dialectical Behavioural Therapy (DBT)",
    "Acceptance & Commitment Therapy (ACT)",
    "Schema Therapy",
    "Emotion-Focused Therapy (EFT)",
    "Emotion-Focused Couples Therapy",
    "Mindfulness-Based Cognitive Therapy",
    "Client-Centred Therapy",
  ];

  // Page load animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate progress step
  const currentStep = selectedSlot ? 2 : selectedTherapy ? 1 : 0;

  useEffect(() => {
    if (errorMsg && scrollableRef.current) {
      scrollableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [errorMsg]);

  const formatTo12Hr = (time24) => {
    if (!time24 || typeof time24 !== "string") return time24;
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const fetchSlots = async () => {
    setLoadingSlots(true);
    setErrorMsg("");
    setSelectedSlot("");
    setAvailabilityId("");
    try {
      const res = await API.get(
        `/appointment/get-availability?date=${selectedDate}`
      );
      let fetchedSlots = res.data.data?.slots || [];
      const fetchedId = res.data.data?.availabilityId || "";

      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];

      if (selectedDate === todayStr) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        fetchedSlots = fetchedSlots.filter((slot) => {
          const [slotHour, slotMinute] = slot.split(":").map(Number);
          if (slotHour > currentHour) return true;
          if (slotHour === currentHour && slotMinute > currentMinute)
            return true;
          return false;
        });
      }

      setAvailableSlots(fetchedSlots);
      setAvailabilityId(fetchedId);
      if (fetchedSlots.length === 0 && selectedDate === todayStr) {
        setErrorMsg("No more slots available for today.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error fetching availability");
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const morningSlots = availableSlots.filter(
    (slot) => parseInt(slot.split(":")[0]) < 12
  );
  const eveningSlots = availableSlots.filter(
    (slot) => parseInt(slot.split(":")[0]) >= 12
  );

  const initiateBooking = () => {
    setErrorMsg("");
    if (!selectedSlot) {
      setErrorMsg("Please select a time slot first.");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleFinalPayment = async () => {
    setShowConfirmModal(false);
    setSubmitting(true);
    setErrorMsg("");
    try {
      await API.post("/appointment/book", {
        therapyType: selectedTherapy,
        date: selectedDate,
        timeSlot: selectedSlot,
        sessionType: sessionType,
        notes: note,
        availabilityRef: availabilityId,
      });
      user.walletBalance -= 500;
      setShowSuccess(true);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          "Transaction failed. Insufficient wallet balance."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{animationStyles}</style>

      <Navbar />

      <div className="min-h-screen pt-24 bg-linear-to-br from-[#FDFCFD] via-white to-purple-50/30 font-sans flex flex-col relative overflow-hidden">
        <FloatingShapes />

        {/* Modals */}
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleFinalPayment}
          selectedTherapy={selectedTherapy}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          formatTo12Hr={formatTo12Hr}
        />

        <SuccessOverlay
          isOpen={showSuccess}
          onNavigate={() => navigate(`/profile#${encodeURIComponent('My Bookings')}`)}
        />

        <main className={`
          relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col px-4 md:px-8 pb-6
          transition-opacity duration-500
          ${pageLoaded ? "opacity-100" : "opacity-0"}
        `}>
          {/* Header - Updated with new gradient colors */}
          <header className="py-3 md:py-4 animate-fade-in-down">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tight">
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #e91e7e)",
                    }}
                  >
                    Schedule Session
                  </span>
                </h1>
                <p className="text-sm text-slate-400 mt-1 font-medium">
                  Book your personalized therapy session
                </p>
              </div>
              <ProgressStepper currentStep={currentStep} />
            </div>
          </header>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 overflow-hidden pb-4">
            {/* Sidebar */}
            <aside className="flex flex-col gap-4 md:gap-6 overflow-hidden animate-fade-in-left">
              <div className="glass p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] border border-white/50 shadow-xl shadow-purple-100/20 flex-1 overflow-y-auto custom-scrollbar max-h-100 lg:max-h-none">
                <h2 className="font-black text-base md:text-lg mb-4 md:mb-6 text-[#3F2965] flex items-center gap-2">
                  <Sparkles size={20} className="text-[#Dd1764]" />
                  THERAPY TYPE
                </h2>
                <div className="space-y-2">
                  {therapies.map((t, index) => (
                    <TherapyCard
                      key={t}
                      therapy={t}
                      isSelected={selectedTherapy === t}
                      onClick={() => setSelectedTherapy(t)}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              <div className="glass p-4 md:p-6 rounded-2xl md:rounded-4xl border border-white/50 shadow-xl shadow-purple-100/20 shrink-0 animate-fade-in-up delay-300">
                <h3 className="font-black mb-3 md:mb-4 flex items-center gap-2 text-[10px] md:text-xs uppercase text-[#3F2965]">
                  <Info size={14} className="text-[#Dd1764] md:w-4 md:h-4" /> Session Details
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {[
                    { label: "Duration", value: "60 Minutes", icon: Clock },
                    { label: "Session Fee", value: "₹500", icon: Wallet },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-xs font-bold p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 flex items-center gap-2">
                        <item.icon size={14} />
                        {item.label}
                      </span>
                      <span className="text-[#3F2965]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <section className="lg:col-span-2 glass rounded-[2.5rem] border border-white/50 shadow-xl shadow-purple-100/20 flex flex-col overflow-hidden animate-fade-in-right">
              <div
                ref={scrollableRef}
                className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 custom-scrollbar"
              >
                <ErrorAlert message={errorMsg} onClose={() => setErrorMsg("")} />

                {/* Date Picker */}
                <div className="mb-6 md:mb-10 animate-fade-in-up">
                  <SectionTitle
                    icon={<CalendarIcon size={16} className="md:w-4.5 md:h-4.5" />}
                    title="Choose Date"
                    subtitle="Select your preferred date"
                  />
                  <div className="flex flex-col sm:flex-row items-stretch gap-2 md:gap-3 mt-2 md:mt-3">
                    <div className="relative flex-1">
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-4 pr-12 rounded-2xl bg-slate-50 font-bold text-[#3F2965] outline-none border-2 border-transparent focus:border-[#3F2965]/20 transition-colors"
                      />
                    </div>
                    <RippleButton
                      onClick={fetchSlots}
                      disabled={loadingSlots}
                      className="px-8 py-4 bg-linear-to-r from-[#3F2965] to-[#4a3275] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-200 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {loadingSlots ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          <Search size={16} className="md:w-4.5 md:h-4.5" />
                          <span className="hidden sm:inline">Find Slots</span>
                        </>
                      )}
                    </RippleButton>
                  </div>
                </div>

                {/* Session Type */}
                <SessionTypeToggle 
                  sessionType={sessionType} 
                  setSessionType={setSessionType} 
                />

                {/* Time Slots */}
                <div className="space-y-10">
                  {loadingSlots ? (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl skeleton" />
                          <div className="space-y-2">
                            <div className="w-24 h-4 skeleton rounded" />
                            <div className="w-16 h-3 skeleton rounded" />
                          </div>
                        </div>
                        <SlotSkeleton />
                      </div>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <>
                      {morningSlots.length > 0 && (
                        <SlotGroup
                          title="Morning"
                          icon={<Sun size={18} />}
                          slots={morningSlots}
                          selectedSlot={selectedSlot}
                          onSelect={setSelectedSlot}
                          formatter={formatTo12Hr}
                        />
                      )}
                      {eveningSlots.length > 0 && (
                        <SlotGroup
                          title="Afternoon & Evening"
                          icon={<Moon size={18} />}
                          slots={eveningSlots}
                          selectedSlot={selectedSlot}
                          onSelect={setSelectedSlot}
                          formatter={formatTo12Hr}
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Notes */}
                <div className="mt-8 md:mt-12 animate-fade-in-up delay-400">
                  <SectionTitle
                    icon={<MessageSquare size={16} className="md:w-4.5 md:h-4.5" />}
                    title="Session Notes"
                    subtitle="Private & Confidential"
                  />
                  <div className="relative">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Share any specific concerns or topics you'd like to discuss..."
                      className="w-full mt-2 md:mt-3 p-3 md:p-5 rounded-2xl md:rounded-3xl bg-slate-50 h-28 md:h-32 resize-none text-xs md:text-sm font-medium outline-none border-2 border-transparent focus:border-[#3F2965]/20 transition-colors"
                    />
                    <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300">
                      {note.length}/500
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 md:p-8 border-t border-slate-100 bg-white/80 backdrop-blur-sm shrink-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                    <div className="p-2 md:p-3 bg-linear-to-br from-green-50 to-emerald-50 text-green-600 rounded-xl md:rounded-2xl">
                      <Wallet size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-wide md:tracking-widest">
                        Payment Method
                      </p>
                      <p className="text-xs md:text-sm font-bold text-[#3F2965]">
                        Wallet Balance: ₹{user?.walletBalance || 0}
                      </p>
                    </div>
                  </div>

                  <RippleButton
                    disabled={submitting || !selectedSlot || !availabilityId}
                    onClick={initiateBooking}
                    className={`
                      w-full md:w-auto px-6 md:px-12 py-3.5 md:py-5 
                      bg-linear-to-r from-[#Dd1764] to-[#e91e7e] 
                      text-white font-black rounded-xl md:rounded-2xl 
                      shadow-xl shadow-pink-200 
                      hover:opacity-90 active:scale-[0.98]
                      disabled:opacity-30 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2 md:gap-3 
                      transition-all duration-300
                      text-xs md:text-base
                      ${selectedSlot && !submitting ? "animate-glow" : ""}
                    `}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span className="hidden sm:inline">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        <span>Confirm & Pay ₹500</span>
                      </>
                    )}
                  </RippleButton>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <StatsSection />
      <Footer />
    </>
  );
};

export default BookingPage;