class ArgentinaTimeService {
  private timezone: string;

  constructor() {
    this.timezone = 'America/Argentina/Buenos_Aires';
  }

  // Gets the current date and time in Argentina
  now(): string {
    try {
      return new Date().toLocaleString('es-AR', {
        timeZone: this.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      // Fallback for environments that may not support the timezone
      return new Date().toLocaleString('es-AR');
    }
  }

  // Creates a formatted "last update" string
  lastUpdate(): string {
    return `Última actualización: ${this.now()}`;
  }

  // Calculates a future date, e.g., for next billing cycle
  nextBilling(days = 30): string {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);
    try {
      return nextDate.toLocaleDateString('es-AR', {
        timeZone: this.timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
        return nextDate.toLocaleDateString('es-AR');
    }
  }
}

export const argentinaTimeService = new ArgentinaTimeService();
