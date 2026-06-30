import jwt from 'jsonwebtoken';
import Admin from '../models/AdminModel.js';

const protectAdminAction = async (req, res, next) => {
  let token;

  // Track if a bearer security token is present in the request headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Split "Bearer <token>" string to extract the raw hash payload
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the signature using your secret environment key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Extract the admin database identity while dropping the hashed password field for safety
      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        return res.status(401).json({ message: 'Authorization failed: Administrative entity not found.' });
      }

      // Everything looks pristine, hand over execution to the target controller path
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Authorization failed: Session token has expired or is corrupt.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied: No secure management token provided.' });
  }
};

// This is the default export the application routes are trying to reference
export default protectAdminAction;