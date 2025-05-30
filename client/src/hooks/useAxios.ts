import { useState, useCallback } from 'react';
import axiosInstance from '../lib/axios';
import { useAuth } from './useAuth';

interface UseAxiosResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (url: string, options?: {
    method?: string;
    data?: any;
    params?: any;
    headers?: Record<string, string>;
  }) => Promise<T | null>;
}

function useAxios<T = any>(): UseAxiosResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { accessToken } = useAuth();

  const execute = useCallback(async (url: string, options?: {
    method?: string;
    data?: any;
    params?: any;
    headers?: Record<string, string>;
  }): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      // Prepare headers with authentication
      const headers = {
        ...options?.headers,
      };
      
      // Add authorization header if we have an access token
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      
      const response = await axiosInstance({
        url,
        method: options?.method || 'GET',
        data: options?.data,
        params: options?.params,
        headers,
      });
      
      const responseData = response.data as T;
      setData(responseData);
      return responseData;
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  return { data, loading, error, execute };
}

export default useAxios;
