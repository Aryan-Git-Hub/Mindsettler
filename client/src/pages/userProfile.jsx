import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import {
  User,
  Wallet,
  LogOut,
  Bell,
  Plus,
  Loader2,
  Save,
  CreditCard,
  CalendarCheck,
  Camera,
  X,
  AlertCircle,
  ArrowDownLeft,
  Clock,
  Hash,
  MessageSquare,
} from "lucide-react";
import Logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// --- 1. USER PROFILE VIEW ---
const UserProfileView = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.patch("/users/profile", formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-[#3F2965]/10 flex items-center justify-center text-[#3F2965] text-3xl font-bold">
            {formData.name?.charAt(0) || "U"}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-slate-100 text-[#Dd1764]">
            <Camera size={14} />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-[#3F2965]">{formData.name}</h2>
          <p className="text-slate-400 text-sm font-medium">{formData.email}</p>
          <div className="mt-3 flex gap-2 justify-center md:justify-start">
            <span className="px-3 py-1 bg-pink-50 text-[#Dd1764] text-[10px] font-bold uppercase rounded-full tracking-wider">
              Member
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-5 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
              className="w-full p-3 bg-slate-50 border-none rounded-xl font-medium focus:ring-1 focus:ring-[#3F2965] disabled:opacity-60 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-1">
              Email Address
            </label>
            <input
              disabled
              value={formData.email}
              className="w-full p-3 bg-slate-50 border-none rounded-xl font-medium opacity-60 cursor-not-allowed"
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
              className="w-full p-3 bg-slate-50 border-none rounded-xl font-medium focus:ring-1 focus:ring-[#3F2965] disabled:opacity-60 transition-all"
            />
          </div>
          {isEditing && (
            <button className="md:col-span-2 w-full py-3 bg-[#3F2965] text-white rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg hover:opacity-90 transition-all">
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}{" "}
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
      alert(err.response?.data?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-linear-to-br from-[#3F2965] to-[#5a3e8c] p-10 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
        <CreditCard className="absolute -right-4 -bottom-4 w-48 h-48 text-white/10 rotate-12" />
        <div className="relative z-10">
          <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-1">
            Total Balance
          </p>
          <h2 className="text-5xl font-bold mb-8">
            ₹{user?.walletBalance || "0.00"}
          </h2>
          <button
            onClick={() => setShowPopup(true)}
            className="px-8 py-3 bg-[#Dd1764] text-white rounded-2xl font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Top-up Wallet
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="font-bold text-[#3F2965] uppercase tracking-tight">
            Transaction History
          </h3>
        </div>
        <div className="divide-y divide-slate-50">
          {historyLoading ? (
            <div className="p-20 flex justify-center">
              <Loader2 className="animate-spin text-[#3F2965]" size={30} />
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-20 text-center text-slate-400 font-medium text-sm">
              No transactions yet.
            </div>
          ) : (
            transactions.map((txn) => {
              const isRejected = txn.status?.toLowerCase() === "rejected";
              const isPending = txn.status?.toLowerCase() === "pending";
              return (
                <div
                  key={txn._id}
                  className={`p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all ${
                    isRejected
                      ? "bg-red-50/30"
                      : isPending
                      ? "bg-amber-50/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`p-3 rounded-2xl ${
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
                        <X size={20} />
                      ) : isPending ? (
                        <Clock size={20} />
                      ) : txn.type === "credit" ? (
                        <ArrowDownLeft size={20} />
                      ) : (
                        <CalendarCheck size={20} />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold ${
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
                          <span className="ml-2 text-[10px] font-black uppercase text-amber-600">
                            [Under Review]
                          </span>
                        )}
                      </p>
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          {new Date(txn.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          • {txn.status}
                        </p>
                        {txn.type === "debit" && txn.referenceId && (
                          <p className="text-[9px] font-bold text-[#3F2965] flex items-center gap-1">
                            <Hash size={10} className="text-[#Dd1764]" />{" "}
                            Session ID: {txn.referenceId.toUpperCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-black ${
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
                    <p className="text-[9px] font-mono text-slate-300 uppercase">
                      {txn.transactionId?.slice(0, 12)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-[#3F2965]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8 border-b flex justify-between items-center">
              <h3 className="font-black text-[#3F2965] uppercase tracking-tight">
                Add Money
              </h3>
              <button onClick={() => setShowPopup(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleTopup} className="p-8 space-y-5">
              <div className="bg-amber-50 p-4 rounded-2xl flex gap-3 items-start text-amber-800 text-[11px] font-medium leading-relaxed">
                <AlertCircle size={20} /> Transfer to UPI first, then enter the
                12-digit UTR below.
              </div>
              <input
                type="number"
                required
                placeholder="Amount (₹)"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965]"
              />
              <input
                type="text"
                required
                placeholder="UTR / Transaction ID"
                value={formData.transactionId}
                onChange={(e) =>
                  setFormData({ ...formData, transactionId: e.target.value })
                }
                className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#3F2965] text-white rounded-2xl font-black shadow-xl"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>
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
        // We reverse the array so the most recent bookings appear first
        setSessions((res.data.data || []));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading)
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="animate-spin text-[#3F2965]" size={40} />
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {sessions.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
          <CalendarCheck className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="text-slate-400 font-medium">No sessions found.</p>
          <Link
            to="/booking"
            className="mt-4 inline-block text-sm font-bold text-[#Dd1764] hover:underline transition-all"
          >
            Book a session
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden transition-all hover:shadow-md flex flex-col justify-between"
            >
              {/* ID Tag */}
              <div className="absolute top-0 right-0 bg-slate-50 px-4 py-1.5 rounded-bl-2xl border-l border-b border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Hash size={10} className="text-[#Dd1764]" /> ID:{" "}
                  {session._id.slice(-6).toUpperCase()}
                </p>
              </div>

              {/* Status & Icon */}
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-pink-50 text-[#Dd1764] rounded-2xl">
                  <Clock size={20} />
                </div>
                <span
                  className={`mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    session.status === "completed"
                      ? "bg-green-50 text-green-600"
                      : session.status === "rejected"
                      ? "bg-red-50 text-red-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {session.status}
                </span>
              </div>

              {/* Session Info */}
              <div className="mb-4">
                <h4 className="font-bold text-[#3F2965] text-lg mb-1 leading-tight">
                  {session.therapyType || "Therapy Session"}
                </h4>
                <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                  <CalendarCheck size={14} className="text-slate-400" />
                  {new Date(session.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  • {session.timeSlot}
                </p>
              </div>

              {/* --- NEW: SESSION NOTES SECTION --- */}
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={12} className="text-[#3F2965]" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Notes</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  {session.notes ? `"${session.notes}"` : "No specific notes provided for this session."}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between font-bold text-[#3F2965] text-xs uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${session.sessionType === 'online' ? 'bg-blue-400' : 'bg-orange-400'}`}></span>
                  {session.sessionType || "Online"}
                </div>
                {session.status === "pending" && (
                  <button className="text-[#Dd1764] hover:translate-x-1 transition-all flex items-center gap-1">
                    Reschedule <ChevronDown size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- MAIN USER DASHBOARD ---
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (window.location.hash === "#bookings") {
      setActiveTab("My Bookings");
    }
  }, []);
  const menuItems = [
    { name: "Profile", icon: User },
    { name: "My Wallet", icon: Wallet },
    { name: "My Bookings", icon: CalendarCheck },
  ];

  return (
    <div className="flex h-screen bg-[#FDFCFD] font-sans">
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-6">
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
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.name
                    ? "bg-pink-50 text-[#Dd1764]"
                    : "text-slate-400 hover:text-[#3F2965] hover:bg-slate-50"
                }`}
              >
                <Icon size={18} /> {item.name}
              </button>
            );
          })}
        </nav>
        <button
          onClick={() => navigate("/logout")}
          className="mt-8 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10">
          <h1 className="text-lg font-bold text-[#3F2965] tracking-tight">
            {activeTab}
          </h1>
          <div className="flex items-center gap-5">
            <div className="relative text-slate-400 hover:text-[#3F2965] cursor-pointer">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#Dd1764] rounded-full border-2 border-white" />
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {activeTab === "Profile" && <UserProfileView user={user} />}
            {activeTab === "My Wallet" && <WalletView user={user} />}
            {activeTab === "My Bookings" && <MyBookingsView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
