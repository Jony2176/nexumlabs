import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Subscription } from '../types';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true);
      try {
        // FIX: Replaced direct api.get call with the new api.getSubscription method.
        const response = await api.getSubscription();
        setSubscription(response.data);
      } catch (err) {
        setError('Failed to fetch subscription details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  return { subscription, isLoading, error };
};