import { useState, useEffect } from "react";
import Logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  Users,
  Wallet,
  LogOut,
  CheckCircle,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";
import API from "../api/axios";

// --- 1. WALLET REQUESTS (YOUR COMPLETED SECTION) ---
const WalletRequestsView = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await API.get("/transactions/");
      const data = response.data.data;
      setRequests(data);
    }
    getData();
  }, []);

  const handleAction = async (id, status) => {
    await API.patch(`/transactions/${status}-topup/${id}`);
    setRequests(requests.filter((req) => req._id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 flex gap-3 items-center">
        <AlertCircle className="text-amber-600" />
        <p className="text-sm text-amber-800 font-medium">
          Verify UTR numbers in your bank portal before approving.
        </p>
      </div>
      {requests.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed text-slate-400">
          No pending requests
        </div>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black text-white bg-[#Dd1764] px-2 py-0.5 rounded">
                  TOP-UP
                </span>
                <h4 className="font-bold text-slate-800">₹{req.amount}</h4>
              </div>
              <p className="text-sm font-medium text-slate-600">
                {req.user?.name} •{" "}
                <span className="font-mono text-[#3F2965] font-bold">
                  {req.transactionId}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(req._id, "reject")}
                className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction(req._id, "approve")}
                className="px-4 py-2 text-sm font-bold text-white bg-[#3F2965] rounded-xl hover:bg-[#3F2965]/90"
              >
                Approve & Credit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// --- 2. TIME SLOTS (Manage Availability) ---
const TimeSlotsView = () => {
  const [date, setDate] = useState("");
  const [newSlot, setNewSlot] = useState("");
  const [slots, setSlots] = useState([]);

  const addSlot = () => {
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot].sort());
      setNewSlot("");
    }
  };

  const publishAvailability = async () => {
    try {
      if (!date || slots.length === 0) return alert("Select date and add slots");
      // Connects to: POST /api/admin/availability
      await API.post("/admin/availability", { date, slots });
      alert("Availability Published Successfully!");
      setSlots([]);
      setDate("");
    } catch (err) {
      alert(err.response?.data?.message || "Error publishing slots");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-2">Select Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl outline-none font-bold" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-2">Add Time Slot</label>
          <div className="flex gap-2">
            <input type="time" value={newSlot} onChange={(e) => setNewSlot(e.target.value)} className="flex-1 p-3 bg-slate-50 border rounded-xl outline-none" />
            <button onClick={addSlot} className="p-3 bg-[#3F2965] text-white rounded-xl"><Plus size={20} /></button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {slots.map((s) => (
          <div key={s} className="bg-purple-50 text-[#3F2965] px-4 py-2 rounded-xl font-bold border border-purple-100 flex items-center gap-2">
            {s} <X size={14} className="cursor-pointer" onClick={() => setSlots(slots.filter(t => t !== s))} />
          </div>
        ))}
      </div>
      <button onClick={publishAvailability} className="w-full py-4 bg-[#Dd1764] text-white font-black rounded-2xl hover:opacity-90 shadow-lg shadow-pink-100">Publish Schedule</button>
    </div>
  );
};

// --- 3. APPOINTMENTS (Pending Sessions Only) ---
const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchPendingAppointments();
  }, []);

  const fetchPendingAppointments = async () => {
    try {
      // Connects to: GET /api/admin/appointments
      const res = await API.get("/admin/pending-appointments");
      const pending = res.data.data
      setAppointments(pending);
    } catch (err) {
      console.error("Error fetching appointments", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      // Connects to: PATCH /api/appointments/status/:id
      await API.patch(`/appointment/status/${id}`, { status });
      setAppointments(prev => prev.filter(app => app._id !== id));
      alert(`Appointment marked as ${status}`);
    } catch (err) {
      alert("Failed to update appointment");
    }
  };

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed text-slate-400">No pending sessions</div>
      ) : (
        appointments.map((app) => (
          <div key={app._id} className="bg-white p-5 rounded-2xl border flex flex-col md:flex-row justify-between md:items-center gap-4 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-bold text-[#3F2965]">
                {app.user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{app.user?.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{app.date} • {app.timeSlot} • {app.therapyType}</p>
                {app.notes && <p className="text-[11px] text-slate-400 italic">"{app.notes}"</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => updateStatus(app._id, "rejected")} className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100">Reject</button>
              <button onClick={() => updateStatus(app._id, "completed")} className="px-4 py-2 text-xs font-bold text-white bg-green-600 rounded-xl hover:bg-green-700">Complete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// --- 4. OVERVIEW (Dashboard Stats) ---
const OverviewView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { label: "Total Users", val: "1,284", icon: Users, color: "bg-[#3F2965]" },
      { label: "Pending Top-ups", val: "5", icon: Wallet, color: "bg-amber-500" },
      { label: "Booked Today", val: "14", icon: CalendarCheck, color: "bg-[#Dd1764]" },
      { label: "Revenue", val: "₹42k", icon: CheckCircle, color: "bg-green-500" },
    ].map((stat, i) => (
      <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
        <div><p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p><h3 className="text-2xl font-black text-slate-800">{stat.val}</h3></div>
        <div className={`p-3 rounded-xl ${stat.color} text-white`}><stat.icon size={20} /></div>
      </div>
    ))}
  </div>
);

// --- MAIN ADMIN DASHBOARD ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Wallet Requests", icon: Wallet },
    { name: "Appointments", icon: CalendarCheck },
    { name: "Time Slots", icon: Clock },
    { name: "Customers", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-8"><img src={Logo} alt="Logo" className="w-40" /></div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <button key={item.name} onClick={() => setActiveTab(item.name)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === item.name ? "bg-[#3F2965] text-white shadow-lg shadow-purple-200" : "text-slate-500 hover:bg-slate-50"}`}>
              <item.icon size={18} /> {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100"><button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#Dd1764] hover:bg-red-50 rounded-2xl transition-all"><LogOut size={18} /> Logout</button></div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b flex items-center justify-between px-10">
          <h1 className="text-xl font-black text-[#3F2965] uppercase tracking-tight">{activeTab}</h1>
          <div className="w-10 h-10 rounded-full bg-[#3F2965] border-2 border-white shadow-sm" />
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            {activeTab === "Dashboard" && <OverviewView />}
            {activeTab === "Wallet Requests" && <WalletRequestsView />}
            {activeTab === "Appointments" && <AppointmentsView />}
            {activeTab === "Time Slots" && <TimeSlotsView />}
            {!["Dashboard", "Wallet Requests", "Appointments", "Time Slots"].includes(activeTab) && (
              <div className="text-center py-20 text-slate-400 font-bold border-2 border-dashed rounded-3xl bg-white">Module Under Construction</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;