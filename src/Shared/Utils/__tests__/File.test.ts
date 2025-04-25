import {
  commonMimeTypes,
  getExtensionsForMimeTypes,
  getMimeTypeForExtension,
  getPrimaryExtensionForMimeType,
  getFileExtension,
  getFilenameWithoutExtension,
  isExtensionValidForMimeType,
  formatFileSize,
  isImage,
  isDocument,
  isArchive
} from '../File';

describe('File Utilities', () => {
  describe('MIME Type Mapping', () => {
    test('commonMimeTypes should contain common MIME types', () => {
      expect(commonMimeTypes['image/jpeg']).toEqual(['.jpg', '.jpeg']);
      expect(commonMimeTypes['image/png']).toEqual(['.png']);
      expect(commonMimeTypes['application/pdf']).toEqual(['.pdf']);
    });

    test('getExtensionsForMimeTypes should return correct extensions', () => {
      const extensions = getExtensionsForMimeTypes(['image/jpeg', 'image/png']);
      expect(extensions).toEqual(['.jpg', '.jpeg', '.png']);
    });

    test('getExtensionsForMimeTypes should handle unknown MIME types', () => {
      const extensions = getExtensionsForMimeTypes(['unknown/mimetype']);
      expect(extensions).toEqual([]);
    });

    test('getMimeTypeForExtension should return correct MIME type', () => {
      expect(getMimeTypeForExtension('.jpg')).toBe('image/jpeg');
      expect(getMimeTypeForExtension('jpg')).toBe('image/jpeg');
      expect(getMimeTypeForExtension('.png')).toBe('image/png');
    });

    test('getMimeTypeForExtension should handle unknown extensions', () => {
      expect(getMimeTypeForExtension('.unknown')).toBeUndefined();
    });

    test('getPrimaryExtensionForMimeType should return primary extension', () => {
      expect(getPrimaryExtensionForMimeType('image/jpeg')).toBe('.jpg');
      expect(getPrimaryExtensionForMimeType('image/png')).toBe('.png');
    });

    test('getPrimaryExtensionForMimeType should handle unknown MIME types', () => {
      expect(getPrimaryExtensionForMimeType('unknown/mimetype')).toBeUndefined();
    });
  });

  describe('File Name Utilities', () => {
    test('getFileExtension should return correct extension', () => {
      expect(getFileExtension('test.jpg')).toBe('.jpg');
      expect(getFileExtension('test.JPG')).toBe('.jpg');
      expect(getFileExtension('test')).toBe('');
      expect(getFileExtension('test.')).toBe('');
    });

    test('getFilenameWithoutExtension should remove extension', () => {
      expect(getFilenameWithoutExtension('test.jpg')).toBe('test');
      expect(getFilenameWithoutExtension('test')).toBe('test');
      expect(getFilenameWithoutExtension('test.')).toBe('test');
    });
  });

  describe('File Type Validation', () => {
    test('isExtensionValidForMimeType should validate extensions', () => {
      expect(isExtensionValidForMimeType('.jpg', 'image/jpeg')).toBe(true);
      expect(isExtensionValidForMimeType('jpg', 'image/jpeg')).toBe(true);
      expect(isExtensionValidForMimeType('.png', 'image/jpeg')).toBe(false);
      expect(isExtensionValidForMimeType('.unknown', 'image/jpeg')).toBe(false);
    });

    test('isImage should detect image MIME types', () => {
      expect(isImage('image/jpeg')).toBe(true);
      expect(isImage('image/png')).toBe(true);
      expect(isImage('application/pdf')).toBe(false);
    });

    test('isDocument should detect document MIME types', () => {
      expect(isDocument('application/pdf')).toBe(true);
      expect(isDocument('application/msword')).toBe(true);
      expect(isDocument('application/vnd.ms-excel')).toBe(true);
      expect(isDocument('image/jpeg')).toBe(false);
    });

    test('isArchive should detect archive MIME types', () => {
      expect(isArchive('application/zip')).toBe(true);
      expect(isArchive('application/x-rar-compressed')).toBe(true);
      expect(isArchive('application/x-7z-compressed')).toBe(true);
      expect(isArchive('image/jpeg')).toBe(false);
    });
  });

  describe('File Size Formatting', () => {
    test('formatFileSize should format sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
      expect(formatFileSize(1500, 1)).toBe('1.5 KB');
    });
  });
}); 