import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, Download, Share2, RefreshCw } from "lucide-react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CredibilityGauge from "@/components/credibility-gauge";
import { useToast } from "@/hooks/use-toast";
import { getAnalysisResult } from "@/lib/analysis";
import type { AnalysisResult } from "@shared/schema";

export default function Results() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id?: string }>();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadResult = async () => {
      try {
        if (id) {
          const analysisResult = await getAnalysisResult(id);
          setResult(analysisResult);
        } else {
          // Load demo result if no ID provided
          const demoResult = await getAnalysisResult("demo");
          setResult(demoResult);
        }
      } catch (error) {
        toast({
          title: "Error Loading Results",
          description: "Failed to load analysis results. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [id, toast]);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your analysis report is being prepared for download.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "TruthLens Analysis Result",
        text: `Credibility Score: ${result?.credibilityScore.overall}%`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Analysis result link copied to clipboard.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TRUE": return "bg-chart-3 text-black";
      case "FALSE": return "bg-destructive text-destructive-foreground";
      case "PARTIAL": return "bg-chart-4 text-black";
      case "UNVERIFIED": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getFindingIcon = (type: string) => {
    switch (type) {
      case "warning": return "⚠️";
      case "error": return "❌";
      case "info": return "ℹ️";
      case "success": return "✅";
      default: return "ℹ️";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Loading analysis results...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Analysis Not Found</h1>
              <p className="text-muted-foreground mb-8">The requested analysis could not be found.</p>
              <Button onClick={() => setLocation("/analyze")} data-testid="button-new-analysis">
                Start New Analysis
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setLocation("/analyze")}
              className="mb-4"
              data-testid="button-back-analyze"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Analyze
            </Button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Analysis <span className="gradient-text">Results</span>
                </h1>
                <p className="text-muted-foreground">
                  Analyzed {new Date(result.analyzedAt).toLocaleString()} • Processing time: {result.processingTime}ms
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleShare} data-testid="button-share">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={handleExport} data-testid="button-export">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Credibility Overview */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Credibility Assessment</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                  <CredibilityGauge score={result.credibilityScore.overall} size="lg" />
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-destructive mb-1" data-testid="source-authority-score">
                          {result.credibilityScore.sourceAuthority}%
                        </div>
                        <div className="text-sm text-muted-foreground">Source Authority</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-chart-4 mb-1" data-testid="fact-verification-score">
                          {result.credibilityScore.factVerification}%
                        </div>
                        <div className="text-sm text-muted-foreground">Fact Verification</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-chart-3 mb-1" data-testid="language-analysis-score">
                          {result.credibilityScore.languageAnalysis}%
                        </div>
                        <div className="text-sm text-muted-foreground">Language Analysis</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Summary */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Content Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 space-y-2" data-testid="analyzed-content">
                    <p className="text-sm"><strong>Type:</strong> {result.type.toUpperCase()}</p>
                    <p className="text-sm"><strong>Content:</strong></p>
                    <p className="text-sm bg-background rounded p-3 mt-2 leading-relaxed">
                      {result.content.length > 300 ? `${result.content.substring(0, 300)}...` : result.content}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Fact Checks */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Fact-Check Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.factChecks.map((factCheck, index) => (
                      <div key={index} className="border border-border rounded-lg p-4" data-testid={`fact-check-result-${index}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Claim {index + 1}</span>
                          <Badge className={getStatusColor(factCheck.status)}>
                            {factCheck.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">"{factCheck.claim}"</p>
                        <p className="text-xs text-muted-foreground">{factCheck.explanation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Findings */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Key Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.keyFindings.map((finding, index) => (
                      <div key={index} className="flex items-start space-x-3" data-testid={`key-finding-${index}`}>
                        <span className="text-lg">{getFindingIcon(finding.type)}</span>
                        <div>
                          <p className="text-sm font-medium">{finding.title}</p>
                          <p className="text-xs text-muted-foreground">{finding.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sources */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Verified Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.sources.map((source, index) => (
                      <div key={index} className="space-y-2" data-testid={`source-${index}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate">{source.title}</span>
                          <Badge variant="outline">{source.credibility}/10</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{source.url}</p>
                        {index < result.sources.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full gradient-bg text-white"
                    onClick={() => setLocation("/analyze")}
                    data-testid="button-analyze-new"
                  >
                    Analyze New Content
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleShare}
                    data-testid="button-share-results"
                  >
                    Share Results
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
