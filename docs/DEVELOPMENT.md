# Development Guidelines

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in the values
4. Start the development server: `npm run dev`

## Code Style

- Use TypeScript for all new code
- Follow the feature-based architecture pattern
- Write meaningful commit messages following conventional commits
- Run `npm run format` before committing
- Keep components small and focused

## Testing

- Write tests for all new features
- Run tests with `npm test`
- Use React Testing Library for component tests
- Follow the testing best practices in the project

## Git Workflow

1. Create a new branch for each feature: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests and linting
4. Commit your changes
5. Push to remote
6. Create a pull request

## Architecture

The project follows a feature-based architecture:

- `Core/`: Fundamental building blocks
- `Features/`: Self-contained feature modules
- `Shared/`: Reusable resources

## Environment Variables

All environment variables are defined in `.env.example`. Make sure to:
- Never commit `.env` file
- Update `.env.example` when adding new variables
- Document new variables in this file

## Deployment

1. Build the project: `npm run build`
2. Deploy the contents of the `dist` directory
3. Set up environment variables on the server 