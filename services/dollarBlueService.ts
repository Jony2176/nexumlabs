class DollarBlueService {
  private cache: { rate: any; timestamp: number } | null = null;

  async getCurrentRate() {
    // Cache the rate for 5 minutes to avoid excessive API calls
    if (this.cache && (Date.now() - this.cache.timestamp < 5 * 60 * 1000)) {
        return this.cache.rate;
    }

    try {
      // Free API for Argentinian dollar rates
      const response = await fetch('https://dolarapi.com/v1/dolares/blue');
      if (!response.ok) throw new Error('API response not OK');
      const data = await response.json();
      
      const rate = {
        buy: data.compra,
        sell: data.venta,
        average: (data.compra + data.venta) / 2,
        lastUpdate: data.fechaActualizacion,
      };
      
      this.cache = { rate, timestamp: Date.now() };
      return rate;
    } catch (error) {
      console.error('Error fetching dollar rate:', error);
      // Fallback rate if the API fails, as requested
      return { buy: 1200, sell: 1245, average: 1222.5, lastUpdate: new Date().toISOString() };
    }
  }

  // Convert USD to ARS using the "sell" value of the blue dollar rate
  async convertToARS(usdAmount: number): Promise<number> {
    const rate = await this.getCurrentRate();
    return usdAmount * rate.sell;
  }

  // Format price into a comprehensive object with USD, ARS, and formatted strings
  async formatPrice(usdPrice: number) {
    const arsPrice = await this.convertToARS(usdPrice);
    // Round to the nearest 500 for a cleaner display
    const roundedArsPrice = Math.round(arsPrice / 500) * 500;
    return {
      usd: usdPrice,
      ars: roundedArsPrice,
      formattedUSD: `$${usdPrice.toLocaleString('en-US')}`,
      // Use es-AR for correct Argentinian formatting with '.' as thousands separator
      formattedARS: `$${roundedArsPrice.toLocaleString('es-AR')}`,
      dualFormat: `$${usdPrice.toLocaleString('en-US')} USD (~$${roundedArsPrice.toLocaleString('es-AR')} ARS)`
    };
  }
}

const dollarBlueService = new DollarBlueService();
export default dollarBlueService;