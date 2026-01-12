import { useState, useEffect } from "react";
import Logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import { useNavigate, Link } from "react-router";
import {
  CalendarCheck,
  Clock,
  Wallet,
  LogOut,
  X,
  Check,
  Plus,
  Loader2,
  UserCircle,
  Mail,
  Edit3,
  Camera,
  User,
  Phone,
  Save,
  TrendingUp,
  Info,
  BrainCircuit,
  Video,
  MessageSquare,
  Calendar,
  Trash2,
  CalendarIcon,
  AlertCircle
} from "lucide-react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// --- 1. ADMIN PROFILE VIEW ---
const AdminProfileView = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.patch("/admin/profile", formData);
      setUser(response.data.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data?.errors || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#3F2965] tracking-tight">Account Settings</h2>
          <p className="text-slate-500 font-medium text-sm">Manage your administrative identity</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
            isEditing ? "bg-slate-100 text-slate-600" : "bg-[#3F2965] text-white shadow-lg"
          }`}
        >
          {isEditing ? <X size={18} /> : <Edit3 size={18} />}
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm flex flex-col items-center text-center h-fit">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-linear-to-tr from-[#3F2965] to-[#Dd1764] flex items-center justify-center text-white text-5xl font-black shadow-2xl ring-4 ring-white">
              {formData.name?.charAt(0)}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
          </div>
          <h3 className="mt-6 text-xl font-black text-[#3F2965]">{formData.name}</h3>
          <p className="text-xs font-black text-[#Dd1764] uppercase tracking-widest mt-1">{user?.role}</p>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input name="name" disabled={!isEditing} value={formData.name} onChange={handleChange} className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965] disabled:opacity-60 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input name="email" disabled={!isEditing} value={formData.email} onChange={handleChange} className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965] disabled:opacity-60 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input name="phone" disabled={!isEditing} value={formData.phone} onChange={handleChange} className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965] disabled:opacity-60 transition-all" />
                  </div>
                </div>
              </div>
              {isEditing && (
                <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-4 bg-[#Dd1764] text-white rounded-2xl font-black shadow-xl hover:opacity-90 disabled:opacity-50 transition-all">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. WALLET REQUESTS VIEW ---
const WalletRequestsView = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [procId, setProcId] = useState(null);

  useEffect(() => {
    API.get("/transactions/").then(res => {
      setRequests(res.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleAction = async (id, status) => {
    setProcId(id);
    try {
      await API.patch(`/transactions/${status}-topup/${id}`);
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (e) { alert("Error processing request"); }
    finally { setProcId(null); }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#3F2965]" size={40} /></div>;

  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden animate-in fade-in duration-500">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">#</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">User</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">Transaction ID (UTR)</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">Amount</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr key={req._id} className="border-b last:border-0 hover:bg-slate-50/50 transition-all">
              <td className="p-5 text-sm font-bold text-slate-400">{idx + 1}</td>
              <td className="p-5 font-bold text-slate-800">
                <div className="flex flex-col">
                  <span>{req.user?.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{req.user?.email}</span>
                </div>
              </td>
              {/* TRANSACTION ID COLUMN */}
              <td className="p-5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-slate-100 text-[#3F2965] rounded-lg font-mono text-xs font-bold border border-slate-200">
                    {req.transactionId.toUpperCase() || "N/A"}
                  </span>
                </div>
              </td>
              <td className="p-5 font-black text-[#Dd1764]">₹{req.amount}</td>
              <td className="p-5 flex justify-center gap-2">
                <button 
                  disabled={procId === req._id} 
                  onClick={() => handleAction(req._id, "reject")} 
                  className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  title="Reject Request"
                >
                  {procId === req._id ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
                </button>
                <button 
                  disabled={procId === req._id} 
                  onClick={() => handleAction(req._id, "approve")} 
                  className="p-2 text-white bg-[#3F2965] rounded-lg hover:opacity-90 transition-opacity shadow-md"
                  title="Approve Request"
                >
                  {procId === req._id ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {requests.length === 0 && (
        <div className="p-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
          No pending wallet requests
        </div>
      )}
    </div>
  );
};

// --- 3. APPOINTMENTS VIEW ---
const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  
  // UI Feedback & Modal States
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalError, setModalError] = useState("");
  const [tableError, setTableError] = useState("");

  useEffect(() => {
    API.get("/admin/pending-appointments")
      .then((res) => {
        setAppointments(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setTableError("Failed to load appointments. Please refresh.");
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    setActionId(id);
    setModalError(""); 
    setTableError("");

    try {
      await API.patch(`/appointment/status/${id}`, { status });
      // Remove from list after successful action
      setAppointments((prev) => prev.filter((app) => app._id !== id));
      if (selectedApp?._id === id) setSelectedApp(null);
    } catch (e) {
      const errorText = e.response?.data?.message || "Action failed. Please try again.";
      if (selectedApp) {
        setModalError(errorText);
      } else {
        setTableError(errorText);
      }
    } finally {
      setActionId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-[#Dd1764]" size={40} />
      </div>
    );

  return (
    <div className="relative">
      {/* --- TABLE ERROR BANNER --- */}
      {tableError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} />
          <p className="text-sm font-bold">{tableError}</p>
          <button onClick={() => setTableError("")} className="ml-auto hover:bg-red-100 p-1 rounded-full transition-colors">
            <X size={16}/>
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden animate-in fade-in duration-500">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-5 text-xs font-black text-slate-500 uppercase">#</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase">Client Details</th>
              <th className="p-5 text-xs font-black text-slate-500 uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-10 text-center text-slate-400 font-medium uppercase text-xs tracking-widest">
                  No pending appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((app, idx) => (
                <tr key={app._id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 text-sm font-bold text-slate-400">{idx + 1}</td>
                  
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-800 text-sm">{app.user?.name}</p>
                        <button 
                          onClick={() => { setSelectedApp(app); setModalError(""); }}
                          className="p-1 rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
                          title="View Details"
                        >
                          <Info size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Mail size={12} />
                        <span className="text-[11px] font-medium">{app.user?.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#Dd1764]">
                        <Phone size={12} />
                        <span className="text-[11px] font-bold">{app.user?.phone || "N/A"}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button
                        disabled={actionId === app._id}
                        onClick={() => updateStatus(app._id, "rejected")}
                        className="px-4 py-2 text-[10px] font-black uppercase text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all disabled:opacity-50"
                      >
                        {actionId === app._id ? <Loader2 size={14} className="animate-spin" /> : "Reject"}
                      </button>
                      <button
                        disabled={actionId === app._id}
                        onClick={() => updateStatus(app._id, "completed")}
                        className="px-4 py-2 text-[10px] font-black uppercase text-white bg-green-500 rounded-xl shadow-md hover:bg-green-600 transition-all disabled:opacity-50"
                      >
                        {actionId === app._id ? <Loader2 size={14} className="animate-spin" /> : "Complete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- APPOINTMENT DETAILS MODAL --- */}
      {selectedApp && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
              <div>
                <h3 className="font-black text-[#3F2965] uppercase text-xs tracking-widest">Appointment Summary</h3>
                <p className="text-xs font-bold text-slate-400 mt-0.5">ID: {selectedApp._id.toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* MODAL ERROR BANNER */}
              {modalError && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase animate-pulse">
                  <AlertCircle size={14} /> {modalError}
                </div>
              )}

              {/* Therapy Details */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 text-[#3F2965] rounded-2xl"><BrainCircuit size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Therapy Mode</p>
                  <p className="text-sm font-bold text-slate-700">{selectedApp.therapyType}</p>
                </div>
              </div>

              {/* Appointment Date */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><CalendarIcon size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Date</p>
                  <p className="text-sm font-bold text-slate-700">
                    {new Date(selectedApp.availabilityRef).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Time & Session Format */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-50 text-[#Dd1764] rounded-lg"><Clock size={16} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase">Time</p>
                    <p className="text-xs font-bold text-slate-700">{selectedApp.timeSlot}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                    {selectedApp.sessionType === "online" ? <Video size={16} /> : <MapPin size={16} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase">Format</p>
                    <p className="text-xs font-bold text-slate-700 capitalize">{selectedApp.sessionType}</p>
                  </div>
                </div>
              </div>

              {/* Client Notes */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-[#3F2965]">
                  <MessageSquare size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Client Notes</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{selectedApp.notes || "No additional notes provided by the client."}"
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t flex gap-3">
              <button 
                disabled={actionId === selectedApp._id}
                onClick={() => updateStatus(selectedApp._id, "rejected")}
                className="flex-1 py-4 bg-white border text-red-600 font-black text-[10px] uppercase rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {actionId === selectedApp._id ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Reject"}
              </button>
              <button 
                disabled={actionId === selectedApp._id}
                onClick={() => updateStatus(selectedApp._id, "completed")}
                className="flex-1 py-4 bg-[#3F2965] text-white font-black text-[10px] uppercase rounded-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {actionId === selectedApp._id ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Complete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 4. TIME SLOTS VIEW ---
const TimeSlotsView = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [newSlot, setNewSlot] = useState("");
  const [slots, setSlots] = useState([]);
  
  // Status States
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [flushing, setFlushing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [availabilityId, setAvailabilityId] = useState(null);

  // Modal Control States
  const [modalType, setModalType] = useState(null); // 'flush' | 'delete_all'

  const checkExistingAvailability = async () => {
    if (!date) return;
    setFetching(true);
    setErrorMsg("");
    try {
      const res = await API.get(`/appointment/get-availability?date=${date}`);
      setAvailabilityId(res.data.data?.availabilityId || null);
      const existingSlots = res.data.data?.slots || [];
      const formattedSlots = existingSlots.map(s => typeof s === 'object' ? s.time : s);
      setSlots(formattedSlots.sort());
    } catch (e) {
      setSlots([]);
      setAvailabilityId(null);
      if (e.response?.status === 400 || e.response?.status === 404) {
        setErrorMsg(e.response.data?.message);
      } else {
        setErrorMsg("Failed to fetch existing schedule. Please check connection.");
      }
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (date) checkExistingAvailability();
  }, [date]);

  const addSlot = () => {
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot].sort());
      setNewSlot("");
    }
  };

  const publishAvailability = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await API.post("/admin/set-availability", { date, slots });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) { 
      setErrorMsg(e.response?.data?.message || "Failed to update portal schedule."); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleDeleteTrigger = (slotToRemove) => {
    const updatedSlots = slots.filter(t => t !== slotToRemove);
    // If user removes the very last slot and a record already exists in DB
    if (updatedSlots.length === 0 && availabilityId) {
      setModalType('delete_all');
    } else {
      setSlots(updatedSlots);
    }
  };

  const confirmDeleteAll = async () => {
    setModalType(null);
    setLoading(true);
    try {
      await API.delete(`/appointment/delete-availability/${availabilityId}`);
      setSlots([]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) {
      setErrorMsg("Error: " + (e.response?.data?.message || "Delete failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleFlush = async () => {
    setModalType(null);
    setFlushing(true);
    try {
      await API.delete("/appointment/flush-availability");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      if (date) await checkExistingAvailability();
    } catch (e) {
      setErrorMsg("Error: " + (e.response?.data?.message || "Flush failed"));
    } finally {
      setFlushing(false);
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-3xl border shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      
      {/* --- SUCCESS OVERLAY --- */}
      {showSuccess && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-60 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-xl">
            <Check size={40} strokeWidth={3} className="animate-bounce" />
          </div>
          <h3 className="text-2xl font-black text-[#3F2965]">Schedule Synced!</h3>
        </div>
      )}

      {/* --- INTERACTIVE CONFIRMATION MODAL --- */}
      {modalType && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-black text-[#3F2965]">Confirm Action</h3>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                {modalType === 'flush' 
                  ? "This will remove all availability records dated before today. This cannot be undone." 
                  : "Removing the final slot will delete the entire schedule for this specific date."}
              </p>
            </div>
            <div className="p-6 bg-slate-50 flex gap-3">
              <button onClick={() => setModalType(null)} className="flex-1 py-4 text-xs font-black uppercase text-slate-400 bg-white border rounded-2xl hover:bg-slate-100 transition-all">Cancel</button>
              <button onClick={modalType === 'flush' ? handleFlush : confirmDeleteAll} className="flex-1 py-4 text-xs font-black uppercase text-white bg-red-500 rounded-2xl shadow-lg hover:bg-red-600 transition-all">Execute</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <Calendar size={18} className="text-[#3F2965]" />
        <h2 className="font-black text-xs uppercase tracking-widest text-slate-400">Manage Availability</h2>
      </div>

      {/* ERROR BANNER */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="shrink-0 mt-0.5" size={18} />
          <p className="text-sm font-bold flex-1">{errorMsg}</p>
          <button onClick={() => setErrorMsg("")}><X size={18}/></button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-[#3F2965] focus:ring-2 focus:ring-[#3F2965] outline-none" 
          />
          {fetching && <Loader2 size={16} className="absolute right-4 top-5 animate-spin text-[#3F2965]" />}
        </div>
        <div className="flex gap-2">
          <input 
            type="time" 
            value={newSlot} 
            onChange={(e) => setNewSlot(e.target.value)} 
            className="flex-1 p-4 bg-slate-50 border-none rounded-2xl font-bold text-[#3F2965] focus:ring-2 focus:ring-[#3F2965] outline-none" 
          />
          <button 
            onClick={addSlot} 
            disabled={!date} 
            className="p-4 bg-[#3F2965] text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
          {slots.length > 0 ? "Current Slots" : "No slots added yet"}
        </p>
        <div className="flex flex-wrap gap-3 p-6 bg-slate-50 rounded-2xl border-2 border-dashed min-h-25">
          {slots.map(s => (
            <div key={s} className="bg-white text-[#3F2965] px-5 py-2 rounded-2xl font-black border shadow-sm flex items-center gap-3 animate-in fade-in zoom-in">
              {s} <X size={14} className="cursor-pointer text-red-300 hover:text-red-500 transition-colors" onClick={() => handleDeleteTrigger(s)} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          disabled={flushing} 
          onClick={() => setModalType('flush')} 
          className="md:col-span-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl border-2 border-slate-200 flex justify-center items-center gap-2 hover:bg-slate-200 disabled:opacity-30 transition-all"
        >
          {flushing ? <Loader2 className="animate-spin" size={20} /> : <><Trash2 size={18} /> Flush Past</>}
        </button>
        <button 
          disabled={loading || !date} 
          onClick={publishAvailability} 
          className="md:col-span-2 py-5 bg-[#Dd1764] text-white font-black rounded-2xl shadow-xl flex justify-center items-center gap-3 hover:opacity-90 active:scale-[0.98] disabled:opacity-30 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : <><TrendingUp size={20} /> Broadcast Schedule</>}
        </button>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const navItems = [
    { name: "Profile", icon: UserCircle },
    { name: "Wallet Requests", icon: Wallet },
    { name: "Appointments", icon: CalendarCheck },
    { name: "Time Slots", icon: Clock },
  ];

  useEffect(() => {
    const syncTabFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      const matched = navItems.find(item => item.name === hash);
      setActiveTab(matched ? matched.name : "Profile");
    };
    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);
    return () => window.removeEventListener("hashchange", syncTabFromHash);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-8">
        <Link to='/' className="mb-12 self-center">
          <img src={Logo} className="w-48 transition-transform hover:scale-105" alt="Mindsettler" />
        </Link>
        <nav className="flex-1 space-y-3">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <a key={item.name} href={`#${encodeURIComponent(item.name)}`} onClick={() => setActiveTab(item.name)} 
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${activeTab === item.name ? "bg-[#3F2965] text-white shadow-xl translate-x-2" : "text-slate-400 hover:bg-slate-50 hover:text-[#3F2965]"}`}>
                <Icon size={20} strokeWidth={2.5} /> {item.name}
              </a>
            )
          })}
        </nav>
        <button onClick={() => navigate("/logout")} className="mt-8 flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm text-red-500 hover:bg-red-50 transition-all group">
          <LogOut size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" /> Logout
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-12 z-10">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-purple-50 rounded-2xl text-[#3F2965]">
                {(() => {
                    const activeItem = navItems.find(i => i.name === activeTab);
                    const ActiveIcon = activeItem ? activeItem.icon : UserCircle;
                    return <ActiveIcon size={24} />;
                })()}
             </div>
             <h1 className="text-2xl font-black text-[#3F2965] uppercase tracking-tighter">{activeTab}</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 bg-slate-50/50">
          <div className="max-w-6xl mx-auto">
            {activeTab === "Profile" && <AdminProfileView user={user} setUser={setUser} />}
            {activeTab === "Wallet Requests" && <WalletRequestsView />}
            {activeTab === "Appointments" && <AppointmentsView />}
            {activeTab === "Time Slots" && <TimeSlotsView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;