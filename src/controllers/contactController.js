import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createContact } from "../services/contactService.js";

export const submitContact = asyncHandler(async (req, res) => {
    const contact = await createContact(req.body);

    return ApiResponse.success(
        res,
        "Consultation request submitted successfully.",
        contact,
        201
    );
});