# 🧘 MindSettler: A Unified Mental Wellness Ecosystem

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://mindsettler-taupe.vercel.app)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)](https://mongodb.com)
[![SVNIT Surat](https://img.shields.io/badge/Institute-SVNIT%20Surat-orange?style=for-the-badge)](https://www.svnit.ac.in)

**MindSettler** is a professional-grade mental health platform built to democratize access to specialized therapy. Designed by an AI student at **NIT Surat**, this project addresses the logistical friction in mental healthcare through an automated booking engine, a secure internal economy (Wallet), and smart-activation digital session rooms.

---

## 🎯 The "Problem vs. Solution" Philosophy

### 1. The Friction Problem
**Problem:** Traditional healthcare platforms have high drop-off rates due to complex payment gateways and rigid scheduling.
**Solution:** The **MindSettler Wallet**. By pre-loading credits, users can book a session with a single click during a moment of need, eliminating "transaction anxiety."

### 2. The Ghost Link Problem
**Problem:** Users often get confused about when or where to join their session.
**Solution:** **Smart-Room Logic**. Meeting links are hidden and "Room Locked" until exactly **10 minutes** before the session, providing a clear, stress-free countdown for the user.

### 3. The Deployment Gap
**Problem:** Local development environments (Windows/Mac) often hide bugs that appear only in Linux-based production environments (Vercel/Netlify).
**Solution:** Standardized **Linux-compliant builds**, handling case-sensitive file systems and secure proxy headers.

---

## ✨ Core Features

### 💰 Secure Virtual Wallet System
- **Atomic Transactions:** Backend ensures the wallet balance is debited (₹500/session) simultaneously with the appointment creation.
- **Instant Refunds:** Canceled or rescheduled sessions result in immediate credit reversals to the user's wallet.
- **Transactional Integrity:** No booking can be initiated without a pre-validated balance.

### 📅 Intelligent Therapy Scheduler
- **Time-Aware Filtering:** Automatically hides past time slots for the current day to prevent impossible bookings.
- **Specialized Modalities:** Choose from CBT, DBT, ACT, Schema Therapy, EFT, and more.
- **Touch-Optimized UI:** A mobile-first design with horizontal snap-scrolling for therapy types and high-contrast touch targets for slot selection.

### 🎥 Digital Room "Join" Logic
- **Countdown States:** UI transitions through three states: `Locked` ⮕ `Available Soon` (Admin preparing) ⮕ `Join Now` (Active).
- **Security:** Meeting links are only rendered in the DOM when the 10-minute window is reached.

---

## 🛠️ The "Vercel Hurdles" (Technical Problem Solving)
Deploying a MERN stack project is where the real engineering happens. We solved the following:



* **The Invisible Cookie:** Solved the "Cookie not saving on Vercel" issue by setting `app.set("trust proxy", 1)` and configuring JWT cookies with `SameSite: "None"` and `Secure: true`.
* **Case-Sensitivity Errors:** Fixed build failures caused by the difference between Windows (case-insensitive) and Linux (case-sensitive) by standardizing file naming conventions and forcing Git cache updates via `git rm -r --cached .`.
* **MongoDB Buffering Timeouts:** Resolved `findOne() timeout` errors by whitelisting `0.0.0.0/0` in MongoDB Atlas and implementing robust connection-caching logic for serverless environments.

---

## 🤖 AI Roadmap: The Next Phase
As an **AI Student at SVNIT**, the next version of MindSettler is set to include:
- **AI Sentiment Analysis:** Analyzing user session notes to provide therapists with a "Mood Score" before the meeting.
- **YOLO-Based Emotion Detection:** Tracking facial micro-expressions during sessions to provide therapists with objective data on patient progress.
- **LLM Screening Bot:** A custom chatbot to help users navigate their symptoms and suggest the most effective therapy type (e.g., CBT vs. DBT).

---

## 📂 Project Structure
```text
mindsettler/
├── client/                # React (Vite) + Tailwind CSS
│   ├── src/
│   │   ├── api/          # Axios configurations with withCredentials
│   │   ├── components/   # Responsive Navbar, Success Overlays, Footer
│   │   ├── context/      # Auth & Wallet state management
│   │   └── pages/        # Dynamic Booking, Profile, & Auth Views
├── server/                # Node.js + Express
│   ├── config/           # MongoDB Atlas connection (serverSelectionTimeout)
│   ├── controllers/      # Appointment, Wallet, and JWT Logic
│   ├── models/           # Mongoose schemas (User, Appointment, Availability)
│   └── routes/           # REST API Endpoints