import "dotenv/config";
import connectDb from "./config/connectDb.js";
import app from "./app.js";

const PORT = 9090;

connectDb();

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
