import React, { useState } from "react";
import Logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  Building2,
  Users,
  Wallet,
  UserCircle,
  LogOut,
  CheckCircle,
  Plus,
  MoreVertical,
} from "lucide-react";

// --- SUB-COMPONENTS FOR DIFFERENT VIEWS ---

const OverviewView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: "Total Users", val: "1,284", icon: Users, color: "bg-[#3F2965]" },
        { label: "Pending Payouts", val: "12", icon: Clock, color: "bg-amber-500" },
        { label: "Confirmed Today", val: "8", icon: CheckCircle, color: "bg-[#Dd1764]" },
        { label: "Sessions This Month", val: "142", icon: CalendarCheck, color: "bg-purple-400" },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.val}</h3>
          </div>
          <div className={`p-3 rounded-lg ${stat.color} text-white`}>
            <stat.icon size={20} />
          </div>
        </div>
      ))}
    </div>
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#3F2965] text-xs font-bold">
                User
              </div>
              <div>
                <p className="text-sm font-medium">Payment verified for Amit R.</p>
                <p className="text-xs text-slate-400">2 hours ago</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-pink-50 text-[#Dd1764] rounded">
              Success
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AppointmentsView = () => {
  const [filter, setFilter] = useState("pending");
  return (
    <div className="space-y-4">
      <div className="flex gap-4 border-b">
        {["pending", "confirmed"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`pb-2 px-4 capitalize transition-all ${
              filter === t
                ? "border-b-2 border-[#3F2965] text-[#3F2965] font-bold"
                : "text-slate-500"
            }`}
          >
            {t} Sessions
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-5 rounded-xl border flex justify-between items-center group hover:border-[#3F2965]/30 transition-all">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-800">Client Name {i}</h4>
                <span className="text-[10px] bg-purple-50 text-[#3F2965] px-2 py-0.5 rounded-full font-bold uppercase">
                  Online
                </span>
              </div>
              <p className="text-sm text-slate-600 font-medium italic">"Anxiety & Stress Management"</p>
              <p className="text-xs text-slate-400 font-medium">Dec 28, 2025 • 04:00 PM • UPI ID: user@okaxis</p>
            </div>
            <div className="flex gap-2">
              {filter === "pending" ? (
                <>
                  <button className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
                    Reject
                  </button>
                  <button className="px-4 py-2 text-sm font-bold text-white bg-[#3F2965] rounded-lg hover:bg-[#3F2965]/90">
                    Approve Payment
                  </button>
                </>
              ) : (
                <button className="p-2 text-slate-400 hover:text-[#3F2965]">
                  <MoreVertical size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EarningsView = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[#3F2965] p-6 rounded-2xl text-white">
        <p className="text-slate-300 text-sm">Total Revenue</p>
        <h2 className="text-3xl font-bold mt-2">₹1,24,000</h2>
        <div className="mt-4 flex items-center gap-2 text-[#Dd1764] text-xs font-bold bg-white/10 w-fit px-2 py-1 rounded">
          <Plus size={12} /> 12% from last month
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border">
        <p className="text-slate-500 text-sm">UPI Payments</p>
        <h2 className="text-3xl font-bold mt-2 text-[#3F2965]">₹98,500</h2>
      </div>
      <div className="bg-white p-6 rounded-2xl border">
        <p className="text-slate-500 text-sm">Cash / Offline</p>
        <h2 className="text-3xl font-bold mt-2 text-[#3F2965]">₹25,500</h2>
      </div>
    </div>
  </div>
);

// --- MAIN ADMIN DASHBOARD COMPONENT ---

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Appointments", icon: CalendarCheck },
    { name: "Time Slots", icon: Clock },
    { name: "Corporate", icon: Building2 },
    { name: "Customers", icon: Users },
  ];

  const footerItems = [
    { name: "Earnings", icon: Wallet },
    { name: "Profile", icon: UserCircle },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center justify-center">
            <Link to="/" className="block hover:opacity-80 transition-opacity">
              <img
                src={Logo}
                alt="MindSettler Logo"
                className="w-44 h-auto object-contain"
              />
            </Link>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.name
                  ? "bg-purple-50 text-[#3F2965]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#3F2965]"
              }`}
            >
              <item.icon size={18} strokeWidth={2.5} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-slate-100 space-y-1">
          {footerItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.name
                  ? "bg-purple-50 text-[#3F2965]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#3F2965]"
              }`}
            >
              <item.icon size={18} strokeWidth={2.5} />
              {item.name}
            </button>
          ))}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#Dd1764] hover:bg-red-50 mt-4 transition-all">
            <LogOut size={18} strokeWidth={2.5} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10">
          <h1 className="text-2xl font-black text-[#3F2965]">{activeTab}</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-l pl-6">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">Admin Panel</p>
                <p className="text-[10px] text-[#Dd1764] font-bold uppercase tracking-widest">
                  MindSettler
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-[#3F2965]/10" />
            </div>
          </div>
        </header>

        {/* View Router */}
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-5xl mx-auto">
            {activeTab === "Dashboard" && <OverviewView />}
            {activeTab === "Appointments" && <AppointmentsView />}
            {activeTab === "Earnings" && <EarningsView />}
            {!["Dashboard", "Appointments", "Earnings"].includes(activeTab) && (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl text-slate-400">
                <p className="font-bold text-[#3F2965]">{activeTab} Section</p>
                <p className="text-sm">
                  This module is being connected to the database...
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;