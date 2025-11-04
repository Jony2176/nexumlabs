
class DollarBlueService {
  private cache: { rate: any; timestamp: number } | null = null;
  private publicApiUrl = 'https://dolarapi.com/v1/dolares/blue';

  async getCurrentRate() {
    // Cache the rate for 5 minutes to avoid excessive API calls
    if (this.cache && (Date.now() - this.cache.timestamp < 5 * 60 * 1000)) {
        return this.cache.rate;
    }

    try {
      const response = await fetch(this.publicApiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch from public API. Status: ${response.status}`);
      }
      const data = await response.json();
      
      if (!data || !data.venta || !data.compra) {
          throw new Error('Invalid data format from public dollar API.');
      }

      const rate = {
        buy: data.compra,
        sell: data.venta,
        average: (data.compra + data.venta) / 2,
        lastUpdate: data.fechaActualizacion,
      };
      
      this.cache = { rate, timestamp: Date.now() };
      return rate;
    } catch (error) {
      console.error('Error fetching dollar rate from public API:', error);
      // Fallback rate if the API fails
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
