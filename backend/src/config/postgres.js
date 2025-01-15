// postgres.js
require("dotenv").config();
const { Sequelize } = require("sequelize");


// Option 1

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  logging: process.env.NODE_ENV === "test" ? false : console.log, // Disable logging in tests
});


const postgresDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    process.exit(1); // Exit the process if PostgreSQL connection fails
  }
};

module.exports = { sequelize, postgresDBConnection };

// Option 2
// const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
//   host: process.env.PG_HOST,
//   dialect: 'postgres',
// });