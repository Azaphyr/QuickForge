/**
 * Common MIME types and their associated file extensions
 */
export const commonMimeTypes: Record<string, string[]> = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'image/svg+xml': ['.svg'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'text/plain': ['.txt'],
  'text/csv': ['.csv'],
  'application/json': ['.json'],
  'application/xml': ['.xml'],
  'application/zip': ['.zip'],
  'application/x-rar-compressed': ['.rar'],
  'application/x-7z-compressed': ['.7z'],
  'application/x-tar': ['.tar'],
  'application/gzip': ['.gz'],
  'video/mp4': ['.mp4'],
  'video/mpeg': ['.mpeg'],
  'video/quicktime': ['.mov'],
  'video/x-msvideo': ['.avi'],
  'video/x-ms-wmv': ['.wmv'],
  'audio/mpeg': ['.mp3'],
  'audio/wav': ['.wav'],
  'audio/ogg': ['.ogg'],
  'audio/aac': ['.aac'],
  'application/x-msdownload': ['.exe'],
  'application/x-shockwave-flash': ['.swf'],
  'application/x-javascript': ['.js'],
  'text/css': ['.css'],
  'text/html': ['.html', '.htm'],
  'application/x-httpd-php': ['.php'],
  'application/x-sh': ['.sh'],
  'application/x-bat': ['.bat'],
  'application/x-csh': ['.csh'],
  'application/x-perl': ['.pl'],
  'application/x-python': ['.py'],
  'application/x-ruby': ['.rb'],
  'application/x-java': ['.java'],
  'application/x-c': ['.c'],
  'application/x-c++': ['.cpp'],
  'application/x-csharp': ['.cs'],
  'application/x-go': ['.go'],
  'application/x-rust': ['.rs'],
  'application/x-swift': ['.swift'],
  'application/x-kotlin': ['.kt'],
  'application/x-scala': ['.scala'],
  'application/x-typescript': ['.ts'],
  'application/x-coffeescript': ['.coffee'],
  'application/x-dart': ['.dart'],
  'application/x-elixir': ['.ex'],
  'application/x-erlang': ['.erl'],
  'application/x-haskell': ['.hs'],
  'application/x-lua': ['.lua'],
  'application/x-matlab': ['.m'],
  'application/x-objective-c': ['.m'],
  'application/x-pascal': ['.pas'],
  'application/x-r': ['.r'],
  'application/x-sql': ['.sql'],
  'application/x-vb': ['.vb'],
  'application/x-yaml': ['.yaml', '.yml'],
  'application/x-toml': ['.toml'],
  'application/x-ini': ['.ini'],
  'application/x-markdown': ['.md'],
  'application/x-asciidoc': ['.adoc'],
  'application/x-restructuredtext': ['.rst'],
  'application/x-tex': ['.tex'],
  'application/x-latex': ['.latex'],
  'application/x-bibtex': ['.bib'],
  'application/x-ris': ['.ris'],
  'application/x-endnote': ['.enw'],
  'application/x-mendeley': ['.ris'],
  'application/x-zotero': ['.ris'],
  'application/x-citavi': ['.ris'],
  'application/x-papers': ['.ris'],
  'application/x-readcube': ['.ris'],
  'application/x-mendeley-desktop': ['.ris'],
  'application/x-zotero-desktop': ['.ris'],
  'application/x-citavi-desktop': ['.ris'],
  'application/x-papers-desktop': ['.ris'],
  'application/x-readcube-desktop': ['.ris']
};

/**
 * Gets the file extensions associated with the given MIME types
 * @param mimeTypes Array of MIME types
 * @returns Array of file extensions
 */
export function getExtensionsForMimeTypes(mimeTypes: string[]): string[] {
  return mimeTypes.reduce((extensions: string[], mimeType) => {
    const typeExtensions = commonMimeTypes[mimeType] || [];
    return [...extensions, ...typeExtensions];
  }, []);
}

/**
 * Gets the MIME type for a given file extension
 * @param extension File extension (with or without dot)
 * @returns MIME type or undefined if not found
 */
export function getMimeTypeForExtension(extension: string): string | undefined {
  const normalizedExtension = extension.startsWith('.') ? extension : `.${extension}`;
  return Object.entries(commonMimeTypes).find(([, extensions]) => 
    extensions.includes(normalizedExtension)
  )?.[0];
}

/**
 * Gets the primary extension for a given MIME type
 * @param mimeType MIME type
 * @returns Primary file extension or undefined if not found
 */
export function getPrimaryExtensionForMimeType(mimeType: string): string | undefined {
  return commonMimeTypes[mimeType]?.[0];
}

/**
 * Gets the file extension from a filename
 * @param filename The filename to get the extension from
 * @returns The file extension with dot (e.g., '.jpg') or empty string if no extension
 */
export function getFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === filename.length - 1) {
    return '';
  }
  return filename.slice(lastDotIndex).toLowerCase();
}

/**
 * Gets the filename without extension
 * @param filename The filename to process
 * @returns The filename without extension
 */
export function getFilenameWithoutExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return filename;
  }
  return filename.slice(0, lastDotIndex);
}

/**
 * Checks if a file extension is valid for a given MIME type
 * @param extension File extension (with or without dot)
 * @param mimeType MIME type to check against
 * @returns True if the extension is valid for the MIME type
 */
export function isExtensionValidForMimeType(extension: string, mimeType: string): boolean {
  const normalizedExtension = extension.startsWith('.') ? extension : `.${extension}`;
  return commonMimeTypes[mimeType]?.includes(normalizedExtension) ?? false;
}

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes File size in bytes
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted file size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YZ'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Checks if a file is an image based on its MIME type
 * @param mimeType The MIME type to check
 * @returns True if the file is an image
 */
export function isImage(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

/**
 * Checks if a file is a document based on its MIME type
 * @param mimeType The MIME type to check
 * @returns True if the file is a document
 */
export function isDocument(mimeType: string): boolean {
  return mimeType.startsWith('application/') && 
    (mimeType.includes('pdf') || 
     mimeType.includes('word') || 
     mimeType.includes('excel') || 
     mimeType.includes('powerpoint') ||
     mimeType.includes('document'));
}

/**
 * Checks if a file is an archive based on its MIME type
 * @param mimeType The MIME type to check
 * @returns True if the file is an archive
 */
export function isArchive(mimeType: string): boolean {
  return mimeType.startsWith('application/') && 
    (mimeType.includes('zip') || 
     mimeType.includes('rar') || 
     mimeType.includes('7z') || 
     mimeType.includes('tar') ||
     mimeType.includes('gzip'));
} 