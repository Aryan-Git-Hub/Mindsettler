import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  Users,
  Wallet,
  LogOut,
  X,
  Check,
  Plus,
  Loader2, // New icon for loading
} from "lucide-react";
import API from "../api/axios";

// --- 1. WALLET REQUESTS (With Loading States) ---
const WalletRequestsView = () => {
  const [requests, setRequests] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null); // Tracks which button is "thinking"

  useEffect(() => {
    async function getData() {
      try {
        const response = await API.get("/transactions/");
        setRequests(response.data.data);
      } catch (err) { console.error(err); }
      finally { setIsInitialLoading(false); }
    }
    getData();
  }, []);

  const handleAction = async (id, status) => {
    setProcessingId(id);
    try {
      await API.patch(`/transactions/${status}-topup/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) { alert("Failed to process request"); }
    finally { setProcessingId(null); }
  };

  if (isInitialLoading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 className="animate-spin text-[#3F2965]" size={40} />
      <p className="text-slate-400 font-bold animate-pulse">Fetching transactions...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold text-[#3F2965]">Pending Wallet Top-ups</h3>
        <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full font-bold text-sm">
          {requests.length} Requests
        </span>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">#</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">User</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">UTR / Reference</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id} className="border-b last:border-0 hover:bg-slate-50/50 transition-all">
                <td className="p-4 text-sm font-bold text-slate-400">{index + 1}</td>
                <td className="p-4 text-sm font-bold text-slate-800">{req.user?.name}</td>
                <td className="p-4 text-sm font-black text-[#Dd1764]">₹{req.amount}</td>
                <td className="p-4 text-sm font-mono text-[#3F2965]">{req.transactionId}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button 
                    disabled={processingId === req._id}
                    onClick={() => handleAction(req._id, "reject")} 
                    className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-30"
                  >
                    {processingId === req._id ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
                  </button>
                  <button 
                    disabled={processingId === req._id}
                    onClick={() => handleAction(req._id, "approve")} 
                    className="p-2 text-white bg-[#3F2965] rounded-lg hover:opacity-90 disabled:opacity-30"
                  >
                    {processingId === req._id ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- 2. TIME SLOTS (With Publishing Animation) ---
const TimeSlotsView = () => {
  const [date, setDate] = useState("");
  const [newSlot, setNewSlot] = useState("");
  const [slots, setSlots] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const addSlot = () => {
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot].sort());
      setNewSlot("");
    }
  };

  const publishAvailability = async () => {
    setIsPublishing(true);
    try {
      await API.post("/admin/set-availability", { date, slots });
      alert("Published!");
      setSlots([]);
      setDate("");
    } catch (err) { alert(err.response?.data?.message); }
    finally { setIsPublishing(false); }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-3 bg-slate-50 border rounded-xl font-bold" />
        <div className="flex gap-2">
          <input type="time" value={newSlot} onChange={(e) => setNewSlot(e.target.value)} className="flex-1 p-3 bg-slate-50 border rounded-xl" />
          <button onClick={addSlot} className="p-3 bg-[#3F2965] text-white rounded-xl active:scale-95 transition-transform"><Plus size={20} /></button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-slate-50 rounded-xl border-2 border-dashed">
        {slots.map((s) => (
          <div key={s} className="bg-purple-50 text-[#3F2965] px-4 py-2 rounded-xl font-bold flex items-center gap-2 animate-in zoom-in duration-200">
            {s} <X size={14} className="cursor-pointer" onClick={() => setSlots(slots.filter(t => t !== s))} />
          </div>
        ))}
      </div>
      <button 
        disabled={isPublishing || slots.length === 0}
        onClick={publishAvailability} 
        className="w-full py-4 bg-[#Dd1764] text-white font-black rounded-xl disabled:opacity-50 flex justify-center items-center gap-2 transition-all active:scale-[0.98]"
      >
        {isPublishing ? <Loader2 className="animate-spin" /> : "Publish Schedule"}
      </button>
    </div>
  );
};

// --- 3. APPOINTMENTS (With Row Removal Animation) ---
const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await API.get("/admin/pending-appointments");
        setAppointments(res.data.data);
      } catch (err) { console.error(err); }
      finally { setIsInitialLoading(false); }
    }
    fetch();
  }, []);

  const updateStatus = async (id, status) => {
    setActionId(id);
    try {
      await API.patch(`/appointment/status/${id}`, { status });
      setAppointments(appointments.filter(app => app._id !== id));
    } catch (err) { console.error(err); }
    finally { setActionId(null); }
  };

  if (isInitialLoading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 className="animate-spin text-[#Dd1764]" size={40} />
      <p className="text-slate-400 font-bold">Loading sessions...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold text-[#3F2965]">Active Pending Sessions</h3>
        <span className="bg-pink-100 text-[#Dd1764] px-4 py-1 rounded-full font-bold text-sm">
          {appointments.length} Sessions
        </span>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">#</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Client</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Date/Time</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, index) => (
              <tr key={app._id} className={`border-b last:border-0 transition-all duration-500 ${actionId === app._id ? 'opacity-30' : ''}`}>
                <td className="p-4 text-sm font-bold text-slate-400">{index + 1}</td>
                <td className="p-4 text-sm font-bold text-slate-800">{app.user?.name}</td>
                <td className="p-4 text-xs font-bold text-[#3F2965]">{app.date} <br/> {app.timeSlot}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button 
                    disabled={actionId === app._id}
                    onClick={() => updateStatus(app._id, "rejected")} 
                    className="px-3 py-1 text-[10px] font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:cursor-not-allowed"
                  >
                    {actionId === app._id ? "..." : "Reject"}
                  </button>
                  <button 
                    disabled={actionId === app._id}
                    onClick={() => updateStatus(app._id, "completed")} 
                    className="px-3 py-1 text-[10px] font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:cursor-not-allowed"
                  >
                    {actionId === app._id ? "..." : "Done"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="w-64 bg-white border-r flex flex-col p-6">
        <img src={Logo} className="w-40 mb-10" alt="Mindsettler" />
        <nav className="flex-1 space-y-2">
          {["Dashboard", "Wallet Requests", "Appointments", "Time Slots"].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${activeTab === tab ? "bg-[#3F2965] text-white shadow-lg translate-x-1" : "text-slate-500 hover:bg-slate-50"}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b flex items-center px-10">
          <h1 className="text-xl font-black text-[#3F2965] uppercase tracking-tight">{activeTab}</h1>
        </header>
        <div className="p-10 max-w-5xl mx-auto">
          {activeTab === "Wallet Requests" && <WalletRequestsView />}
          {activeTab === "Appointments" && <AppointmentsView />}
          {activeTab === "Time Slots" && <TimeSlotsView />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;