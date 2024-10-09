// seed.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB for seeding");
        seedData();
    })
    .catch(err => {
        console.error("Could not connect to MongoDB", err);
        process.exit(1);
    });

// Define the schema and model
const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number
});

const Item = mongoose.model('Item', itemSchema);

// Sample data to seed
const seedItems = [
    { name: "Apple", quantity: 50 },
    { name: "Banana", quantity: 30 },
    { name: "Orange", quantity: 20 },
    { name: "Mango", quantity: 15 }
];

// Function to seed data
async function seedData() {
    try {
        // Clear existing data
        await Item.deleteMany({});
        console.log("Cleared existing items");

        // Insert seed data
        await Item.insertMany(seedItems);
        console.log("Seeded items successfully");

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.connection.close();
        process.exit(1);
    }
}
