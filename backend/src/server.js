import "./env.js";
import app from "./app.js";
import connectDB from "./config/connect.js";

const requiredEnvVars = ["JWT_SECRET", "MONGO_URI"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`[FATAL] Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("[FATAL] Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();