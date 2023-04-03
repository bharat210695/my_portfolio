// const mongoose = require("mongoose")
// const regexValidator = require('mongoose-regex-validator');
// const validator = require('validator');

// //const Schema = mongoose.Schema;

// const userSchema = new mongoose.Schema({

//     userName: { type: String, required: true, trim: true, max: 10, min: 5 },
//     fullName: { type: String, required: true, trim: true },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         validate: [validator.isEmail, 'Invalid email format']
//     },
//     phone: {
//         type: String,
//         validate: [
//             regexValidator({
//                 validator: 'matches',
//                 arguments: /^(\+\d{1,3}[- ]?)?\d{10}$/,
//                 message: 'Phone number must be a valid format'
//             })
//         ]
//     },

//     password: {
//         type: String,
//         required: true,
//         validate: [
//             regexValidator({
//                 validator: 'matches',
//                 arguments: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                 message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character'
//             })
//         ]
//     },
//     library: { type: Array, default: [] },
//     wishlist: { type: Array, default: [] },
//     reviews: { type: Array, default: [] },
//     loginHistory: { type: Array, default: [] }


// }, { versionKey: false, timestamps: true })


// module.exports = mongoose.model("user_col", userSchema);