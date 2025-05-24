import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token on load
    const checkAuth = () => {
      const stored = localStorage.getItem('auth_token');
      if (stored) {
        try {
          const decoded = jwtDecode<{ id: number; username: string; role: string; exp: number }>(stored);
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem('auth_token');
            setUser(null);
            setToken(null);
          } else {
            setUser({ id: String(decoded.id), username: decoded.username, role: decoded.role as any });
            setToken(stored);
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('auth_token');
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('/api/login', { username, password });
      const { token, user } = res.data;
      localStorage.setItem('auth_token', token);
      setToken(token);
      setUser(user);
      return true;
    } catch (err) {
      return false;
    }
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('/api/register', { username, password });
      const { token, user } = res.data;
      localStorage.setItem('auth_token', token);
      setToken(token);
      setUser(user);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};