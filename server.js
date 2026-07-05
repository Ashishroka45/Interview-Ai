import app from "./src/app.js";
import connectDB from "./src/config/data.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB() 
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed", error);
    });