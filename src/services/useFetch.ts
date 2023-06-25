import { useEffect, useState } from 'react';
const useFetch = (url: string) => {
  const [data, setdata] = useState(null);
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responsePayload) => {
        setdata(responsePayload.data);
        seterror(responsePayload.error);
        setloading(false);
      })
      .catch((error) => {
        seterror(error);
        setloading(false);
      });
  }, [url]);
};
export default useFetch;
