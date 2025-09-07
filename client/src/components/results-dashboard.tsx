import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResultsDashboard() {
  const summaryStats = [
    { value: "1,247", label: "Articles Analyzed", color: "text-primary" },
    { value: "89%", label: "Accuracy Rate", color: "text-chart-3" },
    { value: "2.4s", label: "Avg Analysis Time", color: "text-chart-4" },
    { value: "156", label: "Sources Verified", color: "text-accent" },
  ];

  const factChecks = [
    {
      claim: "Technology can reverse climate change overnight",
      status: "FALSE" as const,
      explanation: "No scientific evidence supports instantaneous climate reversal claims.",
      color: "bg-destructive/10 border-destructive/20"
    },
    {
      claim: "New carbon capture methods show promise",
      status: "PARTIAL" as const,
      explanation: "Some research exists, but timeline claims are exaggerated.",
      color: "bg-chart-4/10 border-chart-4/20"
    },
    {
      claim: "CleanTech Corp founded in 2018",
      status: "TRUE" as const,
      explanation: "Company registration and basic facts verified.",
      color: "bg-chart-3/10 border-chart-3/20"
    }
  ];

  const trustIndicators = [
    { label: "Source Credibility", score: 3.2, max: 10, color: "bg-destructive" },
    { label: "Expert Consensus", score: 1.8, max: 10, color: "bg-destructive" },
    { label: "Evidence Quality", score: 4.1, max: 10, color: "bg-chart-4" },
    { label: "Language Analysis", score: 6.7, max: 10, color: "bg-chart-3" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TRUE": return "bg-chart-3 text-black";
      case "FALSE": return "bg-destructive text-destructive-foreground";
      case "PARTIAL": return "bg-chart-4 text-black";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Analysis Reports</h2>
          <p className="text-xl text-muted-foreground">Detailed insights and actionable recommendations</p>
        </div>

        {/* Analysis Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="bg-card border-border hover-lift text-center" data-testid={`stat-${index}`}>
              <CardContent className="p-6">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Report Example */}
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Analysis Report</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">Analyzed: 2 minutes ago</span>
                <Button size="sm" className="bg-primary text-primary-foreground hover-lift" data-testid="button-export-pdf">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Content Overview */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Content Summary</h4>
                  <div className="bg-muted rounded-lg p-4 space-y-2" data-testid="content-summary">
                    <p className="text-sm"><strong>Title:</strong> "Revolutionary Climate Technology Breakthrough Announced"</p>
                    <p className="text-sm"><strong>Source:</strong> example-news.com</p>
                    <p className="text-sm"><strong>Publication Date:</strong> January 15, 2024</p>
                    <p className="text-sm"><strong>Word Count:</strong> 1,247 words</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Fact-Check Results</h4>
                  <div className="space-y-3">
                    {factChecks.map((factCheck, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${factCheck.color}`} data-testid={`fact-check-${index}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            {index === 0 ? "Primary Claim" : index === 1 ? "Supporting Evidence" : "Company Background"}
                          </span>
                          <Badge className={`text-xs ${getStatusColor(factCheck.status)}`}>
                            {factCheck.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">"{factCheck.claim}"</p>
                        <p className="text-xs text-muted-foreground">{factCheck.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4">Trust Indicators</h4>
                  <div className="space-y-4">
                    {trustIndicators.map((indicator, index) => (
                      <div key={index} data-testid={`trust-indicator-${index}`}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{indicator.label}</span>
                          <span>{indicator.score}/{indicator.max}</span>
                        </div>
                        <div className="w-full h-2 bg-background rounded-full">
                          <div 
                            className={`h-2 ${indicator.color} rounded-full`}
                            style={{ width: `${(indicator.score / indicator.max) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4">Google Cloud AI</h4>
                  <div className="space-y-3 text-sm" data-testid="google-cloud-services">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Natural Language API</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>AutoML Models</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                      <span>Search API</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                      <span>Translation API</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
