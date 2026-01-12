import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Send,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Heart,
  GripVertical,
  ArrowDown,
} from "lucide-react";
import API from "../../api/axios.js";
import botAvatar from "../../assets/icons/ChatBotmini-removebg-preview.png";

const chatId = crypto.randomUUID();

// Quick reply suggestions
const quickReplies = [
  { text: "I'm feeling anxious", emoji: "😰" },
  { text: "I need to talk", emoji: "💭" },
  { text: "Book a session", emoji: "📅" },
  { text: "I'm doing okay", emoji: "😊" },
];

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
        style={{
          left: `${15 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${3 + i * 0.5}s`,
        }}
      />
    ))}
  </div>
);

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div className="relative mr-2 mt-1">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-[#3F2965] via-[#5a3d8a] to-[#Dd1764] p-0.5 shadow-lg shadow-purple-500/20">
        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
          <img src={botAvatar} alt="" className="w-6 h-6 object-contain" />
        </div>
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
    </div>
    <div className="bg-white/80 backdrop-blur-sm px-5 py-4 rounded-3xl rounded-tl-lg border border-white/50 shadow-lg shadow-slate-200/50">
      <div className="flex items-center gap-1.5">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 bg-gradient-to-r from-[#3F2965] to-[#Dd1764] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <span className="text-[10px] font-medium text-slate-400 ml-2">
          typing...
        </span>
      </div>
    </div>
  </div>
);

// Message bubble component
const MessageBubble = ({ message, isUser, isLatest }) => {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} group animate-in fade-in ${
        isUser ? "slide-in-from-right-2" : "slide-in-from-left-2"
      } duration-300`}
    >
      {!isUser && (
        <div className="relative mr-2 mt-1 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-[#3F2965] via-[#5a3d8a] to-[#Dd1764] p-0.5 shadow-lg shadow-purple-500/20 transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
              <img src={botAvatar} alt="" className="w-6 h-6 object-contain" />
            </div>
          </div>
          {isLatest && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>
      )}

      <div className="relative max-w-[75%] sm:max-w-[80%]">
        <div
          className={`
            relative p-4 sm:p-5 text-[13px] sm:text-sm font-medium leading-relaxed
            transition-all duration-300 group-hover:shadow-xl
            ${
              isUser
                ? `bg-gradient-to-br from-[#Dd1764] via-[#e83d7f] to-[#ff6b9d] text-white 
                   rounded-[1.5rem] rounded-tr-lg shadow-lg shadow-pink-500/25
                   hover:shadow-pink-500/40`
                : `bg-white/80 backdrop-blur-sm text-slate-700 
                   rounded-[1.5rem] rounded-tl-lg border border-white/50 
                   shadow-lg shadow-slate-200/50 hover:bg-white`
            }
          `}
        >
          {!isUser && (
            <div className="absolute inset-0 rounded-[1.5rem] rounded-tl-lg bg-gradient-to-br from-purple-50/50 to-pink-50/50 pointer-events-none" />
          )}
          <span className="relative z-10">{message.content}</span>
          <div
            className={`absolute top-3 w-3 h-3 transform rotate-45 ${
              isUser
                ? "-right-1 bg-gradient-to-br from-[#Dd1764] to-[#e83d7f]"
                : "-left-1 bg-white/80 border-l border-t border-white/50"
            }`}
          />
        </div>

        <div
          className={`flex items-center gap-2 mt-1.5 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-[9px] sm:text-[10px] font-medium text-slate-300">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {!isUser && (
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded-full transition-all"
            >
              <Heart size={12} className="text-slate-300 hover:text-pink-500" />
            </button>
          )}
        </div>

        {showReactions && !isUser && (
          <div className="absolute -bottom-8 left-0 flex gap-1 p-1.5 bg-white rounded-full shadow-xl border animate-in zoom-in-95 duration-200">
            {["❤️", "👍", "😊", "🙏"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => setShowReactions(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 rounded-full transition-transform hover:scale-125"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="relative ml-2 mt-1 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {message.userName?.charAt(0) || "U"}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// DRAGGABLE BUTTON HOOK
// ============================================
const useDraggable = (initialPosition = null) => {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem("chatWidgetPosition");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return initialPosition;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (position) {
      localStorage.setItem("chatWidgetPosition", JSON.stringify(position));
    }
  }, [position]);

  const constrainPosition = useCallback((x, y) => {
    const buttonSize = 64;
    const padding = 16;
    const maxX = window.innerWidth - buttonSize - padding;
    const maxY = window.innerHeight - buttonSize - padding;

    return {
      x: Math.max(padding, Math.min(x, maxX)),
      y: Math.max(padding, Math.min(y, maxY)),
    };
  }, []);

  const handleDragStart = useCallback((clientX, clientY) => {
    setIsDragging(true);
    setHasMoved(false);

    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      setDragStart({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    }
  }, []);

  const handleDragMove = useCallback(
    (clientX, clientY) => {
      if (!isDragging) return;

      const newX = clientX - dragStart.x;
      const newY = clientY - dragStart.y;

      const constrained = constrainPosition(newX, newY);
      setPosition(constrained);
      setHasMoved(true);
    },
    [isDragging, dragStart, constrainPosition]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);

    if (position) {
      const screenWidth = window.innerWidth;
      const buttonSize = 64;
      const padding = 16;
      const snapToLeft = position.x < screenWidth / 2;
      const snappedX = snapToLeft ? padding : screenWidth - buttonSize - padding;

      setPosition((prev) => ({
        ...prev,
        x: snappedX,
      }));
    }
  }, [position]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      handleDragStart(e.clientX, e.clientY);
    },
    [handleDragStart]
  );

  const handleMouseMove = useCallback(
    (e) => {
      handleDragMove(e.clientX, e.clientY);
    },
    [handleDragMove]
  );

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleTouchStart = useCallback(
    (e) => {
      const touch = e.touches[0];
      handleDragStart(touch.clientX, touch.clientY);
    },
    [handleDragStart]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    },
    [handleDragMove]
  );

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    const handleResize = () => {
      if (position) {
        setPosition(constrainPosition(position.x, position.y));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position, constrainPosition]);

  const resetPosition = useCallback(() => {
    setPosition(null);
    localStorage.removeItem("chatWidgetPosition");
  }, []);

  return {
    position,
    isDragging,
    hasMoved,
    buttonRef,
    handleMouseDown,
    handleTouchStart,
    resetPosition,
  };
};

