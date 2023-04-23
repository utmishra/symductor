import { useState, useEffect } from 'react';
import { Goal } from '../../../types/goals';

function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await fetch('/api/goals/fetch');
        const data = await response.json();
        setGoals(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGoals();
  }, []);

  return { goals, isLoading, error };
}

export default useGoals;
