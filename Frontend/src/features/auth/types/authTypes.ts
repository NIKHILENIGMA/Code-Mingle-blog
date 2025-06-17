export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarImg: string | null;
}

export interface AuthState {
  accessToken: string | null;
  persist: boolean;
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  avatar: string;
  role: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUserDetails: () => Promise<void>;
  setIsPersistent: (value: boolean) => void;
};