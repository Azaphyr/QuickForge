import 'react-router-dom';

declare module 'react-router-dom' {
  interface MemoryRouterProps {
    future?: {
      v7_startTransition: boolean;
    };
  }
} 