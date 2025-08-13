const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sqlDb } = require("./config/db");
const path = require("path");

const userRoutes = require("./routes/signUpRoutes");
const buildRoutes = require("./routes/builderRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB connection
sqlDb()
  .then(() => {
    app.use("/user", userRoutes);
    app.use("/builder", buildRoutes);

    app.listen(port, () => {
      console.log(`✅ Server running on ${process.env.BASE_URL || `http://localhost:${port}`}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
