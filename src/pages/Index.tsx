import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import DecisionTool from "@/components/DecisionTool";
import PersonalityTest from "@/components/PersonalityTest";
import AvoidRegretMode from "@/components/AvoidRegretMode";
import SpinWheel from "@/components/SpinWheel";
import MetricsSection from "@/components/MetricsSection";
import Testimonials from "@/components/Testimonials";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <div id="features"><FeaturesSection /></div>
    <div id="how-it-works"><HowItWorks /></div>
    <DecisionTool />
    <PersonalityTest />
    <AvoidRegretMode />
    <div id="spin-wheel"><SpinWheel /></div>
    <MetricsSection />
    <Testimonials />
    <FooterSection />
  </div>
);

export default Index;
