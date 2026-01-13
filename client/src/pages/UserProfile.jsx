import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Wallet,
  LogOut,
  Plus,
  Loader2,
  Save,
  CreditCard,
  CalendarCheck,
  X,
  AlertCircle,
  ArrowDownLeft,
  Clock,
  Hash,
  MessageSquare,
  CheckCircle2,
  Copy,
  Video,
  CalendarPlus,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// --- 1. USER PROFILE VIEW ---
const UserProfileView = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.patch("/user/profile", formData);
      const updatedUser = response.data.user;
      setUser(updatedUser);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.errors ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Profile Header Card */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-50 border-2 border-[#3F2965]/10 flex items-center justify-center text-[#3F2965] text-2xl sm:text-3xl font-bold">
              {formData.name?.charAt(0) || "U"}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#3F2965]">
              {formData.name}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium break-all">
              {user.email}
            </p>
            <div className="mt-2 sm:mt-3 flex gap-2 justify-center sm:justify-start">
              <span className="px-3 py-1 bg-pink-50 text-[#Dd1764] text-[10px] font-bold uppercase rounded-full tracking-wider">
                Member
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full sm:w-auto px-5 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Profile Form Card */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm">
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1">
              Full Name
            </label>
            <input
              disabled={!isEditing}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 bg-slate-50 border-none rounded-xl font-medium text-sm sm:text-base focus:ring-1 focus:ring-[#3F2965] disabled:opacity-60 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1">
              Email Address
            </label>
            <input
              disabled
              value={user.email}
              className="w-full p-3 bg-slate-50 border-none rounded-xl font-medium text-sm sm:text-base opacity-60 cursor-not-allowed truncate"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1">
              Phone Number
            </label>
            <input
              disabled={!isEditing}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 bg-slate-50 border-none rounded-xl font-medium text-sm sm:text-base focus:ring-1 focus:ring-[#3F2965] disabled:opacity-60 transition-all"
            />
          </div>
          {isEditing && (
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full py-3 bg-[#3F2965] text-white rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg hover:opacity-90 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

// --- 2. WALLET VIEW ---
const WalletView = ({ user }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ amount: "", transactionId: "" });


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/transactions/user-wallet-transactions");
        setTransactions(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleTopup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/transactions/create-transaction", {
        amount: formData.amount,
        transactionId: formData.transactionId,
        type: "credit",
      });
      alert("Request Sent! Pending admin approval.");
      setShowPopup(false);
      setFormData({ amount: "", transactionId: "" });
      const res = await API.get("/transactions/user-wallet-transactions");
      setTransactions(res.data.data || []);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.errors ||
          "Transaction failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Balance Card */}
      <div className="bg-linear-to-br from-[#3F2965] to-[#5a3e8c] p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
        <CreditCard className="absolute -right-4 -bottom-4 w-32 h-32 sm:w-48 sm:h-48 text-white/10 rotate-12" />
        <div className="relative z-10">
          <p className="text-purple-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
            Total Balance
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
            ₹{user?.walletBalance || "0.00"}
          </h2>
          <button
            onClick={() => setShowPopup(true)}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#Dd1764] text-white rounded-xl sm:rounded-2xl font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center sm:justify-start gap-2"
          >
            <Plus size={18} /> Top-up Wallet
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8 border-b border-slate-50">
          <h3 className="font-bold text-[#3F2965] uppercase tracking-tight text-sm sm:text-base">
            Transaction History
          </h3>
        </div>
        <div className="divide-y divide-slate-50">
          {historyLoading ? (
            <div className="p-12 sm:p-20 flex justify-center">
              <Loader2 className="animate-spin text-[#3F2965]" size={30} />
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-12 sm:p-20 text-center text-slate-400 font-medium text-sm">
              No transactions yet.
            </div>
          ) : (
            transactions.map((txn) => {
              const isRejected = txn.status?.toLowerCase() === "rejected";
              const isPending = txn.status?.toLowerCase() === "pending";
              return (
                <div
                  key={txn._id}
                  className={`p-4 sm:p-6 flex items-start sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-all ${
                    isRejected
                      ? "bg-red-50/30"
                      : isPending
                      ? "bg-amber-50/20"
                      : ""
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-5 flex-1 min-w-0">
                    <div
                      className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl shrink-0 ${
                        isRejected
                          ? "bg-red-100 text-red-600"
                          : isPending
                          ? "bg-amber-100 text-amber-600"
                          : txn.type === "credit"
                          ? "bg-green-50 text-green-600"
                          : "bg-pink-50 text-[#Dd1764]"
                      }`}
                    >
                      {isRejected ? (
                        <X size={18} />
                      ) : isPending ? (
                        <Clock size={18} />
                      ) : txn.type === "credit" ? (
                        <ArrowDownLeft size={18} />
                      ) : (
                        <CalendarCheck size={18} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs sm:text-sm font-bold truncate ${
                          isRejected
                            ? "text-red-800"
                            : isPending
                            ? "text-amber-800"
                            : "text-[#3F2965]"
                        }`}
                      >
                        {txn.type === "credit"
                          ? "Wallet Deposit"
                          : "Session Payment"}
                        {isPending && (
                          <span className="ml-1 sm:ml-2 text-[8px] sm:text-[10px] font-black uppercase text-amber-600">
                            [Review]
                          </span>
                        )}
                      </p>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">
                          {new Date(txn.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          • {txn.status}
                        </p>
                        <p className="text-[8px] sm:text-[9px] font-bold text-[#3F2965] flex items-center gap-1 truncate">
                          <Hash size={8} className="text-[#Dd1764] shrink-0" />
                          <span className="truncate">
                            {txn.referenceId?.toUpperCase()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className={`text-xs sm:text-sm font-black ${
                        isRejected
                          ? "text-slate-400 line-through"
                          : isPending
                          ? "text-amber-500"
                          : txn.type === "credit"
                          ? "text-green-600"
                          : "text-[#3F2965]"
                      }`}
                    >
                      {isRejected || isPending
                        ? `₹${txn.amount}`
                        : `${txn.type === "credit" ? "+" : "-"}₹${txn.amount}`}
                    </p>
                    <p className="text-[8px] sm:text-[9px] font-mono text-slate-300 uppercase hidden sm:block">
                      {txn.transactionId?.slice(0, 12)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Top-up Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-[#3F2965]/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-black text-[#3F2965] uppercase tracking-tight text-sm sm:text-base">
                Add Money
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleTopup} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5">
              <div className="bg-amber-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex gap-2 sm:gap-3 items-start text-amber-800 text-[10px] sm:text-[11px] font-medium leading-relaxed">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>Transfer to UPI first, then enter the 12-digit UTR below.</span>
              </div>
              <input
                type="number"
                required
                placeholder="Amount (₹)"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full p-3 sm:p-4 bg-slate-50 border-none rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base focus:ring-2 focus:ring-[#3F2965]"
              />
              <input
                type="text"
                required
                placeholder="UTR / Transaction ID"
                value={formData.transactionId}
                onChange={(e) =>
                  setFormData({ ...formData, transactionId: e.target.value })
                }
                className="w-full p-3 sm:p-4 bg-slate-50 border-none rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base focus:ring-2 focus:ring-[#3F2965]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-4 bg-[#3F2965] text-white rounded-xl sm:rounded-2xl font-black shadow-xl flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>
            {/* Safe area padding for mobile */}
            <div className="h-6 sm:h-0" />
          </div>
        </div>
      )}
    </div>
  );
};

// --- 3. MY BOOKINGS VIEW ---
const MyBookingsView = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/appointment/my-sessions");
        setSessions(res.data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Meeting link copied to clipboard!");
  };

  const getGoogleCalendarLink = (session) => {
    if (!session?.availabilityRef?.date || !session?.timeSlot) return "#";
    const base = "https://www.google.com/calendar/render?action=TEMPLATE";
    const title = `&text=${encodeURIComponent(
      "MindSettler: " + (session.therapyType || "Therapy Session")
    )}`;
    const details = `&details=${encodeURIComponent(
      session.notes || "No notes provided."
    )}`;
    const location = session.meetLink
      ? `&location=${encodeURIComponent(session.meetLink)}`
      : "";
    try {
      const startDateTime = new Date(
        `${session.availabilityRef.date}T${session.timeSlot}:00`
      );
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
      const formatGCalDate = (date) =>
        date.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const dates = `&dates=${formatGCalDate(startDateTime)}/${formatGCalDate(
        endDateTime
      )}`;
      return `${base}${title}${dates}${details}${location}`;
    } catch (error) {
      console.error("Error generating Calendar Link:", error);
      return "#";
    }
  };

  if (loading)
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="animate-spin text-[#3F2965]" size={40} />
      </div>
    );

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-2">
        <h2 className="text-xl sm:text-2xl font-black text-[#3F2965]">My Journey</h2>
        <div className="px-3 sm:px-4 py-1.5 bg-[#3F2965]/5 rounded-full self-start sm:self-auto">
          <p className="text-[9px] sm:text-[10px] font-black text-[#3F2965] uppercase tracking-wider">
            Total: {sessions.length} Sessions
          </p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="py-12 sm:py-20 text-center bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 shadow-inner">
          <CalendarCheck className="mx-auto text-slate-200 mb-4" size={40} />
          <p className="text-slate-400 font-bold text-sm">No sessions scheduled yet.</p>
          <Link
            to="/booking"
            className="mt-4 inline-block text-xs font-black text-[#Dd1764] uppercase tracking-widest hover:scale-105 transition-all"
          >
            Start Your Healing →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden transition-all hover:shadow-xl flex flex-col"
            >
              {/* ID Tag */}
              <div className="absolute top-0 right-0 bg-slate-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-bl-2xl sm:rounded-bl-3xl border-l border-b border-slate-100">
                <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Hash size={8} className="text-[#Dd1764]" />
                  <span className="hidden sm:inline">{session._id}</span>
                  <span className="sm:hidden">{session._id?.slice(-6)}</span>
                </p>
              </div>

              {/* Status Header */}
              <div className="flex justify-between items-start mb-4 sm:mb-6 pr-16 sm:pr-20">
                <div
                  className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                    session.status === "approved"
                      ? "bg-green-50 text-green-600"
                      : "bg-pink-50 text-[#Dd1764]"
                  }`}
                >
                  <Clock size={18} />
                </div>
                <span
                  className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest ${
                    session.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : session.status === "completed"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {session.status}
                </span>
              </div>

              {/* Core Info */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-black text-[#3F2965] text-base sm:text-xl mb-2 leading-tight uppercase tracking-tight">
                  {session.therapyType || "Personalized Counseling"}
                </h4>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <p className="text-[10px] sm:text-xs text-slate-500 font-bold flex items-center gap-1 sm:gap-1.5">
                    <CalendarCheck size={12} className="text-[#Dd1764]" />
                    {new Date(session.availabilityRef?.date).toLocaleDateString(
                      "en-IN",
                      { day: "2-digit", month: "long" }
                    )}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-bold flex items-center gap-1 sm:gap-1.5">
                    <Clock size={12} className="text-[#Dd1764]" />
                    {session.timeSlot}
                  </p>
                </div>
              </div>

              {/* Notes Box */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-slate-50/50 rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <MessageSquare size={10} className="text-slate-400" />
                  <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Session Prep
                  </p>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed italic font-medium line-clamp-2">
                  {session.notes
                    ? `"${session.notes}"`
                    : "MindSettler is ready to support you."}
                </p>
              </div>

              {/* Google Meet & Calendar Section */}
              {session.status === "confirmed" && (
                <div className="mb-4 sm:mb-6 space-y-3">
                  {session.meetLink ? (
                    <div className="p-3 sm:p-4 bg-indigo-50/50 rounded-2xl sm:rounded-3xl border border-indigo-100">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                          <p className="text-[9px] sm:text-[10px] font-black text-indigo-700 uppercase tracking-widest">
                            Digital Room Ready
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(session.meetLink)}
                          className="p-1.5 hover:bg-white rounded-lg text-indigo-400"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={session.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-indigo-200 transition-transform active:scale-95"
                        >
                          Join <Video size={12} />
                        </a>
                        <a
                          href={getGoogleCalendarLink(session)}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white text-indigo-600 border border-indigo-200 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-indigo-50 transition-all"
                        >
                          <CalendarPlus size={16} />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 sm:p-4 bg-slate-50 rounded-2xl sm:rounded-3xl text-center">
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase italic">
                        Link will be shared 15m before start
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="pt-4 sm:pt-5 border-t border-slate-50 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      session.sessionType === "online"
                        ? "bg-indigo-400"
                        : "bg-[#Dd1764]"
                    }`}
                  />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                    {session.sessionType || "Online"}
                  </span>
                </div>
                {session.status === "pending" && (
                  <button className="text-[9px] sm:text-[10px] font-black uppercase text-[#Dd1764] hover:gap-2 transition-all flex items-center gap-1">
                    Reschedule <ChevronRight size={12} />
                  </button>
                )}
                {session.status === "completed" && (
                  <div className="flex items-center gap-1 text-green-600 text-[9px] sm:text-[10px] font-black uppercase">
                    <CheckCircle2 size={10} /> Sent
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- MOBILE SIDEBAR COMPONENT ---
const MobileSidebar = ({ isOpen, onClose, menuItems, activeTab, setActiveTab, onLogout }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <Link to="/" onClick={onClose}>
            <img src={Logo} className="w-28" alt="MindSettler" />
          </Link>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={`#${encodeURIComponent(item.name)}`}
                onClick={() => {
                  setActiveTab(item.name);
                  onClose();
                }}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.name
                    ? "bg-linear-to-r from-[#3F2965] to-[#Dd1764] text-white shadow-lg"
                    : "text-slate-500 hover:text-[#3F2965] hover:bg-slate-50"
                }`}
              >
                <Icon size={18} /> {item.name}
              </a>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

// --- BOTTOM NAVIGATION FOR MOBILE ---
const BottomNavigation = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-30 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <a
              key={item.name}
              href={`#${encodeURIComponent(item.name)}`}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-15 ${
                isActive
                  ? "text-[#Dd1764] bg-pink-50"
                  : "text-slate-400"
              }`}
            >
              <Icon size={20} />
              <span className="text-[9px] font-bold uppercase tracking-tight">
                {item.name.replace("My ", "")}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN USER DASHBOARD ---
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  if (!user || user.role !== "user") return (navigate("/auth"));

  const menuItems = [
    { name: "Profile", icon: User },
    { name: "My Wallet", icon: Wallet },
    { name: "My Bookings", icon: CalendarCheck },
  ];

  useEffect(() => {
    const syncTabFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      const matched = menuItems.find((item) => item.name === hash);
      setActiveTab(matched ? matched.name : "Profile");
    };
    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);
    return () => window.removeEventListener("hashchange", syncTabFromHash);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = useCallback(() => {
    setIsMobileMenuOpen(false);
    navigate("/logout");
  }, [navigate]);

  return (
    <div className="flex h-screen bg-[#FDFCFD] font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-100 flex-col p-6">
        <Link
          to="/"
          className="mb-10 px-4 transition-transform hover:scale-105"
        >
          <img src={Logo} className="w-36" alt="MindSettler" />
        </Link>
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={`#${encodeURIComponent(item.name)}`}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.name
                    ? "bg-pink-50 text-[#Dd1764]"
                    : "text-slate-400 hover:text-[#3F2965] hover:bg-slate-50"
                }`}
              >
                <Icon size={18} /> {item.name}
              </a>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 sm:h-16 lg:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 lg:px-10 shrink-0">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Menu size={22} className="text-[#3F2965]" />
          </button>

          {/* Title */}
          <h1 className="text-base sm:text-lg font-bold text-[#3F2965] tracking-tight flex-1 text-center lg:text-left">
            {activeTab}
          </h1>

          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden">
            <img src={Logo} className="h-8 w-auto" alt="MindSettler" />
          </Link>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 pb-24 lg:pb-10 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {activeTab === "Profile" && (
              <UserProfileView user={user} setUser={setUser} />
            )}
            {activeTab === "My Wallet" && <WalletView user={user} />}
            {activeTab === "My Bookings" && <MyBookingsView />}
          </div>
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <BottomNavigation
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default UserDashboard;