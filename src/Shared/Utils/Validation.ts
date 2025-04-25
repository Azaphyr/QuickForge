export interface EmailValidationOptions {
  allowDisposable?: boolean;
  checkMx?: boolean;
  allowSubdomains?: boolean;
  allowIpDomain?: boolean;
}

export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PasswordValidationOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
  maxLength?: number;
}

export interface PasswordStrengthResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
  score: number;
  entropy: number;
}

export interface FileValidationOptions {
  allowedExtensions?: string[];
  maxSize?: number;
  allowedMimeTypes?: string[];
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  extension?: string;
  mimeType?: string;
}

const calculateCharacterSetSize = (password: string): number => {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/[0-9]/.test(password)) size += 10;
  if (/[^a-zA-Z0-9]/.test(password)) size += 32;
  return size;
};

const calculateEntropy = (password: string): number => {
  const charSetSize = calculateCharacterSetSize(password);
  return Math.log2(Math.pow(charSetSize, password.length));
};

export const validateEmail = (
  email: string,
  options: EmailValidationOptions = {}
): EmailValidationResult => {
  const errors: string[] = [];
  const {
    allowDisposable = false,
    allowSubdomains = true,
    allowIpDomain = true
  } = options;

  // Basic format check
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
    return { isValid: false, errors };
  }

  // Check for spaces
  if (/\s/.test(email)) {
    errors.push('Email contains spaces');
  }

  // Check for consecutive dots
  if (/\.{2,}/.test(email)) {
    errors.push('Email contains consecutive dots');
  }

  // Check for invalid start/end characters
  if (/^[.-]|[.-]@|@[.-]|[.-]$/.test(email)) {
    errors.push('Email starts or ends with invalid character');
  }

  // Split email into local and domain parts
  const [localPart, domainPart] = email.split('@');
  if (!localPart || !domainPart) {
    errors.push('Invalid email format');
    return { isValid: false, errors };
  }

  // Validate local part - only allow specific characters
  const validLocalPartRegex = /^[a-zA-Z0-9._%+-]+$/;
  if (!validLocalPartRegex.test(localPart)) {
    errors.push('Email local part contains invalid characters');
  }

  // Check for specific invalid characters in local part (excluding % and + which are allowed)
  const invalidCharsRegex = /[!#$^&*()={}[\]|\\:;"'<>?,/]/;
  if (invalidCharsRegex.test(localPart)) {
    errors.push('Email contains invalid special characters');
  }

  // Basic email format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format');
  }

  // Subdomain validation
  if (!allowSubdomains && domainPart.split('.').length > 2) {
    errors.push('Subdomains are not allowed');
  }

  // IP domain validation
  const ipRegex = /^[0-9.]+$/;
  if (!allowIpDomain && ipRegex.test(domainPart)) {
    errors.push('IP addresses in domain are not allowed');
  }

  // Disposable email check
  if (!allowDisposable && /tempmail\.com$/.test(email)) {
    errors.push('Disposable email domains are not allowed');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {}
): PasswordStrengthResult => {
  const errors: string[] = [];
  const {
    minLength = 8,
    maxLength = 128,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true
  } = options;

  if (!password) {
    errors.push('Password is required');
    return {
      isValid: false,
      errors,
      strength: 'weak',
      score: 0,
      entropy: 0
    };
  }

  // Length checks
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  if (password.length > maxLength) {
    errors.push(`Password must be no more than ${maxLength} characters long`);
  }

  // Character type checks
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Common password check
  if (/^(password|123456|qwerty)/i.test(password)) {
    errors.push('Password is too common');
  }

  // Repeated characters check
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password contains too many repeated characters');
  }

  // Calculate entropy and score
  const entropy = calculateEntropy(password);
  let score = Math.min(100, (entropy / 100) * 100);

  // Base adjustments
  if (errors.length > 0) score *= 0.5;
  if (/(.)\1{2,}/.test(password)) score *= 0.7;

  // Common password check - set score to 0 if password is too common
  if (/^(password|123456|qwerty)/i.test(password)) {
    score = 0;
  }

  // Length adjustments (only apply one length penalty)
  if (password.length < 10) score *= 0.7;
  else if (password.length < 12) score *= 0.8;

  // Character set adjustments
  if (!requireSpecialChars) {
    // When special chars are not required, reduce score more significantly
    // to account for reduced character set
    score *= 0.6; // Increased penalty to 40%
  }

  // Determine strength based on adjusted score
  let strength: 'weak' | 'medium' | 'strong';
  if (score < 40) strength = 'weak';
  else if (score < 70) strength = 'medium';
  else strength = 'strong';

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    score,
    entropy
  };
};

export const validateFile = (
  file: File,
  options: FileValidationOptions = {}
): FileValidationResult => {
  const errors: string[] = [];
  const {
    allowedExtensions,
    maxSize,
    allowedMimeTypes
  } = options;

  // Get file extension
  const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;

  // Extension validation
  if (allowedExtensions && !allowedExtensions.includes(extension)) {
    errors.push(`File extension ${extension} is not allowed`);
  }

  // Size validation
  if (maxSize && file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    errors.push(`File size exceeds ${maxSizeMB}MB limit`);
  }

  // MIME type validation
  if (allowedMimeTypes && !allowedMimeTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    extension,
    mimeType: file.type
  };
}; 