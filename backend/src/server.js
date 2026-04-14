import "./env.js";
import app from "./app.js";
import connectDB from "./config/connect.js";

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
