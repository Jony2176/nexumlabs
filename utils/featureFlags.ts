
import { ModuleConfig, ModuleStatus } from '../config/featureFlags';

/**
 * Gets the current date, allowing for an override via environment variable for testing.
 * @returns {Date} The current date or the forced date for testing.
 */
export const getCurrentDate = (): Date => {
  const forcedDate = (import.meta as any)?.env?.VITE_FORCE_DATE;
  if (forcedDate) {
    const date = new Date(forcedDate);
    // Add local timezone offset to treat the string as local time, not UTC
    return new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
  }
  return new Date();
};

/**
 * Determines the dynamic status of a module based on the current date.
 * @param {ModuleConfig} module - The configuration for the module.
 * @param {Date} currentDate - The current date to check against.
 * @returns {ModuleStatus} The calculated status of the module.
 */
export const getModuleStatus = (module: ModuleConfig, currentDate: Date): ModuleStatus => {
  const launchDate = new Date(module.launchDate);
  const revealDate = module.revealDate ? new Date(module.revealDate) : null;
  
  // Developer override to show all products
  if ((import.meta as any)?.env?.VITE_SHOW_ALL_PRODUCTS === 'true') {
      return 'available';
  }

  if (currentDate >= launchDate) {
    return 'available';
  }

  if (revealDate && currentDate >= revealDate) {
    return 'waitlist';
  }

  return module.status;
};


/**
 * Checks if a module is currently available.
 * @param {ModuleConfig} module - The module configuration.
 * @param {Date} [date] - Optional date to check against, defaults to now.
 * @returns {boolean} True if the module is available.
 */
export const isModuleAvailable = (module: ModuleConfig, date?: Date): boolean => {
    const currentDate = date || getCurrentDate();
    return getModuleStatus(module, currentDate) === 'available';
}

/**
 * Calculates the number of days until a module's launch.
 * @param {ModuleConfig} module - The module configuration.
 * @param {Date} [currentDate] - Optional current date.
 * @returns {number | null} Days until launch, or null if not applicable.
 */
export const getDaysUntilLaunch = (module: ModuleConfig, currentDate?: Date): number | null => {
  const now = currentDate || getCurrentDate();
  const launch = new Date(module.launchDate);
  if (launch <= now) return null;

  const diffTime = Math.abs(launch.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Formats a date string into a user-friendly format, e.g., "Enero 2026".
 * @param {string} dateString - The ISO date string.
 * @returns {string} The formatted date.
 */
export const formatLaunchDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR', { month: 'long', year: 'numeric' });
}