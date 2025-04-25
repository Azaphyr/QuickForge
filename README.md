# QuickForge

QuickForge is a modern, feature-rich React starter template built with TypeScript and Vite. It provides a solid foundation for building scalable frontend applications with best practices, security, and performance in mind.

## 📚 Documentation

- [Development Guidelines](docs/DEVELOPMENT.md) - Comprehensive guide for development practices
- [Pull Request Template](PR_TEMPLATE.md) - Template for creating pull requests

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Azaphyr/QuickForge.git
cd QuickForge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## ✨ Features

- ⚡ **Modern Stack**
  - React 19 with Concurrent Features
  - TypeScript for type safety
  - Vite for fast development and building
  - Tailwind CSS for styling
  - PostCSS for CSS processing

- 🔒 **Authentication** (✅ Implemented)
  - Context-based authentication
  - Protected routes
  - Token management
  - Secure session handling

- 📊 **Dashboard** (🚧 In Progress)
  - Basic layout implemented
  - Components structure in place
  - Services and hooks directories created

- 📈 **Analytics** (🚧 In Progress)
  - Directory structure created
  - Components, Services, and Hooks directories ready
  - Implementation pending

- 📦 **Project Structure**
  - Feature-based architecture
  - Shared resources
  - Core application modules
  - Clear separation of concerns

- 🛠️ **Development Tools**
  - ESLint for code linting
  - Prettier for code formatting
  - Jest for testing
  - TypeScript strict mode
  - Hot Module Replacement

## 📁 Project Structure

```
src/
├── Assets/            # Static assets
│    ├── Images/        # Image files
│    ├── Fonts/         # Font files
│    ├── Icons/         # Icon files
│    └── Styles/        # Global styles
├── Core/                # Core application modules
│   ├── API/            # API configuration and services
│   ├── App/            # Main application setup
│   ├── Authentication/ # Core authentication logic
│   ├── Profile/        # User profile management
│   └── routes.tsx      # Application routing configuration
│
├── Features/           # Feature modules
│   ├── Auth/          # Authentication feature (Implemented)
│   │   ├── Login.tsx
│   │   ├── Callback.tsx
│   │   ├── Logout.tsx
│   │   ├── Auth.tsx
│   │   └── __tests__/
│   │
│   ├── Dashboard/     # Dashboard feature (In Progress)
│   │   ├── Dashboard.tsx
│   │   ├── Components/
│   │   ├── Services/
│   │   └── Hooks/
│   │
│   ├── Analytics/     # Analytics feature (In Progress)
│   │   ├── Components/
│   │   ├── Services/
│   │   └── Hooks/
│   │
│   └── Home/          # Home page feature
│
├── Shared/            # Shared resources
│   ├── Components/    # Shared components
│   ├── Contexts/      # React contexts
│   ├── Hooks/         # Shared hooks
│   ├── Services/      # Shared services
│   ├── Types/         # TypeScript types
│   ├── Utils/         # Utility functions
│   ├── Styles/        # Global styles
│   └── Config/        # Configuration files
│
├── main.tsx          # Application entry point
└── vite-env.d.ts     # Vite environment types

# Configuration Files
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore rules
├── .prettierrc       # Prettier configuration
├── jest.config.js    # Jest configuration
├── jest.setup.js     # Jest setup
├── postcss.config.js # PostCSS configuration
├── tailwind.config.js # Tailwind configuration
├── tsconfig.json     # TypeScript configuration
├── tsconfig.node.json # Node TypeScript configuration
├── tsconfig.app.json # App TypeScript configuration
├── vite.config.ts    # Vite configuration
└── eslint.config.js  # ESLint configuration
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_APP_ENV=development|production
```

## 🧪 Testing

The project uses Jest and React Testing Library for testing. Test files are co-located with their components.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Dependencies

### Core Dependencies
- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

### Development Dependencies
- ESLint
- Prettier
- Jest
- Testing Library
- PostCSS
- TypeScript types

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path aliases configured
- React JSX support
- Jest types included

### Vite
- React plugin
- Hot Module Replacement
- Build optimization

### ESLint
- React hooks rules
- TypeScript support
- Prettier integration

## 📝 Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Write comprehensive tests
- Document complex logic

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request using the provided template

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Team
- Vite Team
- TypeScript Team
- All contributors

## Project Architecture

### Core
Contains the fundamental building blocks of the application:
- Main application component
- Routing configuration
- Global styles and themes
- Environment configuration
- Error boundaries
- Performance monitoring
- Internationalization setup

### Features
Self-contained feature modules that implement specific functionality:
- Auth: Authentication and authorization
- Home: Landing page and welcome screen
- Dashboard: Main interface with data visualization
- Analytics: Data processing and reporting
- Each feature has its own:
  - Components
  - Services
  - Hooks
  - Tests
  - Types
  - Error handling
  - Loading states
  - Data validation

