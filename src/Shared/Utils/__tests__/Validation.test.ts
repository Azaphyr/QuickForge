import { validateEmail, validatePassword, validateFile } from '../Validation';

describe('Validation', () => {
  describe('Email', () => {
    test('validates correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.com',
        'user+tag@example.com',
        'user@sub.domain.com',
        'user@123.123.123.123',
      ];

      validEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    test('rejects invalid email formats', () => {
      const invalidEmails = [
        'plainaddress',
        '@missingusername.com',
        'username@.com',
        '.username@domain.com',
        'username@domain..com',
        'username@domain.com.',
      ];

      invalidEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    test('handles special characters correctly', () => {
      const specialCharEmails = [
        { email: 'user.name+tag@domain.com', shouldBeValid: true },
        { email: 'user!name@domain.com', shouldBeValid: false },
        { email: 'user#name@domain.com', shouldBeValid: false },
        { email: 'user$name@domain.com', shouldBeValid: false },
      ];

      specialCharEmails.forEach(({ email, shouldBeValid }) => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(shouldBeValid);
      });
    });

    test('validates domain formats correctly', () => {
      const domainTests = [
        { email: 'user@domain.com', shouldBeValid: true },
        { email: 'user@sub.domain.com', shouldBeValid: true },
        { email: 'user@domain', shouldBeValid: false },
        { email: 'user@.com', shouldBeValid: false },
      ];

      domainTests.forEach(({ email, shouldBeValid }) => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(shouldBeValid);
      });
    });

    test('respects allowDisposable option', () => {
      const disposableEmail = 'test@tempmail.com';
      
      const defaultResult = validateEmail(disposableEmail);
      expect(defaultResult.isValid).toBe(false);
      expect(defaultResult.errors).toContain('Disposable email domains are not allowed');

      const allowedResult = validateEmail(disposableEmail, { allowDisposable: true });
      expect(allowedResult.isValid).toBe(true);
    });

    test('respects allowSubdomains option', () => {
      const subdomainEmail = 'user@sub.domain.com';
      
      const defaultResult = validateEmail(subdomainEmail);
      expect(defaultResult.isValid).toBe(true);

      const restrictedResult = validateEmail(subdomainEmail, { allowSubdomains: false });
      expect(restrictedResult.isValid).toBe(false);
      expect(restrictedResult.errors).toContain('Subdomains are not allowed');
    });

    test('respects allowIpDomain option', () => {
      const ipDomainEmail = 'user@123.123.123.123';
      
      const defaultResult = validateEmail(ipDomainEmail);
      expect(defaultResult.isValid).toBe(true);

      const restrictedResult = validateEmail(ipDomainEmail, { allowIpDomain: false });
      expect(restrictedResult.isValid).toBe(false);
      expect(restrictedResult.errors).toContain('IP addresses in domain are not allowed');
    });

    test('provides specific error messages', () => {
      const tests = [
        {
          email: 'test@domain..com',
          expectedError: 'Email contains consecutive dots'
        },
        {
          email: 'test@ domain.com',
          expectedError: 'Email contains spaces'
        },
        {
          email: '.test@domain.com',
          expectedError: 'Email starts or ends with invalid character'
        },
      ];

      tests.forEach(({ email, expectedError }) => {
        const result = validateEmail(email);
        expect(result.errors).toContain(expectedError);
      });
    });
  });

  describe('Password', () => {
    test('validates strong passwords', () => {
      const strongPasswords = [
        'StrongP@ss123',
        'C0mpl3x!P@ssw0rd',
        'Sup3r$3cur3P@ssphrase',
      ];

      strongPasswords.forEach(password => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(true);
        expect(result.strength).toBe('strong');
        expect(result.score).toBeGreaterThanOrEqual(70);
      });
    });

    test('identifies weak passwords', () => {
      const weakPasswords = [
        'password',
        '12345678',
        'qwerty123',
        'abcdefgh',
      ];

      weakPasswords.forEach(password => {
        const result = validatePassword(password);
        expect(result.strength).toBe('weak');
        expect(result.score).toBeLessThan(40);
      });
    });

    test('enforces minimum requirements', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
      expect(result.errors).toContain('Password must contain at least one number');
      expect(result.errors).toContain('Password must contain at least one special character');
    });

    test('respects custom options', () => {
      const password = 'SimplePassword123';
      const result = validatePassword(password, {
        minLength: 12,
        requireSpecialChars: false,
        requireUppercase: true,
        requireNumbers: true,
      });

      expect(result.isValid).toBe(true);
      expect(result.strength).toBe('medium');
    });

    test('detects common passwords', () => {
      const result = validatePassword('password');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password is too common');
      expect(result.strength).toBe('weak');
      expect(result.score).toBe(0);
    });

    test('penalizes repeated characters', () => {
      const result = validatePassword('AAAbbb111!!!');
      expect(result.errors).toContain('Password contains too many repeated characters');
    });

    test('rewards password complexity', () => {
      const simpleValid = validatePassword('Simple123!');
      const complexValid = validatePassword('C0mpl3x!P@ssw0rd');
      
      expect(complexValid.score).toBeGreaterThan(simpleValid.score);
    });

    test('handles empty passwords', () => {
      const result = validatePassword('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password is required');
      expect(result.strength).toBe('weak');
      expect(result.score).toBe(0);
    });

    test('enforces maximum length', () => {
      const longPassword = 'a'.repeat(129);
      const result = validatePassword(longPassword);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must be no more than 128 characters long');
    });
  });

  describe('File', () => {
    const createMockFile = (name: string, size: number, type: string): File => {
      const blob = new Blob(['x'.repeat(size)], { type });
      const file = new File([blob], name, { type });
      Object.defineProperty(file, 'size', { value: size });
      return file;
    };

    test('validates allowed extensions', () => {
      const file = createMockFile('test.jpg', 1000, 'image/jpeg');
      const result = validateFile(file, {
        allowedExtensions: ['.jpg', '.png']
      });
      expect(result.isValid).toBe(true);
      expect(result.extension).toBe('.jpg');
    });

    test('rejects disallowed extensions', () => {
      const file = createMockFile('test.exe', 1000, 'application/x-msdownload');
      const result = validateFile(file, {
        allowedExtensions: ['.jpg', '.png']
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File extension .exe is not allowed');
    });

    test('validates file size', () => {
      const file = createMockFile('test.jpg', 4 * 1024 * 1024, 'image/jpeg');
      const result = validateFile(file, {
        maxSize: 5 * 1024 * 1024
      });
      expect(result.isValid).toBe(true);
    });

    test('rejects oversized files', () => {
      const file = createMockFile('test.jpg', 6 * 1024 * 1024, 'image/jpeg');
      const result = validateFile(file, {
        maxSize: 5 * 1024 * 1024
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File size exceeds 5MB limit');
    });

    test('validates MIME types', () => {
      const file = createMockFile('test.jpg', 1000, 'image/jpeg');
      const result = validateFile(file, {
        allowedMimeTypes: ['image/jpeg', 'image/png']
      });
      expect(result.isValid).toBe(true);
      expect(result.mimeType).toBe('image/jpeg');
    });

    test('rejects invalid MIME types', () => {
      const file = createMockFile('test.exe', 1000, 'application/x-msdownload');
      const result = validateFile(file, {
        allowedMimeTypes: ['image/jpeg', 'image/png']
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File type application/x-msdownload is not allowed');
    });
  });
}); 