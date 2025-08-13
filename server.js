const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sqlDb } = require("./config/db");
const Builder = require("./models/builderSchema"); // ✅ Import model
const path = require("path")


const userRoutes = require("./routes/signUpRoutes");
const buildRoutes = require("./routes/builderRoutes")

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// ✅ Serve uploaded files statically
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to DB and Start Server Only If Successful
sqlDb()
  .then(() => {
    // ✅ Routes
    app.use("/user", userRoutes);
    app.use("/builder",buildRoutes)

    // ✅ Start Server
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Server failed to start due to database error:", err);
    process.exit(1); // ✅ Stop execution if DB connection fails
  });
