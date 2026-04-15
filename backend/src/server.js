import "./env.js";
import app from "./app.js";
import connectDB from "./config/connect.js";

const requiredEnvVars = ["JWT_SECRET", "MONGO_URI", "PORT"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`[FATAL] Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

connectDB();

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});