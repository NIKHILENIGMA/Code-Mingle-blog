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
