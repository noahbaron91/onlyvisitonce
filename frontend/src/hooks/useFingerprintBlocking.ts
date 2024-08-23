import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect } from 'react';

export const useFingerprintBlocking = () => {
  const getFingerPrint = async () => {
    const fingerprint = await FingerprintJS.load();

    const { visitorId } = await fingerprint.get();

    return visitorId;
  };

  useEffect(() => {
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
