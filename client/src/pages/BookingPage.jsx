import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Coffee,
  Info,
  MessageSquare,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const BookingPage = () => {
  const [selectedSlot, setSelectedSlot] = useState("10:10 AM");
  const [sessionType, setSessionType] = useState("online");
  const [selectedTherapy, setSelectedTherapy] = useState(
    "Cognitive Behavioural Therapy (CBT)"
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");

  const colors = {
    primary: "#3F2965",
    secondary: "#DD1764",
    accentLight: "#FCE8EF",
    purpleLight: "#E9E4F0",
  };

  const therapies = [
    "Cognitive Behavioural Therapy (CBT)",
    "Dialectical Behavioural Therapy (DBT)",
    "Acceptance & Commitment Therapy (ACT)",
    "Schema Therapy",
    "Emotion-Focused Therapy (EFT)",
    "Emotion-Focused Couples Therapy",
    "Mindfulness-Based Cognitive Therapy",
    "Client-Centred Therapy",
  ];
  const allSlots = [
    "9:00 AM",
    "9:10 AM",
    "9:20 AM",
    "9:30 AM",
    "9:40 AM",
    "9:50 AM",
    "10:00 AM",
    "10:10 AM",
    "10:20 AM",
    "10:30 AM",
    "5:00 PM",
    "5:10 PM",
    "5:20 PM",
    "5:30 PM",
    "5:40 PM",
    "5:50 PM",
    "6:00 PM",
    "6:10 PM",
    "6:20 PM",
  ];
  const morningSlots = allSlots.filter((slot) => slot.includes("AM"));
  const eveningSlots = allSlots.filter((slot) => slot.includes("PM"));

  const handleBooking = () => {
    const bookingData = {
      therapy: selectedTherapy,
      date: selectedDate,
      time: selectedSlot,
      type: sessionType,
      note: note,
      status: "Pending Confirmation",
    };
    alert(
      `Request Sent for ${selectedDate} at ${selectedSlot}! Please complete payment via UPI.`
    );
    console.log("Booking Data:", bookingData);
  };

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #E9E4F0; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3F2965; }
        `}
      </style>

      <Navbar />
      <div className="min-h-screen pt-25 bg-slate-50 font-sans text-slate-700 flex flex-col">
        <main className="p-4 md:p-8 pt-24">
          <header className="mb-8 max-w-6xl mx-auto">
            <h1
              className="text-4xl font-bold"
              style={{ color: colors.primary }}
            >
              MindSettler Appointments
            </h1>
            <p className="text-md text-slate-500">Home &gt; Appointments</p>
          </header>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Sticky Sidebar */}
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="mb-4">
                  <h2
                    className="font-bold text-lg mb-1"
                    style={{ color: colors.primary }}
                  >
                    PERSONALIZED THERAPY
                  </h2>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Designed Around You
                  </p>
                </div>

                <div className="space-y-2">
                  {therapies.map((therapy) => (
                    <button
                      key={therapy}
                      onClick={() => setSelectedTherapy(therapy)}
                      className={`w-full text-left p-3 rounded-xl text-sm transition-all border ${
                        selectedTherapy === therapy
                          ? "font-semibold"
                          : "text-slate-600"
                      }`}
                      style={
                        selectedTherapy === therapy
                          ? {
                              borderColor: colors.secondary,
                              color: colors.primary,
                              backgroundColor: colors.accentLight,
                            }
                          : { borderColor: "#f1f5f9" }
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            selectedTherapy === therapy
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          style={{ backgroundColor: colors.secondary }}
                        />
                        {therapy}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl shadow-sm bg-white border border-slate-100">
                <h3
                  className="font-bold mb-3 flex items-center gap-2"
                  style={{ color: colors.primary }}
                >
                  <Info size={18} /> Session Details
                </h3>
                <ul className="text-sm space-y-2 text-slate-600">
                  <li className="flex justify-between">
                    <span>Duration:</span>{" "}
                    <span className="font-bold">60 Minutes</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Format:</span>{" "}
                    <span className="font-bold">1-on-1 Session</span>
                  </li>
                </ul>
                <p className="text-[11px] mt-4 opacity-70 italic">
                  All sessions are 100% confidential & encrypted.
                </p>
              </div>
            </div>

            {/* Right Column: Scrollable Content */}
            <div
              className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-y-auto custom-scrollbar"
              style={{ maxHeight: "calc(100vh)" }}
            >
              <div className="p-8">
                {/* Date Picker */}
                <div className="mb-8">
                  <SectionTitle
                    icon={<CalendarIcon size={18} />}
                    title="Select Date"
                    subtitle="Available for the next 14 days"
                    accentColor={colors.secondary}
                    lightAccent={colors.accentLight}
                  />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-2 w-full md:w-64 p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#3F2965] transition-all"
                  />
                </div>

                {/* Session Type */}
                <div className="flex gap-4 mb-8">
                  <button
                    onClick={() => setSessionType("online")}
                    className="flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-semibold"
                    style={
                      sessionType === "online"
                        ? {
                            borderColor: colors.primary,
                            backgroundColor: colors.purpleLight,
                            color: colors.primary,
                          }
                        : { borderColor: "#f1f5f9" }
                    }
                  >
                    <Video size={20} /> Online Studio
                  </button>
                  <button
                    onClick={() => setSessionType("offline")}
                    className="flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-semibold"
                    style={
                      sessionType === "offline"
                        ? {
                            borderColor: colors.primary,
                            backgroundColor: colors.purpleLight,
                            color: colors.primary,
                          }
                        : { borderColor: "#f1f5f9" }
                    }
                  >
                    <MapPin size={20} /> Offline Studio
                  </button>
                </div>

                {/* Slots */}
                <SectionTitle
                  icon={<Coffee size={18} />}
                  title="Morning"
                  subtitle="9:00 AM to 12:00 PM"
                  accentColor={colors.secondary}
                  lightAccent={colors.accentLight}
                />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                  {morningSlots.map((slot) => (
                    <SlotButton
                      key={slot}
                      time={slot}
                      selected={selectedSlot === slot}
                      onClick={() => setSelectedSlot(slot)}
                      primaryColor={colors.primary}
                    />
                  ))}
                </div>

                <SectionTitle
                  icon={<Clock size={18} />}
                  title="Evening"
                  subtitle="5:00 PM to 09:00 PM"
                  accentColor={colors.secondary}
                  lightAccent={colors.accentLight}
                />
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                  {eveningSlots.map((slot) => (
                    <SlotButton
                      key={slot}
                      time={slot}
                      selected={selectedSlot === slot}
                      onClick={() => setSelectedSlot(slot)}
                      primaryColor={colors.primary}
                    />
                  ))}
                </div>

                {/* Consultant Notes */}
                <div className="mt-8">
                  <SectionTitle
                    icon={<MessageSquare size={18} />}
                    title="Add a Note"
                    subtitle="Briefly mention your concern (optional)"
                    accentColor={colors.secondary}
                    lightAccent={colors.accentLight}
                  />
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="E.g., I've been feeling anxious lately..."
                    className="w-full mt-2 p-4 rounded-xl border border-slate-200 focus:border-[#3F2965] outline-none h-32 resize-none text-sm transition-all"
                  />
                </div>

                <hr className="my-8 border-slate-100" />

                {/* Footer Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-sm text-slate-500">
                      Selected:{" "}
                      <span
                        className="font-semibold"
                        style={{ color: colors.primary }}
                      >
                        {selectedTherapy}
                      </span>
                    </p>
                    <p className="font-bold text-slate-800">
                      UPI ID: mindsettler@upi
                    </p>
                    <p
                      className="text-xs font-medium"
                      style={{ color: colors.secondary }}
                    >
                      * Manual confirmation after payment
                    </p>
                  </div>
                  <button
                    onClick={handleBooking}
                    className="w-full md:w-auto px-10 py-4 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Request Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

const SectionTitle = ({ icon, title, subtitle, accentColor, lightAccent }) => (
  <div className="flex justify-between items-end mb-4">
    <div className="flex items-center gap-3">
      <div
        className="p-2 rounded-lg"
        style={{ backgroundColor: lightAccent, color: accentColor }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-bold leading-none text-slate-800">{title}</h3>
        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
    </div>
  </div>
);

const SlotButton = ({ time, selected, onClick, primaryColor }) => (
  <button
    onClick={onClick}
    className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2
      ${
        selected
          ? "text-white shadow-md"
          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
      }`}
    style={
      selected
        ? { backgroundColor: primaryColor, borderColor: primaryColor }
        : {}
    }
  >
    {selected && <span className="text-lg">→</span>}
    {time}
  </button>
);

export default BookingPage;
