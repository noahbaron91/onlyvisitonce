import { useEffect, useRef } from 'react';

export const useLocalStorageBlocking = () => {
  // Prevents the user from being instantly redirected to Google
  const hasFetchedLocalStorage = useRef(false);

  useEffect(() => {
    if (hasFetchedLocalStorage.current) {
      return;
    }

    hasFetchedLocalStorage.current = true;
    const hasAlreadyVisited = localStorage.getItem('visited');

    if (hasAlreadyVisited) {
      window.location.href = 'https://visited.onlyvisitonce.com';
    }

    localStorage.setItem('visited', '1');
  }, []);
};
