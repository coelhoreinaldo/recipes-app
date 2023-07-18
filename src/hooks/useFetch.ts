import { useState } from 'react';

function useFetch() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchApi = async (API_URL:string) => {
    try {
      setIsFetching(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      setErrorMessage('404 not found');
      return [];
    } finally {
      setIsFetching(false);
    }
  };

  return {
    isFetching,
    errorMessage,
    fetchApi,
  };
}

export default useFetch;
