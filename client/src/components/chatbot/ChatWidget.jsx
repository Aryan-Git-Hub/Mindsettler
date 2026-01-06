import { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, X, Send, Loader2, 
  Sparkles, ShieldCheck 
} from "lucide-react";
import API from "../../api/axios.js"; // Ensure this ;has withCredentials: true

const ChatWidget = ({ user }) => {
  // const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([
    { 
      role: "bot", 
      content: `Hi ${user.name.split(' ')[0]}! I'm your MindSettler companion. How are you feeling today? I'm here to listen or help you book a session if you're ready.` 
    }
  ]);
  
  const scrollRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userText = message;
    setHistory((prev) => [...prev, { role: "user", content: userText }]);
    setMessage("");
    setLoading(true);

    try {
      // API call to your protected backend route
      const res = await API.post("/chat", { message: userText });
      
      const { intent, reply } = res.data;

      setHistory((prev) => [...prev, { role: "bot", content: reply }]);

      // --- ENCOURAGEMENT & AUTO-REDIRECT LOGIC ---
      // If the AI detects the user is ready to book, we help them move to the next step
      if (intent === "BOOK_SESSION") {
        setTimeout(() => {
          // This matches the hash-based navigation in your AdminDashboard
          window.location.hash = "#Time Slots";
          // Optional: close the widget after a few seconds so they see the dashboard
          // setIsOpen(false); 
        }, 3000);
      }

    } catch (err) {
      setHistory((prev) => [
        ...prev, 
        { role: "bot", content: "I'm having a little trouble connecting to my thoughts. Could you try that again?" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-999 font-sans">
      {/* --- CHAT WINDOW --- */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-100 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-6 bg-[#3F2965] text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-2xl">
                <Sparkles size={20} className="text-pink-300" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest leading-none">MindSettler AI</h3>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-[10px] text-purple-200 font-bold uppercase">Empathetic Guide</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat History */}
          <div 
            ref={scrollRef} 
            className="h-100 overflow-y-auto p-6 space-y-4 bg-slate-50/50 custom-scrollbar"
          >
            {history.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] font-bold leading-relaxed shadow-sm animate-in zoom-in-95 duration-200 ${
                  m.role === "user" 
                    ? "bg-[#Dd1764] text-white rounded-tr-none shadow-[#Dd1764]/20" 
                    : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm">
                  <Loader2 className="animate-spin text-slate-300" size={18} />
                </div>
              </div>
            )}

            {/* Privacy Badge */}
            <div className="flex justify-center pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                <ShieldCheck size={10} />
                Encrypted & Confidential
              </div>
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center">
            <input 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your feelings..."
              className="flex-1 bg-slate-50 rounded-2xl px-5 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#3F2965] transition-all"
            />
            <button 
              type="submit" 
              disabled={loading || !message.trim()}
              className="p-3 bg-[#3F2965] text-white rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-30"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* --- FLOATING TOGGLE BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border-4 border-white ${
          isOpen ? "bg-slate-800 rotate-90" : "bg-linear-to-tr from-[#3F2965] to-[#Dd1764]"
        }`}
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
        
        {/* Unread notification dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;