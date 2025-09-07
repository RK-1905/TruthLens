import { type AnalysisResult } from "@shared/schema";

// Storage interface for TruthLens analysis results
export interface IStorage {
  getAnalysisResult(id: string): Promise<AnalysisResult | undefined>;
  storeAnalysisResult(result: AnalysisResult): Promise<void>;
}

export class MemStorage implements IStorage {
  private analysisResults: Map<string, AnalysisResult>;

  constructor() {
    this.analysisResults = new Map();
  }

  async getAnalysisResult(id: string): Promise<AnalysisResult | undefined> {
    return this.analysisResults.get(id);
  }

  async storeAnalysisResult(result: AnalysisResult): Promise<void> {
    this.analysisResults.set(result.id, result);
  }
}

export const storage = new MemStorage();
