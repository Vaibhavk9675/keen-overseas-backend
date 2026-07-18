import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

const startServer = async () => {
  try {
    console.log("Step 1");

    await connectDB();

    console.log("Step 2");

    app.listen(env.PORT, () => {
      console.log(`Server running on ${env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();