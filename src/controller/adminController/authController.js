const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const createError = require("http-errors");
const AdminModel = require("../../models/adminModel");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
JWT_TOKEN_SECRET = process.env.jwt_secret;

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ADMIN REGISTER $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const adminRegister = async(req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            const errorMessage = error.array()[0].msg;
            return next(createError(406, errorMessage));
        }

        const { name, email, password } = req.body; // admin register request body

        const isEmailAlreadyExist = await AdminModel.findOne({ email: email }); // check admin email already exist or not
        if (isEmailAlreadyExist) {
            return res
                .status(404)
                .json({ status: false, message: "Email Id Already Exist!" });
        }

        const encryptedPassword = bcrypt.hashSync(password.toString(), salt); // store encrypted password

        const adminObj = { name: name, email: email, password: encryptedPassword }; // create admin object

        const newAdmin = await AdminModel.create(adminObj); // create admin and store in admin collection

        return res
            .status(201)
            .json({ status: true, data: newAdmin, message: "Success!" });
    } catch (error) {
        return next(createError(500, error.message));
    }
};

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ADMIN lOGIN $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const adminLogin = async(req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            const errorMessage = error.array()[0].msg;
            return next(createError(406, errorMessage));
        }

        const { email, password } = req.body; // admin can login with email and password

        const admin = await AdminModel.findOne({ email: email }); // fetch admin details

        if (!admin) {
            return next(createError(406, "Email Dost not Match!"));
        } // check admin exist or not

        const isValidPassword = bcrypt.compareSync(
            password.toString(),
            admin.password
        ); // compare the password with encrypted

        if (isValidPassword) {
            const iat = Math.floor(Date.now() / 1000);
            const token = jwt.sign({ email: email, id: admin._id, exp: iat + 2630000 },
                JWT_TOKEN_SECRET
            ); // generate jwt token.
            const loginResponse = {
                email: email,
                name: admin.name,
                uid: admin._id,
                added: new Date(),
            }; // login history response object

            await AdminModel.updateMany({ email: email }, { $push: { loginHistory: loginResponse } }); // create login history

            return res
                .status(200)
                .json({ status: true, token: token, message: "Login SuccessFully" });
        } else {
            return next(createError(406, "Password is Not Valid!"))
        }
    } catch (error) {
        return next(createError(500, error.message));
    }
};

module.exports = { adminRegister, adminLogin };