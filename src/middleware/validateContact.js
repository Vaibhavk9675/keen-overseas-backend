import validator from "validator";

const validateContact = (req, res, next) => {
    const { name, email, phone, preferredCountry, preferredIntake, source, } = req.body;

    // Name
    if (!name || validator.isEmpty(name.trim())) {
        return res.status(400).json({
            success: false,
            message: "Name is required.",
        });
    }

    // Email
    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address.",
        });
    }

    // Phone
    if (
        !phone ||
        !validator.isMobilePhone(phone, "en-IN")
    ) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid mobile number.",
        });
    }

    // Preferred Country (Optional)
    if (preferredCountry && preferredCountry.length > 50) {
        return res.status(400).json({
            success: false,
            message: "Preferred country is too long.",
        });
    }

    // Preferred Intake (Optional)
    if (preferredIntake && preferredIntake.length > 30) {
        return res.status(400).json({
            success: false,
            message: "Preferred intake is too long.",
        });
    }

    // Source
    if (source && !["Home", "Contact"].includes(source)) {
        return res.status(400).json({
            success: false,
            message: "Invalid form source.",
        });
    }

    next();
};

export default validateContact;