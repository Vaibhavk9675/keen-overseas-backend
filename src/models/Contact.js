import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      enum: ["Home", "Contact"],
      default: "Contact",
    },

    status: {
      type: String,
      enum: ["Pending", "Contacted", "Follow Up", "Converted", "Closed"],
      default: "Pending",
    },

    assignedTo: {
      type: String,
      default: "",
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    followUpDate: {
      type: Date,
    },

    lastContactedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    preferredCountry: {
      type: String,
      default: "",
      trim: true,
    },

    preferredIntake: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ email: 1 });
contactSchema.index({ phone: 1 });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;