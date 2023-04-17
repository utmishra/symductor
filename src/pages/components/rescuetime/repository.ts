import useFetch from '@/services/useFetch';

const API_URL = '/api/rescuetime';

export const useRescueTimeData = () => {
  const { data, error } = useFetch(API_URL);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
