// src/features/vote-feed/types/types.ts
export type MetricKey = "Clarity" | "Credibility" | "Engagement";
export type Ratings = Partial<Record<MetricKey, number>>; // 1–5

// Request/Post types for vote feed
export interface VoteFeedRequest {
  id: number;
  title: string;
  description: string;
  category: string;
  pointsOffered: number;
  status: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    karma: number;
    avatarUrl?: string;
  };
  featuredImageUrl?: string;
}

// Review submission payload (matches your Review model)
export interface ReviewSubmission {
  requestId: number;
  clarityScore: number;    // 1-5
  credibilityScore: number; // 1-5
  engagementScore: number;  // 1-5
  feedbackTags: string[];   // Selected tags array
  overallFeedback?: string; // Optional custom feedback
}

// API response types
export interface VoteFeedResponse {
  success: boolean;
  data: {
    request: VoteFeedRequest | null;
    hasMore: boolean;
    userKarma: number;
  };
  message?: string;
}

export interface ReviewSubmissionResponse {
  success: boolean;
  data: {
    karmaAwarded: number;
    newKarmaTotal: number;
    reviewId: number;
  };
  message?: string;
}

// Error type for better error handling
export interface ApiError {
  message: string;
  status?: number;
}