import type { AnalysisInput, AnalysisResult } from "@shared/schema";

// Simulated analysis results storage
const analysisResults = new Map<string, AnalysisResult>();

// Demo analysis result
const demoResult: AnalysisResult = {
  id: "demo",
  content: "Breaking: Revolutionary new technology promises to solve climate change overnight, according to undisclosed sources from CleanTech Corp. The company claims their breakthrough carbon capture method can reverse decades of environmental damage in a matter of hours.",
  type: "text",
  credibilityScore: {
    overall: 35,
    sourceAuthority: 25,
    factVerification: 40,
    languageAnalysis: 67,
  },
  keyFindings: [
    {
      type: "error",
      title: "Unverified Claims",
      description: "No credible sources found for \"overnight climate solution\"",
    },
    {
      type: "warning",
      title: "Missing Context",
      description: "Article lacks specific details and expert quotes",
    },
    {
      type: "error",
      title: "Anonymous Sources",
      description: "Claims based on undisclosed sources",
    },
  ],
  factChecks: [
    {
      claim: "Technology can reverse climate change overnight",
      status: "FALSE",
      explanation: "No scientific evidence supports instantaneous climate reversal claims.",
    },
    {
      claim: "New carbon capture methods show promise",
      status: "PARTIAL",
      explanation: "Some research exists, but timeline claims are exaggerated.",
    },
    {
      claim: "CleanTech Corp founded in 2018",
      status: "TRUE",
      explanation: "Company registration and basic facts verified.",
    },
  ],
  sources: [
    {
      url: "https://climate.gov/news-features/understanding-climate/climate-change-carbon-capture",
      title: "Climate.gov - Carbon Capture Technologies",
      credibility: 9.2,
    },
    {
      url: "https://ipcc.ch/reports/",
      title: "IPCC Climate Change Reports",
      credibility: 9.8,
    },
    {
      url: "https://example-news.com/breaking-news",
      title: "Original Article Source",
      credibility: 3.1,
    },
  ],
  analyzedAt: new Date(),
  processingTime: 2340,
};

// Initialize with demo result
analysisResults.set("demo", demoResult);

export async function analyzeContent(input: AnalysisInput): Promise<AnalysisResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate a unique ID for this analysis
  const id = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Generate mock credibility scores based on content characteristics
  const contentLength = input.content.length;
  const hasUrls = /https?:\/\//.test(input.content);
  const hasExclamations = /!/.test(input.content);
  const hasNumbers = /\d/.test(input.content);

  // Simple heuristics for demo purposes
  let baseScore = 70;
  if (hasExclamations) baseScore -= 15; // Sensational language
  if (!hasUrls && input.type === "text") baseScore -= 10; // No source links
  if (contentLength < 100) baseScore -= 20; // Too short
  if (input.content.toLowerCase().includes("breaking") || 
      input.content.toLowerCase().includes("overnight") ||
      input.content.toLowerCase().includes("revolutionary")) {
    baseScore -= 25; // Sensational claims
  }

  const overall = Math.max(15, Math.min(95, baseScore + Math.random() * 20 - 10));
  const sourceAuthority = Math.max(10, overall - 20 + Math.random() * 15);
  const factVerification = Math.max(15, overall - 10 + Math.random() * 20);
  const languageAnalysis = Math.max(20, overall + 10 + Math.random() * 15);

  const result: AnalysisResult = {
    id,
    content: input.content,
    type: input.type,
    credibilityScore: {
      overall: Math.round(overall),
      sourceAuthority: Math.round(sourceAuthority),
      factVerification: Math.round(factVerification),
      languageAnalysis: Math.round(languageAnalysis),
    },
    keyFindings: generateKeyFindings(input.content, overall),
    factChecks: generateFactChecks(input.content),
    sources: generateSources(input.type, input.content),
    analyzedAt: new Date(),
    processingTime: 1500 + Math.random() * 2000,
  };

  // Store the result
  analysisResults.set(id, result);

  return result;
}

export async function getAnalysisResult(id: string): Promise<AnalysisResult | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return analysisResults.get(id) || null;
}

function generateKeyFindings(content: string, score: number): AnalysisResult["keyFindings"] {
  const findings: AnalysisResult["keyFindings"] = [];

  if (score < 50) {
    findings.push({
      type: "error",
      title: "Low Credibility Score",
      description: "Content shows multiple indicators of potential misinformation",
    });
  }

  if (content.toLowerCase().includes("breaking") || content.toLowerCase().includes("urgent")) {
    findings.push({
      type: "warning",
      title: "Sensational Language",
      description: "Use of urgent or breaking news language without verification",
    });
  }

  if (!content.includes("http") && content.length > 200) {
    findings.push({
      type: "info",
      title: "Missing Source Links",
      description: "No external sources or references provided",
    });
  }

  if (score > 70) {
    findings.push({
      type: "success",
      title: "Good Language Patterns",
      description: "Content shows neutral, factual language patterns",
    });
  }

  return findings;
}

function generateFactChecks(content: string): AnalysisResult["factChecks"] {
  const factChecks: AnalysisResult["factChecks"] = [];

  // Extract potential claims (simplified)
  const sentences = content.split('.').filter(s => s.trim().length > 20);
  
  sentences.slice(0, 3).forEach((sentence, index) => {
    const claim = sentence.trim();
    let status: "TRUE" | "FALSE" | "PARTIAL" | "UNVERIFIED" = "UNVERIFIED";
    let explanation = "Unable to verify this claim with available sources.";

    // Simple heuristics for demo
    if (claim.toLowerCase().includes("overnight") || claim.toLowerCase().includes("instantly")) {
      status = "FALSE";
      explanation = "Claims of instant or overnight solutions are typically unfounded.";
    } else if (claim.toLowerCase().includes("research") || claim.toLowerCase().includes("study")) {
      status = "PARTIAL";
      explanation = "Some research exists but may not support all claims made.";
    } else if (claim.toLowerCase().includes("company") || claim.toLowerCase().includes("founded")) {
      status = "TRUE";
      explanation = "Basic factual information verified through public records.";
    }

    factChecks.push({ claim, status, explanation });
  });

  return factChecks;
}

function generateSources(type: string, content: string): AnalysisResult["sources"] {
  const sources: AnalysisResult["sources"] = [
    {
      url: "https://www.reuters.com/fact-check/",
      title: "Reuters Fact Check Database",
      credibility: 9.1,
    },
    {
      url: "https://www.snopes.com/",
      title: "Snopes Fact-Checking",
      credibility: 8.7,
    },
  ];

  if (type === "url") {
    sources.unshift({
      url: content,
      title: "Original Source",
      credibility: Math.random() * 5 + 3, // 3-8 range
    });
  }

  // Add domain-specific sources based on content
  if (content.toLowerCase().includes("climate")) {
    sources.push({
      url: "https://climate.gov/",
      title: "Climate.gov Official Resource",
      credibility: 9.5,
    });
  }

  if (content.toLowerCase().includes("health")) {
    sources.push({
      url: "https://www.who.int/",
      title: "World Health Organization",
      credibility: 9.3,
    });
  }

  return sources;
}
