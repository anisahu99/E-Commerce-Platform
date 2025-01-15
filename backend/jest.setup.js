jest.setTimeout(30000); // Sets the timeout to 30 seconds for all tests
const { setupTestDB } = require('./test.setup');

setupTestDB();  // Initialize the database for all test files