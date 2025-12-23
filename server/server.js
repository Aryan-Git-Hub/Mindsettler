import app from "./app.js";
import 'dotenv/config';
import connectDB from "./config/db.js";

// Connect to Database
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));