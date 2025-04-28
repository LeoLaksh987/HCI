import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (userExists) {
      return res.status(400).json({ 
        message: 'User already exists with that email or username' 
      });
    }
    
    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });
    
    if (user) {
      const token = generateToken(user._id);
      
      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username },
        { email: username } // Allow login with email in username field
      ]
    });
    
    // Check if user exists and password matches
    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);
      
      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid username/email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const logout = async (req, res) => {

  
  res.status(200).json({ message: 'Logged out successfully' });
};