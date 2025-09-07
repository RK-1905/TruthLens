import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Upload, Link as LinkIcon, FileText, Loader2 } from "lucide-react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { analyzeContent } from "@/lib/analysis";

export default function Analyze() {
  const [, setLocation] = useLocation();
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if content was passed from the home page
    const savedContent = sessionStorage.getItem("analysisContent");
    const savedType = sessionStorage.getItem("analysisType");
    
    if (savedContent && savedType) {
      if (savedType === "url") {
        setUrlInput(savedContent);
      } else {
        setTextInput(savedContent);
      }
      // Clear from session storage
      sessionStorage.removeItem("analysisContent");
      sessionStorage.removeItem("analysisType");
    }
  }, []);

  const steps = [
    "Preprocessing content...",
    "Extracting entities...",
    "Verifying sources...",
    "Analyzing language patterns...",
    "Calculating credibility score...",
    "Generating report..."
  ];

  const handleAnalyze = async (type: "url" | "text") => {
    const content = type === "url" ? urlInput : textInput;
    
    if (!content.trim()) {
      toast({
        title: "Input Required",
        description: `Please enter ${type === "url" ? "a URL" : "text content"} to analyze.`,
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Simulate analysis process with progress updates
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i]);
        setProgress((i + 1) * (100 / steps.length));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Perform actual analysis
      const result = await analyzeContent({ content, type });
      
      // Navigate to results page with the analysis ID
      setLocation(`/results/${result.id}`);
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
      setCurrentStep("");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="mb-4"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold mb-4">
              Analyze Content for <span className="gradient-text">Misinformation</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Submit a URL or text content to get a comprehensive credibility analysis powered by Google Cloud AI.
            </p>
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card className="mb-8 bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Analyzing Content</h3>
                    <p className="text-sm text-muted-foreground">{currentStep}</p>
                  </div>
                </div>
                <Progress value={progress} className="w-full" data-testid="analysis-progress" />
                <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
              </CardContent>
            </Card>
          )}

          {/* Input Tabs */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Submit Content for Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url" className="flex items-center space-x-2" data-testid="tab-url">
                    <LinkIcon className="w-4 h-4" />
                    <span>URL Analysis</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center space-x-2" data-testid="tab-text">
                    <FileText className="w-4 h-4" />
                    <span>Text Analysis</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Article or Post URL</label>
                      <Input
                        type="url"
                        placeholder="https://example.com/news-article"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="bg-input border-border"
                        disabled={isAnalyzing}
                        data-testid="input-url-analyze"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter the URL of a news article, blog post, or social media post to analyze.
                      </p>
                    </div>
                    <Button
                      onClick={() => handleAnalyze("url")}
                      disabled={isAnalyzing || !urlInput.trim()}
                      className="w-full gradient-bg text-white hover-lift"
                      data-testid="button-analyze-url-page"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Analyze URL
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Text Content</label>
                      <Textarea
                        placeholder="Paste the text content you want to fact-check here..."
                        rows={8}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="bg-input border-border resize-none"
                        disabled={isAnalyzing}
                        data-testid="input-text-analyze"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Paste any text content including news excerpts, social media posts, or claims you want to verify.
                      </p>
                    </div>
                    <Button
                      onClick={() => handleAnalyze("text")}
                      disabled={isAnalyzing || !textInput.trim()}
                      className="w-full gradient-bg text-white hover-lift"
                      data-testid="button-analyze-text-page"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          Analyze Text
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">What We Analyze</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Source credibility and authority</li>
                  <li>• Fact verification against trusted databases</li>
                  <li>• Language patterns and bias detection</li>
                  <li>• Cross-reference with expert consensus</li>
                  <li>• Sentiment and emotional manipulation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Powered by Google Cloud</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Natural Language Processing API</li>
                  <li>• AutoML custom fact-checking models</li>
                  <li>• Search API for source verification</li>
                  <li>• Translation API for multilingual content</li>
                  <li>• Cloud Functions for scalable processing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
