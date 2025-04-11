# RailSync

RailSync is a modern railway management solution built with React, TypeScript, and Vite. This project follows a feature-based architecture pattern to ensure scalability, maintainability, and clear separation of concerns.

## Architecture Overview

The project is structured using a feature-based architecture with three main directories:

### 1. Core (`/src/Core`)
Contains the fundamental building blocks of the application:
- `App/`: Main application component and layout
- `routes.tsx`: Centralized routing configuration
- Future additions: Global state management, error boundaries, etc.

### 2. Features (`/src/Features`)
Each feature is self-contained with its own components, logic, and styles:
- `Home/`: Landing page and introduction
- `Auth/`: Authentication flows (Google & Microsoft OAuth)
- `Dashboard/`: Main application interface
- Each feature follows the same pattern:
  - Components
  - Hooks (if needed)
  - Types (if needed)
  - Styles (if needed)

### 3. Shared (`/src/Shared`)
Contains reusable resources used across the application:
- `styles/`: Global styles, CSS reset, and utility classes
- Future additions: Common components, utilities, constants, etc.

## Technology Stack

- **React 18**: UI library
- **TypeScript**: Type safety and better developer experience
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Jest & React Testing Library**: Testing framework

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Azaphyr/RailSync.git
   cd RailSync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Check code with ESLint
- `npm run format`: Format code with Prettier
- `npm test`: Run tests
- `npm run test:watch`: Run tests in watch mode

## Code Quality

We maintain code quality through:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Jest and React Testing Library for testing

## Project Structure

```
src/
├── Core/
│   ├── App/
│   │   ├── App.tsx
│   │   └── App.css
│   └── routes.tsx
├── Features/
│   ├── Home/
│   │   └── Home.tsx
│   ├── Auth/
│   │   └── Auth.tsx
│   └── Dashboard/
│       └── Dashboard.tsx
├── Shared/
│   └── styles/
│       └── index.css
├── main.tsx
└── vite-env.d.ts
```

## Architecture Benefits

1. **Scalability**: Each feature can be developed and tested independently
2. **Maintainability**: Clear separation of concerns makes the codebase easier to maintain
3. **Reusability**: Shared components and utilities reduce code duplication
4. **Team Collaboration**: Different teams can work on different features simultaneously
5. **Code Organization**: Clear structure makes it easy to locate and understand code

## Future Considerations

- Add state management (e.g., Redux, Zustand)
- Implement API layer for backend communication
- Set up CI/CD pipeline
- Add documentation generation

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure code quality
4. Submit a pull request

## License

[MIT License](LICENSE)
