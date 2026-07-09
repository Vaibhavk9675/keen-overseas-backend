import Contact from "../models/Contact.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getEnquiries = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";
    const status = req.query.status || "";
    const country = req.query.country || "";

    const query = {
        isDeleted: false,
    };

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
        ];
    }

    if (status) {
        query.status = status;
    }

    if (country) {
        query.preferredCountry = country;
    }

    const total = await Contact.countDocuments(query);

    const enquiries = await Contact.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({
        success: true,
        data: enquiries,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
            limit,
        },
    });
});

export const getEnquiryById = asyncHandler(async (req, res) => {
    const enquiry = await Contact.findOne({
        _id: req.params.id,
        isDeleted: false,
    });

    if (!enquiry) {
        return res.status(404).json({
            success: false,
            message: "Enquiry not found",
        });
    }

    res.status(200).json({
        success: true,
        data: enquiry,
    });
});

export const updateEnquiry = asyncHandler(async (req, res) => {
    const enquiry = await Contact.findOne({
        _id: req.params.id,
        isDeleted: false,
    });

    if (!enquiry) {
        return res.status(404).json({
            success: false,
            message: "Enquiry not found",
        });
    }

    const {
        status,
        assignedTo,
        notes,
        followUpDate,
        lastContactedAt,
    } = req.body;

    if (status !== undefined) enquiry.status = status;
    if (assignedTo !== undefined) enquiry.assignedTo = assignedTo;
    if (notes !== undefined) enquiry.notes = notes;
    if (followUpDate !== undefined) enquiry.followUpDate = followUpDate;
    if (lastContactedAt !== undefined)
        enquiry.lastContactedAt = lastContactedAt;

    await enquiry.save();

    res.status(200).json({
        success: true,
        message: "Enquiry updated successfully",
        data: enquiry,
    });
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
    const enquiry = await Contact.findOne({
        _id: req.params.id,
        isDeleted: false,
    });

    if (!enquiry) {
        return res.status(404).json({
            success: false,
            message: "Enquiry not found",
        });
    }

    enquiry.isDeleted = true;

    await enquiry.save();

    res.status(200).json({
        success: true,
        message: "Enquiry deleted successfully",
    });
});