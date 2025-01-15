// app.js
require("dotenv").config();
const express = require("express");
const { postgresDBConnection, sequelize } = require("./config/postgres");
const mongoDBConnection = require("./config/mongoDb");
const app = express();

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");

// Middleware
app.use(express.json());

// Connect Databases only if not in test mode
if (process.env.NODE_ENV !== "test") {
    // Connect PostgreSQL
    postgresDBConnection();
  
    // Connect MongoDB
    mongoDBConnection();
  
    // Synchronize PostgreSQL Models
    // Immediately Invoked Function Expression
    (async () => {
      try {
        await sequelize.sync({ alter: true }); // Sync the models to database only if not in test mode
        console.log("PostgreSQL models synchronized");
      } catch (error) {
        console.error("Error synchronizing PostgreSQL models:", error);
      }
    })();
  }
  
  if (process.env.NODE_ENV === "test") {
    console.log("Running in test environment");
  } else if (process.env.NODE_ENV === "development") {
    console.log("Running in development environment");
  } else if (process.env.NODE_ENV === "production") {
    console.log("Running in production environment");
  } else {
    console.log("NODE_ENV not set");
  }

// Basic route

app.get("/", (req, res) => {
  res.send("E-Commerce backened is running...");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

module.exports = app;
