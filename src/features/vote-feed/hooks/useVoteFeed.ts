// src/features/vote-feed/hooks/useVoteFeed.ts
"use client";
import { useState, useCallback } from 'react';
import api from '@/lib/api';
import type {
  VoteFeedRequest,
  ReviewSubmission,
  VoteFeedResponse,
  ReviewSubmissionResponse,
} from '../types/types';

interface UseVoteFeedState {
  currentRequest: VoteFeedRequest | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  hasMore: boolean;
}

interface UseVoteFeedReturn extends UseVoteFeedState {
  fetchNextRequest: () => Promise<void>;
  submitReview: (reviewData: ReviewSubmission) => Promise<boolean>;
  skipRequest: () => Promise<void>;
  clearError: () => void;
}

export function useVoteFeed(): UseVoteFeedReturn {
  const [state, setState] = useState<UseVoteFeedState>({
    currentRequest: null,
    isLoading: false,
    isSubmitting: false,
    error: null,
    hasMore: true,
  });

  // Fetch next request from API
  const fetchNextRequest = useCallback(async () => {
    if (!state.hasMore) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await api.get<VoteFeedResponse>('/api/reviews/feed');
      console.log('Fetched next request:', response.data);
      if (response.data.success) {
        setState(prev => ({
          ...prev,
          currentRequest: response.data.data.request,
          hasMore: response.data.data.hasMore,
          isLoading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: response.data.message || 'Failed to fetch request',
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error fetching vote feed:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to load next request';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, [state.hasMore]);

  // Submit review and fetch next request
  const submitReview = useCallback(async (reviewData: ReviewSubmission): Promise<boolean> => {
    // Prevent submitting if there's no current request
    if (!state.currentRequest) {
      setState(prev => ({
        ...prev,
        error: 'No post to review.',
        isSubmitting: false,
      }));
      return false;
    }

    setState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const response = await api.post<ReviewSubmissionResponse>('/api/reviews', {
        requestId: reviewData.requestId,
        clarityScore: reviewData.clarityScore,
        credibilityScore: reviewData.credibilityScore,
        engagementScore: reviewData.engagementScore,
        feedbackTags: reviewData.feedbackTags,
        overallFeedback: reviewData.overallFeedback,
      });

      if (response.data.success) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          currentRequest: null,
        }));

        // Fetch next request automatically
        await fetchNextRequest();
        return true;
      } else {
        setState(prev => ({
          ...prev,
          error: response.data.message || 'Failed to submit review',
          isSubmitting: false,
        }));
        return false;
      }
    } catch (error) {
      console.error('Error submitting review:', error);

      // Better error handling for API errors
      let errorMessage = 'Failed to submit review';
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response: { status: number; data?: { message?: string } } };
        
        if (apiError.response.data?.message?.includes('already reviewed')) {
          console.log('Request already reviewed, fetching next...');
          setState(prev => ({ ...prev, isSubmitting: false }));
          await fetchNextRequest(); // Skip to next request
          return true; // Treat as success since we're moving forward
        }
        
        if (apiError.response.status === 404) {
          errorMessage = 'Review service not available. Please try again later.';
        } else if (apiError.response.status === 401) {
          errorMessage = 'Please log in to submit reviews.';
        } else if (apiError.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      }

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isSubmitting: false,
      }));
      return false;
    }
  }, [fetchNextRequest, state.currentRequest]);

  // Skip current request and fetch next
  const skipRequest = useCallback(async () => {
    await fetchNextRequest();
  }, [fetchNextRequest]);

  // Clear error message
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    fetchNextRequest,
    submitReview,
    skipRequest,
    clearError,
  };
}