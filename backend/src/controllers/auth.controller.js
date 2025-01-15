// auth.controller.js
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService =require('../services/user.service');


const AuthController = {
  async register(req, res) {
    try {
      const { name, email, password, role, address } = req.body;

      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);

      // check for unique Email

      const exist = await UserService.getUserByEmail(email);
      if(exist){
        return res.status(409).json({ message: 'already exist' });
      }

      // Create user
      const user = await UserService.createUser({ name, email, password: hashedPassword, role, address });

      res.status(201).json({ message: `${role} registered successfully`, user });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check password
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  },
};

module.exports = AuthController;
