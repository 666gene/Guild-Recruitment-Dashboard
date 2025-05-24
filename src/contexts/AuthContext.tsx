import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on load
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          // In a real app, we'd verify this token with the server
          const decoded = jwtDecode<{ user: User }>(token);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem('auth_token');
            setUser(null);
          } else {
            setUser(decoded.user);
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // This would normally be an API call
    // For demo purposes, we'll mock it
    if (username === 'admin' && password === 'lowcalibre') {
      const mockUser: User = {
        id: '1',
        username: 'admin',
        role: 'admin'
      };
      
      // In a real app, this would come from your backend
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifSwiZXhwIjoxNzE2MjM5MDIyfQ.7L8TxNJFoU1AGLCJ2Yg9x01YpNv_FLkC9j7Q6iO5lJg';
      
      localStorage.setItem('auth_token', mockToken);
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};