import express from "express";

import { getDashboardStats } from "../controllers/dashboardcontroller.js";
import { getEnquiries } from "../controllers/enquiryController.js";

const router = express.Router();

router.get("/dashboard", getDashboardStats);

router.get("/enquiries", getEnquiries);

export default router;