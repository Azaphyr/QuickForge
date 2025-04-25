# Implement Feature-Based Architecture

## Description
This PR introduces a feature-based architecture pattern to the QuickForge project, organizing the codebase into three main directories: Core, Features, and Shared. This structure provides better scalability, maintainability, and separation of concerns.

## Changes
- Implemented three-layer architecture:
  - Core: Fundamental building blocks (App, routing)
  - Features: Self-contained feature modules (Home, Auth, Dashboard)
  - Shared: Reusable resources (styles)
- Set up React Router for client-side navigation
- Added Tailwind CSS for styling
- Created comprehensive README with architecture documentation

## Technical Details
- Added new directory structure
- Implemented basic routing with React Router
- Set up Tailwind CSS configuration
- Created initial feature components
- Added global styles and CSS reset

## Testing
- [x] Navigation works correctly between routes
- [x] Styles are applied properly
- [x] Components render without errors

## Screenshots
(Add screenshots of the application if available)

## Checklist
- [x] Code follows the project's coding standards
- [x] README has been updated with architecture documentation
- [x] All new files have appropriate TypeScript types
- [x] No console errors or warnings
- [x] All routes are working as expected

## Related Issues
Closes #(issue number if applicable)

## Notes
This architecture sets the foundation for future features and makes it easier to:
- Add new features independently
- Maintain and scale the codebase
- Collaborate between team members
- Reuse components and utilities 

const debouncedSearch = useDebounce(searchTerm, 500); 

const { data, loading, error } = useAxios<User[]>('/api/users');

const { data, loading, error } = useAxios<User[]>('/api/users', {
  params: { page: 1, limit: 10 }
});

const [theme, setTheme] = useLocalStorage('theme', 'light'); 

// Default date format (Dutch/Belgium)
formatDate(new Date()); // "22/04/2024"

// French date format
formatDate(new Date(), {
  locale: 'fr-BE'
}); // "22/04/2024"

// With time
formatDate(new Date(), {
  hour: '2-digit',
  minute: '2-digit'
}); // "22/04/2024 15:30"

// Default EUR formatting (Dutch/Belgium)
formatCurrency(1234.56); // "€ 1.234,56"

// Using helper functions
formatEUR(1234.56); // "€ 1.234,56" (Dutch)
formatEURfr(1234.56); // "1 234,56 €" (French)
formatUSD(1234.56); // "$1,234.56" (US)

// With custom options
formatCurrency(1234.56, {
  minimumFractionDigits: 0
}); // "€ 1.235"

// Using German locale for EUR
formatCurrency(1234.56, {
  locale: 'de-DE'
}); // "1.234,56 €"

// Basic usage
truncateText('Hello World', { maxLength: 5 }); // "Hello..."

// Preserve words
truncateText('Hello World', { 
  maxLength: 8,
  preserveWords: true 
}); // "Hello..."

// Custom ellipsis
truncateText('Hello World', { 
  maxLength: 5,
  ellipsis: ' (more)' 
}); // "Hello (more)" 