import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import adminRoutes from "./routes/adminRoutes.js";

import env from "./config/env.js";

// Routes
import contactRoutes from "./routes/contactRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";



// Middlewares
import errorHandler from "./middleware/errorHandler.js";

const app = express();

/* ----------------------------- Security ----------------------------- */

app.use(helmet());

app.use(compression());

/* --------------------------- Rate Limiter --------------------------- */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use(limiter);

/* ------------------------------- CORS ------------------------------- */

const allowedOrigins = [
  "https://keenoverseas.com",
  "https://www.keenoverseas.com",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* ---------------------------- Body Parser --------------------------- */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* ------------------------------ Routes ------------------------------ */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Keen Overseas API Running 🚀",
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Keen Overseas API Running 🚀",
  });
});

app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/enquiries", enquiryRoutes);

app.use(errorHandler);


export default app;