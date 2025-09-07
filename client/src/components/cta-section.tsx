import { useLocation } from "wouter";
import { Rocket, Github } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CTASection() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Combat Misinformation?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join the fight against fake news with AI-powered fact-checking
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="gradient-bg text-white hover-lift text-lg"
            onClick={() => setLocation("/analyze")}
            data-testid="button-start-free-analysis"
          >
            <Rocket className="w-5 h-5 mr-3" />
            Start Free Analysis
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-card border-border text-foreground hover-lift text-lg"
            onClick={() => window.open("https://github.com", "_blank")}
            data-testid="button-view-github"
          >
            <Github className="w-5 h-5 mr-3" />
            View on GitHub
          </Button>
        </div>

        {/* Hackathon Badge */}
        <Badge 
          variant="secondary" 
          className="inline-flex items-center space-x-3 bg-card border-border px-6 py-3 text-sm font-medium"
          data-testid="hackathon-badge"
        >
          <SiGoogle className="text-primary text-xl" />
          <span>Built for Google Gen AI Exchange Hackathon 2024</span>
        </Badge>
      </div>
    </section>
  );
}
