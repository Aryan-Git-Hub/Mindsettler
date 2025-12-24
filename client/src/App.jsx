import React from 'react';
import JourneySection from './components/journey/JourneySection.jsx'; // Adjust path if needed
// import Home from './pages/home.jsx';
// Import other parts of your layout
// import Navbar from './components/navigation/Navbar';
// import Footer from './components/navigation/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* 1. Navigation */}
      {/* <Navbar /> */}

      <main>
        {/* 2. Hero Section (You can create this next) */}
        <section className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-6xl font-serif text-slate-900 mb-6">MindSettler</h1>
            <p className="text-xl text-slate-600 max-w-lg mx-auto">
              Your safe space for psycho-education and mental well-being.
            </p>
          </div>
        </section>
        
        {/* 3. The Animated Journey Section */}
        <JourneySection />

        {/* 4. Other sections like About, Services, etc. */}
      </main>
      
      {/* 5. Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;