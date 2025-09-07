import { useState } from "react";
import { useLocation } from "wouter";
import { Rocket, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const { toast } = useToast();

  const handleAnalyze = (type: "url" | "text") => {
    const content = type === "url" ? urlInput : textInput;
    
    if (!content.trim()) {
      toast({
        title: "Input Required",
        description: `Please enter ${type === "url" ? "a URL" : "text content"} to analyze.`,
        variant: "destructive",
      });
      return;
    }

    // Store content in sessionStorage for the analyze page
    sessionStorage.setItem("analysisContent", content);
    sessionStorage.setItem("analysisType", type);
    
    setLocation("/analyze");
  };

  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Combat <span className="gradient-text">Misinformation</span><br />
            with AI-Powered Truth Detection
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Leverage Google Cloud AI to instantly verify news articles, social media posts, and online content. 
            Get credibility scores backed by advanced machine learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-bg text-white hover-lift"
              onClick={() => setLocation("/analyze")}
              data-testid="button-start-fact-checking"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Start Fact-Checking
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="hover-lift"
              onClick={() => setLocation("/results")}
              data-testid="button-view-demo"
            >
              <Search className="w-4 h-4 mr-2" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Quick Analysis Input */}
        <Card className="glass-effect max-w-2xl mx-auto mb-16 fade-in">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Quick Analysis</h3>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="url"
                  placeholder="Paste a URL to fact-check..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="pr-16 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="input-url"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-2 gradient-bg text-white hover-lift"
                  onClick={() => handleAnalyze("url")}
                  data-testid="button-analyze-url"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center text-muted-foreground">
                <span>or</span>
              </div>
              <div className="relative">
                <Textarea
                  placeholder="Paste text content to analyze..."
                  rows={3}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  data-testid="input-text"
                />
                <Button
                  size="sm"
                  className="absolute right-2 bottom-2 gradient-bg text-white hover-lift"
                  onClick={() => handleAnalyze("text")}
                  data-testid="button-analyze-text"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
