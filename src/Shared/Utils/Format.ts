export const formatCurrency = (
  amount: number,
  options: {
    currency?: 'EUR' | 'USD';
    locale?: 'nl-BE' | 'fr-BE' | 'en-US';
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string => {
  const {
    currency = 'EUR',
    locale = 'nl-BE',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  if (isNaN(amount)) {
    throw new Error('Invalid amount provided to formatCurrency');
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

export const formatUSD = (
  amount: number,
  options: Omit<Parameters<typeof formatCurrency>[1], 'currency'> = {}
): string => {
  return formatCurrency(amount, { ...options, currency: 'USD', locale: 'en-US' });
};

export const formatEUR = (
  amount: number,
  options: Omit<Parameters<typeof formatCurrency>[1], 'currency' | 'locale'> = {}
): string => {
  return formatCurrency(amount, { ...options, currency: 'EUR', locale: 'nl-BE' });
};

export const formatEURfr = (
  amount: number,
  options: Omit<Parameters<typeof formatCurrency>[1], 'currency' | 'locale'> = {}
): string => {
  return formatCurrency(amount, { ...options, currency: 'EUR', locale: 'fr-BE' });
};

export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions & {
    locale?: 'nl-BE' | 'fr-BE' | 'en-US';
  } = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    locale: 'nl-BE',
  }
): string => {
  const { locale, ...dateOptions } = options;
  
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      throw new Error('Invalid date provided to formatDate');
    }
    return new Intl.DateTimeFormat(locale, dateOptions).format(d);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

export const truncateText = (
  text: string,
  options: {
    maxLength: number;
    ellipsis?: string;
    preserveWords?: boolean;
  }
): string => {
  const { maxLength, ellipsis = '...', preserveWords = true } = options;

  if (text.length <= maxLength) return text;

  if (preserveWords) {
    // Find the last space before maxLength
    const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
    const truncateAt = lastSpaceIndex === -1 ? maxLength : lastSpaceIndex;
    return `${text.slice(0, truncateAt)}${ellipsis}`;
  }

  return `${text.slice(0, maxLength)}${ellipsis}`;
}; 