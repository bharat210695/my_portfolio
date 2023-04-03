const mongoose = require("mongoose");


const emailValidator = function(val) {
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(val)) {
        return true;
    } else {
        return false;
    }
}; // email validation


const passwordValidator = function(val) {
    // Define password requirements
    const passwordRequirements = {
        minLength: 8,
        maxLength: 15,
        hasUpperCase: /[A-Z]/,
        hasLowerCase: /[a-z]/,
        hasNumber: /[0-9]/,
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
    };

    // Check if password meets all requirements
    if (
        val.length >= passwordRequirements.minLength &&
        passwordRequirements.maxLength &&
        passwordRequirements.hasUpperCase.test(val) &&
        passwordRequirements.hasLowerCase.test(val) &&
        passwordRequirements.hasNumber.test(val) &&
        passwordRequirements.hasSpecialChar.test(val)
    ) {
        return true;
    } else {
        return false;
    }
};


// admin schema...............................
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [emailValidator, 'Email address is not valid']
    },
    password: {
        type: String,
        required: true,
        validate: [passwordValidator, 'Password does not meet requirements']

    },
    feedback: { type: Array, default: [] },
    loginHistory: { type: Array, default: [] }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model("admin_col", adminSchema)