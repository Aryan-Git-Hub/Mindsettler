# 🧘 MindSettler: A Unified Mental Wellness Ecosystem

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://mindsettler-taupe.vercel.app/)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)](https://mongodb.com)
[![SVNIT Surat](https://img.shields.io/badge/Institute-SVNIT%20Surat-orange?style=for-the-badge)](https://www.svnit.ac.in)

**MindSettler** is a professional-grade mental health platform built to democratize access to specialized therapy. Designed by an AI student at **NIT Surat**, this project addresses the logistical friction in mental healthcare through an automated booking engine, a secure internal economy (Wallet), and smart-activation digital session rooms.

🚀 **Live Link:** [https://mindsettler-taupe.vercel.app/auth](https://mindsettler-taupe.vercel.app/auth)

---

## 🎯 The "Problem vs. Solution" Philosophy

### 1. The Friction Problem
**Problem:** Traditional healthcare platforms have high drop-off rates due to "Transaction Anxiety" and decision fatigue at the point of booking.
**Solution:** The **MindSettler Wallet**. By pre-loading credits, users can book a session with a single click in a moment of need. This also enables instant, frictionless refunds/credits if a session is rescheduled.

### 2. The Ghost Link Problem
**Problem:** Users often get confused about when to join their session, leading to missed appointments.
**Solution:** **Smart-Room Logic**. Meeting links are hidden and "Room Locked" until exactly **10 minutes before** the session (IST), providing a clear, stress-free countdown.

### 3. The Deployment Gap
**Problem:** Local development environments (Windows/Mac) often hide bugs that appear in Linux production environments.
**Solution:** Standardized **Linux-compliant builds**, handling case-sensitive file systems and secure reverse-proxy headers.

---

## ✨ Core Features

### 💰 Secure Virtual Wallet System
- **Atomic Transactions:** Backend ensures the wallet balance is debited (₹500/session) simultaneously with the appointment creation.
- **Transactional Integrity:** No booking can be initiated without a pre-validated balance.
- **Instant Reversals:** If an admin cancels a session, funds are returned to the user's wallet instantly rather than waiting 5-7 days for a bank transfer.

### 📅 Intelligent Therapy Scheduler
- **Time-Aware Filtering:** Automatically hides past time slots for the current day to prevent impossible bookings.
- **Specialized Modalities:** Choose from CBT, DBT, ACT, Schema Therapy, EFT, and more.
- **Mobile-First Design:** Featuring a sticky mobile action bar and horizontal snap-scrolling for therapy types.

### 🎥 Digital Room "Join" Logic
- **Countdown States:** UI transitions through three states: `Locked` ⮕ `Available Soon` ⮕ `Join Now`.
- **IST Synchronization:** All scheduling and activation logic is synchronized to **Indian Standard Time (Asia/Kolkata)** regardless of server location.

---

## 🛠️ The "Vercel Hurdles" (Technical Problem Solving)

[Image of a sequence diagram showing a client and server exchanging Cache-Control headers to prevent stale responses]

* **The Invisible Cookie:** Solved the "Cookie not saving on Vercel" issue by setting `app.set("trust proxy", 1)` and configuring JWT cookies with `SameSite: "None"` and `Secure: true`.
* **304 Not Modified (Logout Bug):** Fixed a production bug where logout requests were being cached, preventing the cookie from being cleared. Resolved by adding `Cache-Control: no-store` headers to the logout controller.
* **Case-Sensitivity Errors:** Fixed build failures caused by the difference between Windows (case-insensitive) and Linux (case-sensitive) by standardizing file naming conventions (e.g., `Dashboard.jsx`).
* **Timezone Offset:** Corrected server-side "Cold Start" timing issues by setting the `TZ` environment variable to `Asia/Kolkata` on Vercel.

---

## 🤖 AI Roadmap: The Next Phase
As an **AI Student at SVNIT**, the next version of MindSettler is set to include:
- **AI Sentiment Analysis:** Analyzing user session notes to provide therapists with a "Mood Score."
- **YOLO-Based Emotion Detection:** Tracking facial micro-expressions during sessions to provide therapists with objective patient data.
- **LLM Screening Bot:** A custom chatbot to suggest the most effective therapy type (e.g., CBT vs. DBT) based on user symptoms.

---

## 📂 Project Structure
```text
mindsettler/
├── client/                # React (Vite) + Tailwind CSS
│   ├── src/
│   │   ├── api/          # Axios configurations with withCredentials
│   │   ├── context/      # Auth & Wallet state management (AuthContext)
│   │   └── pages/        # Dynamic Booking, Profile, & Auth Views
├── server/                # Node.js + Express
│   ├── config/           # MongoDB Atlas connection (serverSelectionTimeout)
│   ├── controllers/      # Appointment, Wallet, and JWT Logic
│   ├── models/           # Mongoose schemas (User, Appointment, Availability)
│   └── routes/           # REST API Endpoints