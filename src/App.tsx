import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HeroSection from "./sections/herosections";
import StatsSection from "./sections/statssection";
import FeaturesSection from "./sections/featuressection";
import AppSection from "./sections/appsection";
import AboutSection from "./sections/aboutsection";
import TeamSection from "./sections/teamsection";

function App() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 font-sans">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AppSection />
      <AboutSection />
      <TeamSection />
      <Footer />
    </div>
  );
}

export default App;