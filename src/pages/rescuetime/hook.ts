import useFetch from '@/services/useFetch';

const RESCUETIME_SCORE_API_URL = '/api/rescuetime/productivity-score';
const RESCUETIME_ACTIVITIES_API_URL = '/api/rescuetime/activities';

export const useRescueTimeData = (type: 'score' | 'activities') => {
  if (!type) {
    return {
      data: null,
      isLoading: true,
      isError: '',
    };
  }
  const { data, error } = useFetch(type === 'score' ? RESCUETIME_SCORE_API_URL : RESCUETIME_ACTIVITIES_API_URL);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
