import { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosError } from 'axios';
import axiosInstance from '../Services/AxiosInstance';

interface AxiosState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

export const useAxios = <T>(
  url: string,
  config?: AxiosRequestConfig
): AxiosState<T> => {
  const [state, setState] = useState<AxiosState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<T>(url, {
          ...config,
          signal: controller.signal,
        });
        setState({ data: response.data, loading: false, error: null });
      } catch (error) {
        if (error instanceof AxiosError) {
          setState({
            data: null,
            loading: false,
            error,
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: new AxiosError('An unexpected error occurred'),
          });
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, config]);

  return state;
}; 