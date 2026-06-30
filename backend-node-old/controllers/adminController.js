import Admin from '../models/AdminModel.js';
import jwt from 'jsonwebtoken';

// Helper function to sign JSON Web Tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: 'Authentication failed: Invalid credentials signature.' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server authentication error: ${error.message}` });
  }
};

// @desc    Register initial admin account (Seed Route)
// @route   POST /api/admin/register-seed
// @access  Public
export const registerAdminSeed = async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ username });
    if (adminExists) {
      return res.status(400).json({ message: 'Administrative context already initialized.' });
    }

    const admin = await Admin.create({ username, password });
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        message: 'Master administrative account seeded successfully.'
      });
    } else {
      res.status(400).json({ message: 'Invalid admin registration data payload.' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server seeding error: ${error.message}` });
  }
};