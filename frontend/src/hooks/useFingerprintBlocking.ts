import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect, useRef } from 'react';

export const useFingerprintBlocking = () => {
  // Prevents the user from being instantly redirected to Google
  const hasFetchedFingerprintId = useRef(false);

  const getFingerPrint = async () => {
    const fingerprint = await FingerprintJS.load();

    const { visitorId } = await fingerprint.get();

    return visitorId;
  };

  useEffect(() => {
    if (hasFetchedFingerprintId.current) {
      return;
    }

    hasFetchedFingerprintId.current = true;

    getFingerPrint().then((visitorId) => {
      console.log('visitorId', visitorId);
      fetch(`/api/v1/fingerprint?id=${visitorId}`).then((res) => {
        if (res.status === 200) {
          window.location.href = 'https://google.com';
          return;
        }
      });
    });
  }, []);
};
