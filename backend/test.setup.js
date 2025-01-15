const { sequelize } = require('./src/config/postgres');
const mongoose = require('mongoose');

const setupTestDB = ()=>{
    beforeAll(async()=>{
        // Connect to PostgreSQL
        await sequelize.sync({ force:true }); // this option drops all existing tables and recreates them. Use with caution, as it deletes all data in the tables.

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async()=>{
        // Close PostgreSQL connection
        await sequelize.close();

        // Close MongoDB connection
        await mongoose.connection.close();
    });
};

module.exports = { setupTestDB };