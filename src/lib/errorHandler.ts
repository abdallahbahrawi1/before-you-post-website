export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  // Handle Axios errors
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as { 
      response: { 
        data: { message?: string };
        status: number;
      } 
    };
    
    // More detailed error handling
    const status = axiosError.response.status;
    const message = axiosError.response?.data?.message;
    
    if (status === 401) return 'Please log in again';
    if (status === 403) return 'You do not have permission';
    if (status === 404) return 'Resource not found';
    if (status === 500) return 'Server error occurred';
    
    return message || 'An error occurred';
  }
  
  return 'Network error occurred';
}