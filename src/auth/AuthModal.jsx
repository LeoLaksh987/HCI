import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const { login, register, pendingChallenge, setPendingChallenge } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Reset active tab when modal opens with initialTab
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);
  
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    
    try {
      const result = await login(loginData);
      setIsSubmitting(false);
      
      if (result.success) {
        console.log("Login successful");
        
        // Close the modal first
        onClose();
        
        // Check if there's a pending challenge and navigate
        if (pendingChallenge) {
          console.log("Navigating to pending challenge:", pendingChallenge);
          setTimeout(() => {
            navigate(`/problem/${pendingChallenge}`);
            setPendingChallenge(null);
          }, 100); // Small delay to ensure modal closes first
        }
      } else {
        setLoginError(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsSubmitting(false);
      setLoginError("An unexpected error occurred");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    
    // Basic validation
    if (registerData.password.length < 8) {
      setRegisterError('Password must be at least 8 characters long');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await register(registerData);
      setIsSubmitting(false);
      
      if (result.success) {
        console.log("Registration successful");
        
        // Close the modal first
        onClose();
        
        // Check if there's a pending challenge and navigate
        if (pendingChallenge) {
          console.log("Navigating to pending challenge:", pendingChallenge);
          setTimeout(() => {
            navigate(`/problem/${pendingChallenge}`);
            setPendingChallenge(null);
          }, 100); // Small delay to ensure modal closes first
        }
      } else {
        setRegisterError(result.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
      setRegisterError("An unexpected error occurred");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">CodeArena Authentication</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-username">
                Username or Email
              </label>
              <input
                id="login-username"
                name="username"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username or email"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              {loginError && <p className="mt-2 text-sm text-red-600">{loginError}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-username">
                Username
              </label>
              <input
                id="register-username"
                name="username"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Choose a username"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-email">
                Email
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                name="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Create a password (min. 8 characters)"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                minLength={8}
              />
              {registerError && <p className="mt-2 text-sm text-red-600">{registerError}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;