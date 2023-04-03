const express = require("express");
const router = express.Router();
const { body, param, query, check } = require("express-validator");

const { adminAuthController } = require("../controller/adminController");

//############################## ADMIN ROUTE ##############################################

//.............................. REGISTER ..................................
router.post(
    "/register", [
        body("name").notEmpty().withMessage("Name is Required!").trim(),
        body("email").notEmpty().withMessage("Email is Required!").trim(),
        body("password").notEmpty().withMessage("Password is Required!").trim(),
    ],
    adminAuthController.adminRegister
);

//............................... Login ....................................
router.post(
    "/login", [
        body("email").notEmpty().withMessage("Email is Required!").trim(),
        body("password").notEmpty().withMessage("Password is Required!").trim(),
    ],
    adminAuthController.adminLogin
);

module.exports = router;