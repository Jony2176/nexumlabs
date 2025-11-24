
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const locale = currency === 'ARS' ? 'es-AR' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'ARS' ? 0 : 2,
    maximumFractionDigits: currency === 'ARS' ? 0 : 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }

  try {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (e) {
    return 'Fecha inválida';
  }
};

export const formatARS = (amount: number, options: { showCurrency?: boolean; abbreviated?: boolean; decimals?: number } = {}): string => {
  const { 
    showCurrency = true, 
    abbreviated = false,
    decimals = 0 
  } = options;
  
  if (abbreviated && amount >= 1000000) {
    const millions = (amount / 1000000).toFixed(1).replace('.', ',');
    return showCurrency ? `$${millions}M` : `${millions}M`;
  }
  
  const formatted = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
  
  return showCurrency ? `$${formatted}` : formatted;
};
