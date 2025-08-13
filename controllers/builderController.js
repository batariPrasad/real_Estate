const Builder = require("../models/builderSchema");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');


// ✅ Configure Multer for multiple file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const extension = file.originalname.split('.').pop();
      cb(null, `${uuidv4()}.${extension}`);
    },
  });
  
// ✅ Allow multiple image uploads (up to 5)
const upload = multer({ storage: storage }).array("images", 5);

// ✅ Controller for posting builder details
const builderPost = async (req, res) => {
    try {
        console.log("Received data:", req.body);
        console.log("Received files:", req.files); // ✅ Log uploaded files

        // Convert multiple image filenames to a comma-separated string
        const images = req.files ? req.files.map(file => file.filename).join(",") : null;

        const {
            ownerType,
            city,
            locality,
            propertyType,
            transactionType,
            furnishedStatus,
            societyName,
            phone,

            totalFlats,
            balconies,
            floorNo,
            totalFloors,
            facing,
            bathrooms,
            floorsAllowed,
            area,
            superArea,
            builtupArea,
            carpetArea,
            availableFrom,


            budget,
            bhk,
            otherBhk,
            possessionStatus,
            basePrice,
            plc,
            parkingCharges,
            bookingAmount,
            maintenanceCharges,
            stampDuty
        } = req.body;

        // ✅ Create new Builder entry
        const newBuilder = await Builder.create({
            ownerType,
            city,
            locality,
            propertyType,
            transactionType,
            furnishedStatus,
            societyName,
            phone,
            totalFlats: parseInt(totalFlats) || null,
            balconies: parseInt(balconies) || null,
            floorNo,
            totalFloors: parseInt(totalFloors) || null,
            facing,
            bathrooms: parseInt(bathrooms) || null,
            floorsAllowed: parseInt(floorsAllowed) || null,
            area,
            superArea,
            builtupArea,
            carpetArea,
            availableFrom,
            budget: parseFloat(budget) || null,
            bhk: parseInt(bhk) || null,
            otherBhk,
            possessionStatus,
            basePrice: parseFloat(basePrice) || null,
            plc: parseFloat(plc) || null,
            parkingCharges: parseFloat(parkingCharges) || null,
            bookingAmount: parseFloat(bookingAmount) || null,
            maintenanceCharges: parseFloat(maintenanceCharges) || null,
            stampDuty: parseFloat(stampDuty) || null,
            images
        });
        
        res.status(201).json({ message: "Builder details uploaded successfully", data: newBuilder });

    } catch (error) {
        console.error("Error in builderPost:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const getBuilder = async (req, res) => {
    try {
        const properties = await Builder.findAll();

        // ✅ Ensure images are returned as an array of URLs
        const updatedProperties = properties.map(property => ({
            ...property.toJSON(),
            images: property.images
                ? property.images.split(",").map(img => `http://localhost:2026/uploads/${img}`)
                : []  // Ensure it's always an array
        }));

        res.status(200).json({ success: true, data: updatedProperties });
    } catch (error) {
        console.error("Error fetching builders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getBuilderById = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Builder.findByPk(id); // Use `findByPk(id)` for PostgreSQL, `findById(id)` for MongoDB

        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        // ✅ Convert image filenames to full URLs
        const updatedProperty = {
            ...property.toJSON(),
            images: property.images
                ? property.images.split(",").map(img => `http://localhost:2026/uploads/${img}`)
                : []
        };

        res.status(200).json({ success: true, data: updatedProperty });

    } catch (error) {
        console.error("Error fetching builder by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const deleteBuilder = async (req,res) => {
    try {
        const { id } = req.params;
        const builder = await Builder.findByPk(id)
        if (!builder) {
          return  res.status(404).json({ message: "Builder not found" })
        }

        await builder.destroy()
        res.status(200).json({ message: "Builder deleted successfully" })
    }
catch (error) {
    console.error("error deleting in builder", error);
    res.status(500).json({ message: "Internal server error" })
}
}


const updateBuilder = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🔄 Updating Property with ID:", id);

        // ✅ Check if Builder model exists
        const builder = await Builder.findByPk(id);
        if (!builder) {
            return res.status(404).json({ message: "Property not found" });
        }

        let updatedData = { ...req.body };

        // ✅ Preserve existing images if no new ones are uploaded
        if (req.files && req.files.length > 0) {
            updatedData.images = req.files.map(file => file.filename).join(",");
        } else {
            updatedData.images = builder.images; // Preserve old images
        }

        // ✅ Update the record
        await builder.update(updatedData);
        res.status(200).json({ message: "Property updated successfully", data: builder });

    } catch (error) {
        console.error("❌ Error updating property:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { builderPost, getBuilder, getBuilderById, upload,deleteBuilder,updateBuilder };
