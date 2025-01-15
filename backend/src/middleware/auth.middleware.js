// auth.middleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  
  // const token = req.headers['authorization'];

  if (!token) {
    console.log('No token:',token)
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  try {
    // token.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data (userId and role) to request object
    next();
  } catch (error) {
    
    console.log('Invalid token:', token);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
