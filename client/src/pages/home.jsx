import Navbar from "../components/common/Navbar";
import JourneySection from "../components/journey/JourneySection";
import HeroSection from "../components/hero/HeroSection";
import FAQ from "../components/common/FAQ";
import Footer from "../components/common/Footer";


function Home() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <HeroSection />
      <div class="h-40 bg-linear-to-b from-[#6b5e5a]/30 to-[#f3f1ff]"></div>
      <JourneySection />
      <div class="h-40 bg-linear-to-b from-[#f3f1ff] to-[#fdfcf8]"></div>
      <FAQ />
      <Footer/>
    </div>
    </>
  );
}

export default Home;
