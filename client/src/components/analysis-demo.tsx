import { useState, useEffect } from "react";
import { Check, Clock, LoaderPinwheel, TriangleAlert, HelpCircle, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CredibilityGauge from "./credibility-gauge";

export default function AnalysisDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    { icon: Check, label: "Content extraction and preprocessing", completed: true },
    { icon: Check, label: "Entity recognition and fact extraction", completed: true },
    { icon: LoaderPinwheel, label: "Cross-referencing with trusted sources", completed: false, loading: true },
    { icon: Clock, label: "Generating credibility report", completed: false, loading: false },
  ];

  const keyFindings = [
    {
      icon: TriangleAlert,
      type: "Unverified Claims",
      description: "No credible sources found for \"overnight climate solution\"",
      color: "text-destructive"
    },
    {
      icon: HelpCircle,
      type: "Missing Context",
      description: "Article lacks specific details and expert quotes",
      color: "text-chart-4"
    },
    {
      icon: UserX,
      type: "Anonymous Sources",
      description: "Claims based on undisclosed sources",
      color: "text-destructive"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See TruthLens in Action</h2>
          <p className="text-xl text-muted-foreground">Experience our AI-powered fact-checking process</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Content to Analyze</h3>
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4" data-testid="sample-url">
                    <p className="text-sm text-muted-foreground mb-2">Sample Article URL:</p>
                    <p className="font-mono text-sm break-all">https://example-news.com/breaking-news-article</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4" data-testid="extracted-content">
                    <p className="text-sm text-muted-foreground mb-2">Extracted Content:</p>
                    <p className="text-sm leading-relaxed">
                      "Breaking: Revolutionary new technology promises to solve climate change overnight, according to undisclosed sources..."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Steps */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">AI Analysis Process</h3>
                <div className="space-y-3">
                  {analysisSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = step.completed;
                    
                    return (
                      <div key={index} className="flex items-center space-x-3" data-testid={`analysis-step-${index}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isCompleted ? "bg-primary" : isActive ? "bg-primary" : "bg-muted"
                        }`}>
                          <Icon className={`w-3 h-3 ${
                            isCompleted ? "text-primary-foreground" : 
                            isActive ? "text-primary-foreground" : "text-muted-foreground"
                          } ${isActive && step.loading ? "animate-spin" : ""}`} />
                        </div>
                        <span className={`text-sm ${
                          isCompleted ? "text-foreground" : 
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Credibility Score */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Credibility Analysis</h3>

                {/* Main Score */}
                <div className="text-center mb-6">
                  <CredibilityGauge score={35} size="lg" />
                </div>

                {/* Score Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center" data-testid="score-source-authority">
                    <span className="text-sm">Source Authority</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-1/4 h-2 bg-destructive rounded-full"></div>
                      </div>
                      <span className="text-xs w-8">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center" data-testid="score-fact-verification">
                    <span className="text-sm">Fact Verification</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-2/5 h-2 bg-chart-4 rounded-full"></div>
                      </div>
                      <span className="text-xs w-8">40%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center" data-testid="score-language-analysis">
                    <span className="text-sm">Language Analysis</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-1/2 h-2 bg-chart-4 rounded-full"></div>
                      </div>
                      <span className="text-xs w-8">50%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Findings */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Findings</h3>
                <div className="space-y-3">
                  {keyFindings.map((finding, index) => {
                    const Icon = finding.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3" data-testid={`finding-${index}`}>
                        <Icon className={`${finding.color} mt-1 w-4 h-4`} />
                        <div>
                          <p className="text-sm font-medium">{finding.type}</p>
                          <p className="text-xs text-muted-foreground">{finding.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
