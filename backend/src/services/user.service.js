// user.service.js
const { User } = require('../models/index');

const UserService = {

    // Kis tarah ke function hai
    async createUser(userData){
        return await User.create(userData); // Create new user
    },

    async getUserById(userId){
        return await User.findByPk(userId); // Find user by Primary Key
    },

    async getUserByEmail(email){
        return await User.findOne({ where: { email } }); // Find user by email
    },

    async updateUser(userId, updates){
        return await User.update(updates, { where: { user_id: userId } }); // Update user details
    },

    async deleteUser(userId){
        return await User.destroy({ where: { user_id: userId } }); // Delete user
    },
};

module.exports = UserService;