// ============================================
// MAIN CHAT WIDGET COMPONENT
// ============================================
const ChatWidget = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [history, setHistory] = useState([
    {
      role: "bot",
      content: `Hey ${
        user?.name?.split(" ")[0] || "there"
      }! ✨ I'm your MindSettler companion. How are you feeling today? I'm here to listen, support, or help you book a healing session.`,
    },
  ]);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const {
    position,
    isDragging,
    hasMoved,
    buttonRef,
    handleMouseDown,
    handleTouchStart,
    resetPosition,
  } = useDraggable();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, loading]);

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Handle close chat
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSend = async (text = message) => {
    if (!text.trim() || loading) return;

    const userText = text;
    setHistory((prev) => [
      ...prev,
      { role: "user", content: userText, userName: user?.name },
    ]);
    setMessage("");
    setLoading(true);

    try {
      const res = await API.post("/chat", { message: userText, chatId });
      const { intent, reply } = res.data;
      setHistory((prev) => [...prev, { role: "bot", content: reply }]);

      if (intent === "BOOK_SESSION") {
        setTimeout(() => {
          window.location.hash = "#Time Slots";
        }, 3000);
      }
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I'm having a moment... 🌸 Could you try that again? I want to hear what you have to say.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (text) => {
    handleSend(text);
  };

  const handleButtonClick = () => {
    if (!hasMoved) {
      setIsOpen(!isOpen);
      setShowNotification(false);
    }
  };

  const buttonPositionStyles = position
    ? {
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        right: "auto",
        bottom: "auto",
      }
    : {
        position: "fixed",
        right: "16px",
        bottom: "16px",
      };

  const getNotificationPosition = () => {
    if (position) {
      const isOnLeft = position.x < window.innerWidth / 2;
      return {
        position: "fixed",
        left: isOnLeft ? `${position.x + 70}px` : "auto",
        right: isOnLeft ? "auto" : `${window.innerWidth - position.x + 10}px`,
        top: `${position.y - 10}px`,
      };
    }
    return {
      position: "fixed",
      right: "24px",
      bottom: "96px",
    };
  };

  return (
    <div className="font-sans">
      {/* === CHAT WINDOW === */}
      {isOpen && (
        <>
          {/* Mobile overlay - tapping closes chat */}
          <div
            className="md:hidden fixed inset-0 bg-gradient-to-b from-[#3F2965]/30 to-[#Dd1764]/20 backdrop-blur-md z-40 animate-in fade-in duration-300"
            onClick={handleClose}
          />

          {/* Chat Container */}
          <div
            className={`
              fixed z-50 flex flex-col overflow-hidden
              animate-in duration-500 ease-out
              inset-0 rounded-none
              md:inset-auto md:bottom-24 md:right-6
              md:w-[380px] lg:w-[420px]
              md:h-[580px] lg:h-[620px]
              md:rounded-[2rem]
              bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl
              md:shadow-2xl md:shadow-purple-500/10
              md:border md:border-white/50
              slide-in-from-bottom-10 md:slide-in-from-bottom-5
            `}
          >
            {/* === HEADER === */}
            <div className="shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3F2965] via-[#5a3d8a] to-[#Dd1764]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
              <FloatingParticles />

              <div className="relative px-4 py-4 sm:px-5 sm:py-5 flex justify-between items-center safe-area-top">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-sm p-0.5 shadow-xl shadow-black/10 animate-pulse-slow">
                      <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                        <img
                          src={botAvatar}
                          alt="MindSettler AI"
                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg">
                      <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75" />
                    </div>
                  </div>

                  <div className="text-white">
                    <h3 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                      MindSettler
                      <Sparkles size={14} className="text-yellow-300 animate-pulse" />
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/70 font-medium">
                      Your empathetic AI companion
                    </p>
                  </div>
                </div>

                {/* === FIXED: CLOSE BUTTON === */}
                <button
                  onClick={handleClose}
                  className="
                    flex items-center gap-2 
                    px-4 py-2.5 sm:px-4 sm:py-2
                    bg-white/20 hover:bg-white/30 
                    active:bg-white/40 active:scale-95
                    backdrop-blur-sm rounded-xl sm:rounded-xl 
                    transition-all duration-200 
                    text-white 
                    touch-manipulation
                    min-h-[44px] min-w-[44px]
                    justify-center
                  "
                  aria-label="Close chat"
                >
                  {/* Mobile: Text + Icon */}
                  <span className="text-xs font-bold uppercase tracking-wide md:hidden">
                    Close
                  </span>
                  <X size={20} className="md:w-5 md:h-5" strokeWidth={2.5} />
                </button>
              </div>

              <svg
                className="absolute -bottom-1 left-0 w-full h-6 text-white/95"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* === CHAT HISTORY === */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 space-y-4 custom-scrollbar"
            >
              {history.map((m, i) => (
                <MessageBubble
                  key={i}
                  message={m}
                  isUser={m.role === "user"}
                  isLatest={i === history.length - 1 && m.role === "bot"}
                />
              ))}

              {loading && <TypingIndicator />}

              {!loading && history[history.length - 1]?.role === "bot" && (
                <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300">
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(reply.text)}
                      className="group flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gradient-to-r hover:from-[#3F2965] hover:to-[#Dd1764] border border-slate-200 hover:border-transparent rounded-full text-xs font-bold text-slate-600 hover:text-white shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <span>{reply.emoji}</span>
                      <span>{reply.text}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-center pt-4 pb-2">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-slate-50 to-slate-100 rounded-full border border-slate-200/50">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <ShieldCheck size={10} className="text-white" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    End-to-End Encrypted
                  </span>
                </div>
              </div>
            </div>

            {/* === INPUT AREA === */}
            <div className="shrink-0 p-3 sm:p-4 bg-white/80 backdrop-blur-sm border-t border-slate-100/50 safe-area-bottom">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2 sm:gap-3 items-end"
              >
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share what's on your mind..."
                    className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm font-medium outline-none ring-2 ring-transparent focus:ring-[#3F2965]/20 border border-slate-200/50 focus:border-[#3F2965]/30 transition-all placeholder:text-slate-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className={`
                    relative p-3.5 sm:p-4 rounded-2xl font-bold
                    transition-all duration-300 transform
                    disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed
                    min-h-[48px] min-w-[48px]
                    flex items-center justify-center
                    ${
                      message.trim()
                        ? "bg-gradient-to-r from-[#3F2965] to-[#Dd1764] text-white shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
                        : "bg-slate-100 text-slate-300"
                    }
                  `}
                >
                  <Send size={20} className="relative z-10" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-4 mt-2 sm:mt-3">
                <span className="text-[9px] text-slate-300 font-medium">
                  Press Enter to send
                </span>
                <span className="text-slate-200">•</span>
                <span className="text-[9px] text-slate-300 font-medium flex items-center gap-1">
                  <Heart size={8} className="text-pink-400" />
                  Be kind to yourself
                </span>
              </div>
            </div>

            {/* === MOBILE FLOATING CLOSE BUTTON (Bottom) === */}
            <button
              onClick={handleClose}
              className="
                md:hidden
                fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]
                flex items-center gap-2
                px-6 py-3
                bg-slate-900/90 hover:bg-slate-800
                active:bg-slate-700 active:scale-95
                backdrop-blur-xl
                rounded-full
                text-white
                shadow-2xl shadow-black/30
                transition-all duration-300
                animate-in slide-in-from-bottom-5 fade-in
                delay-500
                touch-manipulation
                border border-white/10
              "
              aria-label="Close chat"
            >
              <ArrowDown size={18} className="animate-bounce" />
              <span className="text-sm font-bold">Tap to Close</span>
            </button>
          </div>
        </>
      )}

      {/* === DRAGGABLE FLOATING BUTTON === */}
      <div
        ref={buttonRef}
        style={buttonPositionStyles}
        className={`z-[60] touch-none ${
          isOpen ? "scale-0 md:scale-100 pointer-events-none md:pointer-events-auto" : "scale-100"
        } transition-transform duration-300`}
      >
        {/* Drag handle indicator */}
        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 bg-slate-800/80 backdrop-blur-sm text-white text-[9px] font-bold rounded-full transition-all duration-300 ${
            isDragging ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <GripVertical size={10} />
          <span>Dragging</span>
        </div>

        {/* Pulsing rings */}
        {!isOpen && !isDragging && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3F2965] to-[#Dd1764] animate-ping opacity-20" />
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3F2965] to-[#Dd1764] animate-ping opacity-10"
              style={{ animationDelay: "0.5s" }}
            />
          </>
        )}

        {/* Main button */}
        <button
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleButtonClick}
          className={`
            relative w-14 h-14 sm:w-16 sm:h-16 rounded-full 
            flex items-center justify-center
            shadow-2xl transition-all duration-300
            border-4 border-white select-none
            ${isDragging ? "cursor-grabbing scale-110" : "cursor-grab"}
            ${
              isOpen
                ? "bg-slate-800 rotate-180"
                : "bg-gradient-to-br from-[#3F2965] via-[#5a3d8a] to-[#Dd1764] hover:shadow-purple-500/50"
            }
            ${!isDragging && !isOpen ? "hover:scale-110 active:scale-95" : ""}
          `}
          style={{
            touchAction: "none",
          }}
        >
          {isDragging && (
            <div className="absolute inset-0 rounded-full border-4 border-white/50 border-dashed animate-spin-slow" />
          )}

          {isOpen ? (
            <X size={26} className="text-white" />
          ) : (
            <img
              src={botAvatar}
              alt="MindSettler"
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isDragging ? "scale-90" : "scale-110 hover:scale-125"
              }`}
              draggable={false}
            />
          )}

          {!isOpen && (
            <div
              className={`absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-[3px] border-white shadow-lg flex items-center justify-center transition-transform ${
                isDragging ? "scale-0" : "scale-100"
              }`}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </button>

        {position && !isOpen && !isDragging && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetPosition();
            }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800/80 backdrop-blur-sm text-white text-[9px] font-bold rounded-full hover:bg-slate-700 transition-all animate-in fade-in slide-in-from-top-2"
          >
            Reset Position
          </button>
        )}
      </div>

      {/* === NOTIFICATION BUBBLE === */}
      {!isOpen && showNotification && !isDragging && (
        <div
          style={getNotificationPosition()}
          className="z-[59] animate-in fade-in slide-in-from-right-5 duration-700 delay-1000"
        >
          <div className="relative max-w-[220px] sm:max-w-[240px]">
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3F2965] to-[#Dd1764]" />

              <button
                onClick={() => setShowNotification(false)}
                className="absolute top-2 right-2 p-1 hover:bg-slate-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={12} className="text-slate-400" />
              </button>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3F2965] to-[#Dd1764] flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 leading-snug">
                    Need someone to talk to? 💜
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Hold & drag me anywhere!
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-slate-100 transform rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;