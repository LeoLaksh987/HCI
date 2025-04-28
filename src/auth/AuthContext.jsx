// auth/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingChallenge, setPendingChallenge] = useState(null);
  
  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!user;

  // Login function
  const login = async (loginData) => {
    try {
      // In a real app, you'd make an API call here
      console.log('Logging in with:', loginData);
      
      // Simulate successful login
      const userData = {
        id: '123',
        username: loginData.username,
        // other user data
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to login. Please try again.' 
      };
    }
  };

  // Register function
  const register = async (registerData) => {
    try {
      // In a real app, you'd make an API call here
      console.log('Registering with:', registerData);
      
      // Simulate successful registration
      const userData = {
        id: '123',
        username: registerData.username,
        email: registerData.email,
        // other user data
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to register. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loading,
    pendingChallenge,
    setPendingChallenge
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};