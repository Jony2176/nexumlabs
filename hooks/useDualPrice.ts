import React, { useState, useEffect } from 'react';
import dollarBlueService from '../services/dollarBlueService';

interface PriceInfo {
    usd: number;
    ars: number;
    formattedUSD: string;
    formattedARS: string;
    dualFormat: string;
}

export const useDualPrice = (usdPrice: number) => {
    const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchPrice = async () => {
            if (typeof usdPrice !== 'number') {
                setIsLoading(false);
                return;
            };
            setIsLoading(true);
            const formatted = await dollarBlueService.formatPrice(usdPrice);
            if (isMounted) {
                setPriceInfo(formatted);
                setIsLoading(false);
            }
        };

        fetchPrice();

        return () => {
            isMounted = false;
        };
    }, [usdPrice]);

    return { priceInfo, isLoading };
};