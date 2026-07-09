import mongoose from "mongoose";
import env from "./env.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      dbName: "keen-overseas",
    });

    logger.success("MongoDB Connected");
    logger.info(`Database : ${conn.connection.name}`);
    logger.info(`Host : ${conn.connection.host}`);

  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    logger.error(error.message);

    process.exit(1);
  }
};

export default connectDB;