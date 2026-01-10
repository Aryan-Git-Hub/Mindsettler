import Navbar from "../components/common/Navbar";
import JourneySection from "../components/journey/journeySection";
import HeroSection from "../components/hero/HeroSection";
import FAQ from "../components/common/FAQ";
import Footer from "../components/common/Footer";
import MindSettlerSection from "../components/common/MindSettlerSection";
import StatsSection from "../components/common/StatsSection";



function Home() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <HeroSection />
      <div class="h-20 bg-linear-to-b from-[#6b5e5a]/30 to-[#f3f1ff]"></div>
      <JourneySection />
      <div class="bg-linear-to-b from-[#f3f1ff] to-[#3F2965]/5"></div>
      <MindSettlerSection />
      <StatsSection />
      <FAQ />
      <Footer/>
    </div>
    </>
  );
}

export default Home;
