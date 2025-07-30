import { create } from 'zustand';

import { authMe, authLogout } from '@src/lib/api/auth-service';

interface AuthState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  isAuthenticated: boolean;

  user: User | null;
  setUser: (user: User | null) => void;

  checkAuth: () => Promise<Optional<User>>;

  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  isAuthenticated: false,

  user: null,
  setUser: (user: User | null) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  checkAuth: async (): Promise<Optional<User>> => {
    set({ isLoading: true });

    try {
      const response = await authMe();

      if (response.data?.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });

        return response.data.user;
      }

      return undefined;
    } catch (error) {
      console.error('Auth check failed:', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      return undefined;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await authLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
