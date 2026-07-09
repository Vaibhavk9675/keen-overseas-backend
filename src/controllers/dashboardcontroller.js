import Contact from "../models/Contact.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
    const [
        totalEnquiries,
        pending,
        contacted,
        followUp,
        converted,
        closed,
    ] = await Promise.all([
        Contact.countDocuments({ isDeleted: false }),
        Contact.countDocuments({ status: "Pending", isDeleted: false }),
        Contact.countDocuments({ status: "Contacted", isDeleted: false }),
        Contact.countDocuments({ status: "Follow Up", isDeleted: false }),
        Contact.countDocuments({ status: "Converted", isDeleted: false }),
        Contact.countDocuments({ status: "Closed", isDeleted: false }),
    ]);

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