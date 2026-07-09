import express from "express";
import {
    getEnquiries,
    getEnquiryById,
    updateEnquiry,
    deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

router.get("/", getEnquiries);

router.get("/:id", getEnquiryById);

router.patch("/:id", updateEnquiry);

router.delete("/:id", deleteEnquiry);

export default router;