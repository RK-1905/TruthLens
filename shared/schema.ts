import { z } from "zod";

export const analysisInputSchema = z.object({
  content: z.string().min(1, "Content is required"),
  type: z.enum(["url", "text"]),
});

export const credibilityScoreSchema = z.object({
  overall: z.number().min(0).max(100),
  sourceAuthority: z.number().min(0).max(100),
  factVerification: z.number().min(0).max(100),
  languageAnalysis: z.number().min(0).max(100),
});

export const analysisResultSchema = z.object({
  id: z.string(),
  content: z.string(),
  type: z.enum(["url", "text"]),
  credibilityScore: credibilityScoreSchema,
  keyFindings: z.array(z.object({
    type: z.enum(["warning", "error", "info", "success"]),
    title: z.string(),
    description: z.string(),
  })),
  factChecks: z.array(z.object({
    claim: z.string(),
    status: z.enum(["TRUE", "FALSE", "PARTIAL", "UNVERIFIED"]),
    explanation: z.string(),
  })),
  sources: z.array(z.object({
    url: z.string(),
    title: z.string(),
    credibility: z.number().min(0).max(10),
  })),
  analyzedAt: z.date(),
  processingTime: z.number(),
});

export type AnalysisInput = z.infer<typeof analysisInputSchema>;
export type CredibilityScore = z.infer<typeof credibilityScoreSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;
