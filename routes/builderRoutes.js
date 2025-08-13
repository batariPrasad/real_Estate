const express = require("express");
const router = express.Router();
const { 
    builderPost, 
    getBuilder, 
    upload, 
    getBuilderById, 
    deleteBuilder, 
    updateBuilder 
} = require("../controllers/builderController");

// ✅ Add Property API (Ensure frontend calls `/addProperty`)
router.post("/addProperty", upload, builderPost);

// ✅ Get All Properties
router.get("/getProperties", getBuilder);

// ✅ Get Property by ID
router.get("/get/:id", getBuilderById);

// ✅ Delete Property by ID
router.delete("/delete/:id", deleteBuilder);

// ✅ Update Property (Ensure frontend sends the correct request)
router.put("/update/:id", upload, updateBuilder);

module.exports = router;
