export type OAuthProvider = 'google' | 'microsoft' | 'discord';

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: OAuthProvider;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (provider: OAuthProvider) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

export interface AuthConfig {
  google: OAuthConfig;
  microsoft: OAuthConfig;
  discord: OAuthConfig;
  apiBaseUrl: string;
} 