### Shared
Reusable resources used across features:
- Components: Reusable UI components with accessibility support
- Contexts: React context providers (e.g., AuthContext)
- Hooks: Custom React hooks for common functionality
- Styles: Global styles, themes, and design tokens
- Types: TypeScript type definitions and interfaces
- Utils: Utility functions and helpers
- Error handling utilities
- Performance monitoring tools

## Testing

The project uses Jest and React Testing Library for comprehensive testing. Test files are co-located with their components in `__tests__` directories.

### Test Structure
- Component tests: UI and interaction testing
- Context tests: State management testing
- Hook tests: Custom hook functionality
- Integration tests: Feature interaction testing
- Performance tests: Load time and responsiveness
- Accessibility tests: ARIA compliance
- Mock implementations for external services

### Testing Best Practices
- Test-driven development (TDD) approach
- Comprehensive coverage for critical paths
- Mock external dependencies
- Test both success and error scenarios
- Use React Testing Library for component testing
- Accessibility testing with jest-axe
- Performance testing with Lighthouse
- End-to-end testing with Cypress

## Security

### ✅ Implemented
- Environment variables for sensitive data
  - API URL configuration
  - OAuth client IDs
  - Logging configuration
- Secure session management
  - Token-based authentication
  - Local storage for session data
  - Token refresh mechanism
- Input validation
  - Email validation with configurable rules
  - Password strength validation
  - File upload validation
  - Form data validation

### 🚧 In Progress
- CORS configuration
- Content Security Policy (CSP)
- XSS protection
- CSRF protection
- Rate limiting
- Output encoding

### Error Handling
- Global error boundaries
- Error logging and monitoring
- User-friendly error messages
- Error reporting tools
- Performance monitoring
- Security incident response

## Accessibility

### ✅ Implemented
- Basic ARIA attributes
  - Role attributes in components
  - Alt text for images
  - Basic form labels
- Focus management
  - Focus rings for interactive elements
  - Basic keyboard navigation
  - Tab index handling
- Color contrast
  - Tailwind CSS color palette
  - Basic contrast ratios

### 🚧 In Progress
- WCAG 2.1 AA compliance
- Comprehensive ARIA patterns
- Advanced keyboard navigation
- Screen reader optimization
- Form validation feedback
- Error messaging accessibility
- Accessibility testing
  - jest-axe integration
  - Lighthouse audits
  - Screen reader testing
  - Keyboard navigation testing
  - Color contrast checking

## Internationalization

### ✅ Implemented
- Basic number formatting
  - Currency formatting (EUR, USD)
  - Locale support (nl-BE, fr-BE, en-US)
  - Decimal places control
- Date formatting
  - Multiple locale support
  - Custom date format options
  - Error handling for invalid dates
- Basic text utilities
  - Text truncation
  - Word preservation
  - Custom ellipsis

### 🚧 In Progress
- i18next integration
- Language detection
- Translation management
- RTL support
- Dynamic language switching
- Translation files
- Language-specific components

### Supported Locales
- English (en-US)
- Dutch (nl-BE)
- French (fr-BE)
- More locales can be added

## Performance

### ✅ Implemented
- Basic Vite optimizations
- React's built-in performance features
- TypeScript's strict mode for better code quality
- Basic caching with localStorage

### 🚧 In Progress
- Code splitting
- Lazy loading
- Image optimization
- Font optimization
- Bundle analysis
- Performance monitoring
- Load time optimization
- Real-time performance metrics
- Error tracking
- User behavior analytics
- Resource usage monitoring
- Performance alerts

## Testing Conventions

### Test Files
- Use PascalCase with `.test.ts` or `.test.tsx` suffix
- Located in `__tests__` directories next to source files
- Examples:
  - `Validation.test.ts`
  - `ProtectedRoute.test.tsx`
  - `AuthContext.test.tsx`

### Test Setup
- Test setup and configuration files are located in `src/Shared/config/`
- Use lowercase naming for configuration files
- Examples:
  - `jest.setup.ts` (Jest configuration and polyfills)
  - `test-utils.ts` (Shared test utilities)

### Test Structure
- Use descriptive test names
- Group related tests in describe blocks
- Use it/test for individual test cases
- Example:
  ```typescript
  describe('Feature', () => {
    it('should do something', () => {
      // ...
    });
  });
  ```

### Mocking
- Mock external dependencies
- Use jest.mock for module mocks
- Use jest.fn() for function mocks
- Example:
  ```typescript
  jest.mock('../api', () => ({
    fetchData: jest.fn(),
  }));
  ```