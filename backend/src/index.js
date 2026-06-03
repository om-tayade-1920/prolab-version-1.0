import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
        path: "./.env"
});

const port = process.env.PORT || 8000;

connectDB()
.then(() =>{
    app.on("error", (error) => {
        console.error("Server error:", error);
        process.exit(1);
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

})
.catch(
    (error) => {
        console.error("Error in connecting to the database:", error);
        process.exit(1);
    }
)