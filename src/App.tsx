import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import HeroSection from "./sections/herosections";
import StatsSection from "./sections/statssection";
import FeaturesSection from "./sections/featuressection";
import AppSection from "./sections/appsection";
import AboutSection from "./sections/aboutsection";
import TeamSection from "./sections/teamsection";
import Faq from "./sections/faq";


import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Dashboard from "./pages/dashboard"; 
import RecuperarSenha from "./pages/RecuperarSenha";

// Home
function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AppSection />
      <AboutSection />
      <TeamSection />
      <Faq />
      <Footer />
    </>
  );
}

// Rotas
function App() {
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/recuperar-senha" element={<RecuperarSenha />} /> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;