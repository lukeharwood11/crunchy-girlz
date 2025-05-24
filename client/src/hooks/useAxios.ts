import { useState, useCallback } from 'react';
import axiosInstance from '../lib/axios';

interface UseAxiosResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (url: string, options?: {
    method?: string;
    data?: any;
    params?: any;
  }) => Promise<void>;
}

function useAxios<T = any>(): UseAxiosResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (url: string, options?: {
    method?: string;
    data?: any;
    params?: any;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance({
        url,
        ...options
      });
      setData(response.data as T);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}

export default useAxios;
