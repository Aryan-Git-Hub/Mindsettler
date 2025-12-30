import React, { useState, useRef } from 'react';
import { 
  User, Globe, Bell, CreditCard, Receipt, History, 
  Lock, ShieldCheck, Monitor, Trash2, Search, 
  HelpCircle, CheckCircle2, X, MapPin, Edit3,
  Plus, Check, Camera, Calendar, Clock, Wallet, TrendingUp,
  ChevronRight, ArrowUpRight, ArrowDownLeft, MoreHorizontal
} from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('Edit Profile');
  const [walletBalance, setWalletBalance] = useState(4250.00);
  
  const [formData, setFormData] = useState({
    fullName: "Ronald Richards",
    email: "RonaldRich@example.com",
    phone: "(219) 555-0114",
    location: "California",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ronald"
  });

  const [editModes, setEditModes] = useState({ personalInfo: false, location: false });

  const fileInputRef = useRef(null);
  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = (field) => {
    setEditModes(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const menuItems = [
    { section: 'Profile', items: [
      { label: 'Edit Profile', icon: <User size={18}/> },
      { label: 'Sessions', icon: <Calendar size={18}/> },
      { label: 'Notifications', icon: <Bell size={18}/> }
    ]},
    { section: 'Bank', items: [
      { label: 'Payments', icon: <CreditCard size={18}/> },
      { label: 'Wallet', icon: <Wallet size={18}/> },
      { label: 'Transactions', icon: <History size={18}/> }
    ]},
    { section: 'Secure', items: [
      { label: 'Password', icon: <Lock size={18}/> }
    ]}
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">MindSettler</span>
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto">
          {menuItems.map((group) => (
            <div key={group.section}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">{group.section}</p>
              {group.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-1 ${
                    activeTab === item.label ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <Wallet size={14} className="text-blue-600" />
                <span className="text-xs font-bold">₹{walletBalance.toLocaleString()}</span>
            </div>
            <HelpCircle className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" size={20} />
            <div className="relative">
              <Bell className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">2</span>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <img src={formData.profilePic} className="w-9 h-9 rounded-full border border-slate-200 shadow-sm" alt="User" />
            </div>
          </div>
        </header>

        <main className="p-8 max-w-4xl mx-auto w-full">
          <div className="flex flex-col mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1">
                {activeTab === 'Transactions' ? 'Track your session payments and top-ups.' : 'Manage your account and therapeutic journey.'}
            </p>
          </div>

          <div className="space-y-6">
            {activeTab === 'Edit Profile' && (
              <>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center gap-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-yellow-400 border-4 border-white shadow-md">
                       <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button onClick={handleUploadClick} className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white border-2 border-white hover:bg-blue-700 transition-colors shadow-lg">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <button onClick={handleUploadClick} className="border border-slate-200 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all active:scale-95">
                      Upload new photo
                    </button>
                    <p className="text-slate-400 text-xs mt-3">At least 800×800 px recommended. JPG or PNG is allowed</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800">Personal Info</h3>
                    <button 
                      onClick={() => toggleEdit('personalInfo')}
                      className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold border transition-all ${
                        editModes.personalInfo ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {editModes.personalInfo ? <Check size={14}/> : <Edit3 size={14}/>}
                      {editModes.personalInfo ? 'Save Changes' : 'Edit Info'}
                    </button>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <EditableField label="Full Name" value={formData.fullName} isEditing={editModes.personalInfo} onChange={(val) => setFormData({...formData, fullName: val})} />
                    <EditableField label="Email" value={formData.email} isEditing={editModes.personalInfo} onChange={(val) => setFormData({...formData, email: val})} />
                    <EditableField label="Phone" value={formData.phone} isEditing={editModes.personalInfo} onChange={(val) => setFormData({...formData, phone: val})} />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Sessions' && <SessionsView />}
            {activeTab === 'Wallet' && <WalletView balance={walletBalance} setBalance={setWalletBalance} />}
            {activeTab === 'Payments' && <PaymentsView />}
            {activeTab === 'Transactions' && <TransactionsView />}

            {activeTab === 'Password' && <PasswordView />}
            {activeTab === 'Access' && <AccessView />}

            {activeTab === 'Notifications' && <NotificationsView />}
          </div>
        </main>
      </div>
    </div>
  );
};

// --- PAYMENTS VIEW COMPONENT ---
const PaymentsView = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Linked Methods</h3>
                    <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                        <Plus size={16} /> Add Method
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[10px] italic">VISA</div>
                            <div>
                                <p className="text-sm font-bold">•••• •••• •••• 4242</p>
                                <p className="text-[10px] text-slate-400 font-medium">Expires 12/26</p>
                            </div>
                        </div>
                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Default</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl opacity-60">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[10px] italic">UPI</div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">ronald@okaxis</p>
                            </div>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- TRANSACTIONS VIEW COMPONENT ---
const TransactionsView = () => {
    const history = [
        { id: 1, title: 'Intro Session Booking', date: 'Jan 02, 2025', amt: -1200, type: 'session' },
        { id: 2, title: 'Wallet Recharge', date: 'Jan 01, 2025', amt: 5000, type: 'topup' },
        { id: 3, title: 'Awareness Workshop', date: 'Dec 28, 2024', amt: -800, type: 'session' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {history.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${item.amt > 0 ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-600'}`}>
                                            {item.amt > 0 ? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16}/>}
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">{item.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-xs text-slate-500 font-medium">{item.date}</td>
                                <td className={`px-6 py-5 text-sm font-bold text-right ${item.amt > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                                    {item.amt > 0 ? '+' : ''}₹{Math.abs(item.amt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 text-center">
                <button className="text-xs font-bold text-blue-600 hover:underline">Download PDF Report</button>
            </div>
        </div>
    );
};

// --- WALLET VIEW COMPONENT ---
const WalletView = ({ balance, setBalance }) => {
    const recharge = (amt) => setBalance(prev => prev + amt);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col justify-between h-56 shadow-xl shadow-slate-200">
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">MindSettler Balance</p>
                        <h2 className="text-4xl font-black mt-3">₹{balance.toLocaleString()}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-white/5 w-fit px-3 py-1 rounded-full">
                        <TrendingUp size={16} /> Ready for next session
                    </div>
                </div>

                <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between">
                    <div>
                        <h4 className="font-bold text-lg">Quick Topup</h4>
                        <p className="text-slate-400 text-xs mt-1">Select an amount to recharge your wallet.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-6">
                        {[500, 1000, 2000].map(amt => (
                            <button 
                                key={amt}
                                onClick={() => recharge(amt)}
                                className="py-3 border border-slate-100 rounded-2xl text-sm font-bold hover:border-blue-600 hover:text-blue-600 transition-all hover:bg-blue-50"
                            >
                                +₹{amt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold mb-4">Why use the MindSettler Wallet?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                        <div className="bg-blue-50 p-2 h-fit rounded-lg text-blue-600"><Check size={18} /></div>
                        <p className="text-xs text-slate-500 leading-relaxed"><b>Instant Booking:</b> No need to enter card details every time you book a 60-min session.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-blue-50 p-2 h-fit rounded-lg text-blue-600"><Check size={18} /></div>
                        <p className="text-xs text-slate-500 leading-relaxed"><b>Easy Refunds:</b> Cancellations are credited back to your wallet instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SESSIONS VIEW COMPONENT ---
const SessionsView = () => {
  const sessions = [
    {
      id: 1, title: "First Introductory Session", type: "Online", duration: "60 min", date: "Jan 05, 2025", time: "10:30 AM", isFirst: true,
    },
    {
      id: 2, title: "Psychology Awareness Studio", type: "Offline Studio", duration: "60 min", date: "Jan 12, 2025", time: "04:00 PM", isFirst: false,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {sessions.map((session) => (
          <div key={session.id} className={`bg-white p-5 rounded-2xl border transition-all ${session.isFirst ? 'border-blue-500 ring-1 ring-blue-50 shadow-sm' : 'border-slate-200'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.type === 'Online' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                  {session.type === 'Online' ? <Monitor size={24} /> : <MapPin size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{session.title}</h4>
                    {session.isFirst && <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Intro Session</span>}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-slate-500 text-xs font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {session.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {session.time} ({session.duration})</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50">Reschedule</button>
                <button className="flex-1 md:flex-none px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800">
                  {session.type === 'Online' ? 'Join Call' : 'Studio Map'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all">
        <Plus size={20} /> Book a New 60-Min Session
      </button>
    </div>
  );
};

const EditableField = ({ label, value, isEditing, onChange }) => (
  <div className="space-y-1.5">
    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest ml-1">{label}</p>
    {isEditing ? (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border-b-2 border-blue-500 py-1.5 font-semibold text-sm outline-none bg-blue-50/50 px-1 rounded-t-sm" />
    ) : (
      <p className="font-semibold text-slate-800 text-sm py-1.5 border-b-2 border-transparent px-1">{value}</p>
    )}
  </div>
);

// --- PASSWORD VIEW COMPONENT ---
const PasswordView = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 text-lg">Change Password</h3>
        <p className="text-slate-400 text-xs">Update your password to keep your MindSettler account secure.</p>
      </div>
      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
          <input type="password" placeholder="••••••••" className="w-full border-b border-slate-200 py-2 outline-none focus:border-blue-500 transition-colors" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
          <input type="password" placeholder="••••••••" className="w-full border-b border-slate-200 py-2 outline-none focus:border-blue-500 transition-colors" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
          <input type="password" placeholder="••••••••" className="w-full border-b border-slate-200 py-2 outline-none focus:border-blue-500 transition-colors" />
        </div>
        <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-100">
          Update Password
        </button>
      </div>
    </div>
  );
};

// --- ACCESS VIEW COMPONENT ---
const AccessView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Two-Factor Authentication</h4>
            <p className="text-xs text-slate-400 mt-1">Add an extra layer of security to your therapeutic portal.</p>
          </div>
        </div>
        <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
          <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full shadow-sm" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h4 className="font-bold text-slate-800">Login Activity</h4>
          <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Active Sessions</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor size={18} className="text-slate-400" />
              <div>
                <p className="text-sm font-bold text-slate-800">Chrome on MacOS</p>
                <p className="text-[10px] text-green-600 font-bold">Current Session</p>
              </div>
            </div>
            <button className="text-[10px] font-bold text-red-500 uppercase hover:underline">Log out</button>
          </div>
          <div className="flex items-center justify-between border-t border-slate-50 pt-4 opacity-60">
            <div className="flex items-center gap-3">
              <Smartphone size={18} className="text-slate-400" />
              <div>
                <p className="text-sm font-bold text-slate-800">MindSettler iOS App</p>
                <p className="text-[10px] text-slate-400 font-medium">Last active: 2 hours ago</p>
              </div>
            </div>
            <button className="text-[10px] font-bold text-red-500 uppercase">Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- NOTIFICATIONS VIEW COMPONENT ---
const NotificationsView = () => {
  const [settings, setSettings] = useState({
    sessions: true,
    reminders: true,
    marketing: false,
    security: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 text-lg">Notification Settings</h3>
        <p className="text-slate-400 text-xs">Choose how you want to be notified about your MindSettler activity.</p>
      </div>

      <div className="p-6 divide-y divide-slate-100">
        <NotificationToggle 
          title="Session Confirmations" 
          desc="Get an email when a new 60-min session is booked or rescheduled."
          active={settings.sessions}
          onClick={() => toggleSetting('sessions')}
        />
        <NotificationToggle 
          title="Session Reminders" 
          desc="Receive a notification 30 minutes before your session starts."
          active={settings.reminders}
          onClick={() => toggleSetting('reminders')}
        />
        <NotificationToggle 
          title="Psycho-Education Updates" 
          desc="Stay updated with new mental health awareness blogs and workshops."
          active={settings.marketing}
          onClick={() => toggleSetting('marketing')}
        />
        <NotificationToggle 
          title="Security Alerts" 
          desc="Get notified about new logins or account changes."
          active={settings.security}
          onClick={() => toggleSetting('security')}
        />
      </div>

      <div className="p-6 bg-slate-50/50 flex justify-end gap-3">
        <button className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600">Restore Defaults</button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-100">Save Preferences</button>
      </div>
    </div>
  );
};

// --- HELPER TOGGLE COMPONENT ---
const NotificationToggle = ({ title, desc, active, onClick }) => (
  <div className="py-5 flex items-center justify-between">
    <div className="pr-4">
      <h5 className="text-sm font-bold text-slate-800">{title}</h5>
      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
    </div>
    <button 
      onClick={onClick}
      className={`relative w-11 h-6 flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
        active ? 'bg-blue-600' : 'bg-slate-200'
      }`}
    >
      <div 
        className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${
          active ? 'translate-x-6' : 'translate-x-1'
        }`} 
      />
    </button>
  </div>
);

export default UserProfile;