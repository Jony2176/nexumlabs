import React, { useEffect } from 'react';

const COOKIE_NAME = 'nexum_ref';
const COOKIE_DAYS = 30;

export const useReferralTracking = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const refCode = params.get('ref');

    if (refCode) {
      // Set the cookie
      const d = new Date();
      d.setTime(d.getTime() + (COOKIE_DAYS * 24 * 60 * 60 * 1000));
      const expires = "expires=" + d.toUTCString();
      document.cookie = `${COOKIE_NAME}=${refCode};${expires};path=/`;

      // Optional: Clean the URL to remove the ref parameter after capturing
      // This can provide a cleaner user experience.
      // const newUrl = window.location.pathname + window.location.search.replace(/&?ref=[^&]+/, '');
      // window.history.replaceState({}, document.title, newUrl);
    }
  }, []);
};