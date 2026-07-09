import Contact from "../models/Contact.js";
import logger from "../utils/logger.js";
import {
    sendAdminEmail,
    sendCustomerEmail,
} from "./emailService.js";

export const createContact = async (data) => {
    // Save contact first
    const contact = await Contact.create(data);

    // Send emails in background
    Promise.allSettled([
        sendAdminEmail(contact),
        sendCustomerEmail(contact),
    ]).then((results) => {
        results.forEach((result) => {
            if (result.status === "rejected") {
                logger.error(result.reason.message);
            }
        });
    });

    return contact;
};