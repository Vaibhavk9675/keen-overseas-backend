import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
});

export const sendAdminEmail = async (contact) => {
    await transporter.sendMail({
        from: env.EMAIL_USER,
        to: env.EMAIL_USER,
        subject: `New Consultation Request - ${contact.source}`,
        html: `
      <h2>New Consultation Request</h2>

      <p><strong>Name:</strong> ${contact.name}</p>

      <p><strong>Email:</strong> ${contact.email}</p>

      <p><strong>Phone:</strong> ${contact.phone}</p>

      <p><strong>Preferred Country:</strong> ${contact.preferredCountry || "Not Provided"}</p>

      <p><strong>Preferred Intake:</strong> ${contact.preferredIntake || "Not Provided"}</p>

      <p><strong>Message:</strong> ${contact.message}</p>

      <p><strong>Source:</strong> ${contact.source}</p>
    `,
    });
};

export const sendCustomerEmail = async (contact) => {
    await transporter.sendMail({
        from: env.EMAIL_USER,
        to: contact.email,
        subject: "Thank you for contacting Keen Overseas",
        html: `
      <h2>Hello ${contact.name},</h2>

      <p>
      Thank you for contacting Keen Overseas.
      </p>

      <p>
      Our counsellor will contact you shortly.
      </p>

      <br>

      <p>
      Regards,<br>
      Keen Overseas
      </p>
    `,
    });
};