import { useState, useEffect } from 'react';

function useGoals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    async function fetchGoals() {
      const response = await fetch('/api/goals/fetch');
      const data = await response.json();
      setGoals(data);
    }

    fetchGoals();
  }, []);

  return goals;
}
export default useGoals;
