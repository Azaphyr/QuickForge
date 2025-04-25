# Development Guidelines

## Prerequisites

- Node.js (v18 or higher)
- npm (latest stable version)
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Azaphyr/QuickForge.git
   cd QuickForge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values

4. Start development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Architecture

### 🏗️ Core (✅ Implemented)
The core module contains fundamental building blocks:
```
Core/
├── API/            # API configuration and services (✅)
├── App/            # Main application setup (✅)
├── Authentication/ # Core authentication logic (✅)
├── Profile/        # User profile management (✅)
└── routes.tsx      # Application routing configuration (✅)
```

### 🚀 Features
Feature modules implement specific functionality:

#### 🔒 Auth (✅ Implemented)
```
Auth/
├── Login.tsx
├── Callback.tsx
├── Logout.tsx
├── Auth.tsx
└── __tests__/
```

#### 🏠 Home (✅ Implemented)
```
Home/
├── Components/
├── Services/
├── Hooks/
└── __tests__/
```

#### 📊 Dashboard (🚧 In Progress)
```
Dashboard/
├── Dashboard.tsx
├── Components/     # ✅ Implemented
├── Services/       # ✅ Created
├── Hooks/         # ✅ Created
└── __tests__/     # 🚧 In Progress
```

#### 📈 Analytics (🚧 In Progress)
```
Analytics/
├── Components/     # ✅ Created
├── Services/       # ✅ Created
├── Hooks/         # ✅ Created
└── __tests__/     # 🚧 In Progress
```

### 🔄 Shared (✅ Implemented)
Reusable resources across features:
```
Shared/
├── Components/    # ✅ Implemented
├── Contexts/      # ✅ Implemented
├── Hooks/         # ✅ Implemented
├── Services/      # ✅ Implemented
├── Types/         # ✅ Implemented
├── Utils/         # ✅ Implemented
├── Styles/        # ✅ Implemented
└── Config/        # ✅ Implemented
```

## Code Style & Conventions

### File Naming
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- Services: PascalCase with 'Service' suffix (e.g., `AuthService.ts`)
- Utils: PascalCase (e.g., `StringUtils.ts`)
- Tests: Same name as tested file with `.test.ts(x)` suffix

### TypeScript
- Enable strict mode
- Avoid `any` - use `unknown` with type guards instead
- Use interfaces for object types
- Use type aliases for unions/intersections
- Document complex types

### React
- Use functional components
- Implement proper error boundaries
- Follow React hooks best practices
- Maintain proper component composition
- Use TypeScript for props and state

### CSS/Styling
- Use Tailwind CSS for styling
- Follow mobile-first approach
- Maintain consistent spacing
- Use CSS variables for theming

## Testing Guidelines

### Unit Tests
- Co-locate test files with source code
- Follow AAA pattern (Arrange, Act, Assert)
- Use meaningful test descriptions
- Mock external dependencies
- Test edge cases

### Component Tests
- Use React Testing Library
- Test user interactions
- Test accessibility
- Avoid testing implementation details
- Write integration tests for complex flows

## Git Workflow

1. Branch Naming:
   - Features: `feature/feature-name`
   - Fixes: `fix/issue-description`
   - Chores: `chore/task-description`

2. Commit Messages:
   ```
   type(scope): description

   [optional body]
   [optional footer]
   ```
   Types: feat, fix, docs, style, refactor, test, chore

3. Pull Request Process:
   - Create feature branch
   - Make changes
   - Run tests and linting
   - Update documentation
   - Create PR with description
   - Request review
   - Address feedback
   - Merge when approved

## Environment Variables

### Required Variables
```env
VITE_API_URL=           # API endpoint URL
VITE_APP_ENV=           # development|production
```

### Optional Variables
```env
VITE_GOOGLE_CLIENT_ID=  # Google OAuth client ID
VITE_LOG_LEVEL=         # debug|info|warn|error
```

## Performance Guidelines

- Implement code splitting
- Use React.memo for expensive renders
- Optimize images and assets
- Use proper caching strategies
- Monitor bundle size
- Implement lazy loading

## Security Best Practices

- Never commit sensitive data
- Validate all inputs
- Implement proper authentication
- Use HTTPS
- Keep dependencies updated
- Follow OWASP guidelines

## Deployment

### Production Build
1. Update environment variables
2. Run build:
   ```bash
   npm run build
   ```
3. Test production build:
   ```bash
   npm run preview
   ```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Build successful
- [ ] Tests passing
- [ ] Performance metrics acceptable
- [ ] Security headers configured
- [ ] Error tracking setup
- [ ] Backups configured
- [ ] Monitoring in place

## Troubleshooting

Common issues and solutions:

1. Build fails:
   - Clear node_modules and package-lock.json
   - Run fresh npm install
   - Check for TypeScript errors

2. Tests failing:
   - Update test snapshots if needed
   - Check for environment dependencies
   - Verify mock data

3. Development server issues:
   - Clear Vite cache
   - Check port conflicts
   - Verify environment variables 