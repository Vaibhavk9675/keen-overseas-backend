import Contact from "../models/Contact.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
    const totalEnquiries = await Contact.countDocuments({
        isDeleted: false,
    });

    const pending = await Contact.countDocuments({
        status: "Pending",
        isDeleted: false,
    });

    const contacted = await Contact.countDocuments({
        status: "Contacted",
        isDeleted: false,
    });

    const followUp = await Contact.countDocuments({
        status: "Follow Up",
        isDeleted: false,
    });

    const converted = await Contact.countDocuments({
        status: "Converted",
        isDeleted: false,
    });

    const closed = await Contact.countDocuments({
        status: "Closed",
        isDeleted: false,
    });

    res.status(200).json({
        success: true,
        data: {
            totalEnquiries,
            pending,
            contacted,
            followUp,
            converted,
            closed,
        },
    });
});