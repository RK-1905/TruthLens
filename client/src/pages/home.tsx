import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import AnalysisDemo from "@/components/analysis-demo";
import ResultsDashboard from "@/components/results-dashboard";
import GoogleCloudSection from "@/components/google-cloud-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AnalysisDemo />
        <ResultsDashboard />
        <GoogleCloudSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
