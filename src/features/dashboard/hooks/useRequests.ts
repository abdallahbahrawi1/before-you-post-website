import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Request } from '@/types/types';

export const useRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/my-requests');
      const data = response.data as { requests: Request[] };
      setRequests(data.requests || []);
    } catch (err) {
      setError('Failed to fetch requests');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const deleteRequest = async (id: number) => {
    try {
      await api.delete(`/api/requests/${id}`);
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (err) {
      console.error('Error deleting request:', err);
      throw err;
    }
  };

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
    deleteRequest,
  };
};