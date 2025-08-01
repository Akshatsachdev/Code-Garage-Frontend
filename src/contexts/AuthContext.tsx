import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for authentication
export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  memberSince: string;
  isPremium: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database (in real app, this would be backend)
const MOCK_USERS = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123', // In real app, this would be hashed
    avatar: '',
    memberSince: 'January 2024',
    isPremium: true,
  },
];

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user session on mount
  useEffect(() => {
    const checkStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem('raseed_user');
        const rememberMe = localStorage.getItem('raseed_remember_me');
        
        if (storedUser && rememberMe === 'true') {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error checking stored auth:', error);
        // Clear invalid stored data
        localStorage.removeItem('raseed_user');
        localStorage.removeItem('raseed_remember_me');
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate network delay for demo
    setTimeout(checkStoredAuth, 500);
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Find user in mock database
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        setIsLoading(false);
        return { success: false, message: 'Invalid email or password' };
      }

      // Create user object (exclude password)
      const { password: _, ...userWithoutPassword } = foundUser;
      const authenticatedUser: User = userWithoutPassword;

      // Set user state
      setUser(authenticatedUser);

      // Store in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('raseed_user', JSON.stringify(authenticatedUser));
        localStorage.setItem('raseed_remember_me', 'true');
      }

      setIsLoading(false);
      return { success: true, message: 'Login successful! Welcome back.' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'An error occurred during login. Please try again.' };
    }
  };

  // Signup function
  const signup = async (userData: SignupData): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === userData.email);
      
      if (existingUser) {
        setIsLoading(false);
        return { success: false, message: 'An account with this email already exists' };
      }

      // Validate password confirmation
      if (userData.password !== userData.confirmPassword) {
        setIsLoading(false);
        return { success: false, message: 'Passwords do not match' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        isPremium: false,
      };

      // Add to mock database (in real app, this would be sent to backend)
      MOCK_USERS.push({
        ...newUser,
        password: userData.password,
        avatar: '',
      });

      // Auto-login after signup
      setUser(newUser);

      setIsLoading(false);
      return { success: true, message: 'Account created successfully! Welcome to Project Raseed.' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: 'An error occurred during signup. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('raseed_user');
    localStorage.removeItem('raseed_remember_me');
    
    // TODO: In real app, call logout API to invalidate tokens
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;