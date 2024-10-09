import { useEffect, useRef } from 'react';

export const useLocalStorageBlocking = () => {
  // Prevents the user from being checked on every render
  const hasFetchedLocalStorage = useRef(false);

  useEffect(() => {
    if (hasFetchedLocalStorage.current) {
      return;
    }

    hasFetchedLocalStorage.current = true;
    const hasAlreadyVisited = localStorage.getItem('visited');

    if (hasAlreadyVisited) {
      const subdomain = window.location.origin.split('.')[0];
      if (subdomain.includes('bypass')) return;

      window.location.href = 'https://visited.onlyvisitonce.com';
    }

    localStorage.setItem('visited', '1');
  }, []);
};
