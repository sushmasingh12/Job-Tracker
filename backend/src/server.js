import "./env.js";
import app from "./app.js";
import connectDB from "./config/connect.js";

connectDB();

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});