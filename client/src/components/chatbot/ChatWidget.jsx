import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2, User } from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "bot", content: "Hello! How can I help you today?" }
  ]);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setChatHistory([...chatHistory, { role: "user", content: message }]);
    setMessage("");

    // Simulate Bot Response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: "bot", 
        content: "Thanks for reaching out! Our team will get back to you soon." 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] font-sans">
      {/* --- CHAT WINDOW --- */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-5 bg-[#3F2965] text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest">MindSettler Support</h3>
                <p className="text-[10px] text-purple-200 font-bold">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div 
            ref={scrollRef}
            className="h-96 overflow-y-auto p-5 space-y-4 bg-slate-50 custom-scrollbar"
          >
            {chatHistory.map((chat, idx) => (
              <div key={idx} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium shadow-sm ${
                  chat.role === "user" 
                  ? "bg-[#Dd1764] text-white rounded-tr-none" 
                  : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                }`}>
                  {chat.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-[#3F2965] outline-none transition-all"
            />
            <button 
              type="submit"
              className="p-2 bg-[#3F2965] text-white rounded-xl hover:opacity-90 active:scale-95 transition-all"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* --- FLOATING BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? "bg-slate-800 rotate-90" : "bg-[#Dd1764]"
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatWidget;