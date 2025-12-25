import Navbar from "../components/common/Navbar";
import JourneySection from "../components/journey/JourneySection";
import HeroSection from "../components/hero/HeroSection";


function Home() {
  console.log("Home page rendered");
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Navbar />
      <HeroSection />
      <div class="h-40 bg-linear-to-b from-[#6b5e5a]/30 to-[#f3f1ff]"></div>
      <JourneySection />
    </div>
  );
}

export default Home;
