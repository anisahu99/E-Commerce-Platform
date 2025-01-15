// user.controller.js
const UserService = require('../services/user.service');

const UserController = {
  async getProfile(req, res) {
    try {
      const userId = req.user.userId; // Extracted from JWT middleware
      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const userId = req.user.userId; // Extracted from JWT middleware
      const updates = req.body;

      await UserService.updateUser(userId, updates);

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
  },
};

module.exports = UserController;
