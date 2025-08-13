const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Ensure correct database connection

const Builder = sequelize.define("Builder", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ownerType: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    locality: { type: DataTypes.STRING, allowNull: true },
    propertyType: { type: DataTypes.STRING, allowNull: true },
    transactionType: { type: DataTypes.STRING, allowNull: true },
    furnishedStatus: { type: DataTypes.STRING, allowNull: true },
    societyName: { type: DataTypes.STRING, allowNull: true },
    totalFlats: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },



    balconies:{type:DataTypes.STRING,allowNull:true},
    floorNo :{type:DataTypes.STRING,allowNull:true},
    totalFloors :{type:DataTypes.STRING,allowNull:true},
    facing :{type:DataTypes.STRING,allowNull:true},
    bathrooms :{type:DataTypes.STRING,allowNull:true},
    floorsAllowed :{type:DataTypes.STRING,allowNull:true},
    area :{type:DataTypes.STRING,allowNull:true},
    superArea :{type:DataTypes.STRING,allowNull:true},
    builtupArea :{type:DataTypes.STRING,allowNull:true},
    carpetArea :{type:DataTypes.STRING,allowNull:true},
    availableFrom: { type: DataTypes.STRING, allowNull: true },



    budget: { type: DataTypes.FLOAT, allowNull: true },
    bhk: { type: DataTypes.STRING, allowNull: true },
     
    possessionStatus: { type: DataTypes.STRING, allowNull: true },
    basePrice: { type: DataTypes.FLOAT, allowNull: true },
    plc: { type: DataTypes.FLOAT, allowNull: true }, // Preferential Location Charges
    parkingCharges: { type: DataTypes.FLOAT, allowNull: true },
    bookingAmount: { type: DataTypes.FLOAT, allowNull: true },
    maintenanceCharges: { type: DataTypes.FLOAT, allowNull: true },
    stampDuty: { type: DataTypes.FLOAT, allowNull: true },
    images: { type: DataTypes.STRING, allowNull: true } // Store JSON string
}, {
    tableName: "builders",
    timestamps: true, // Sequelize will handle createdAt & updatedAt
});

module.exports = Builder;

