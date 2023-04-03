const express = require("express");
const router = express.Router();

// test api post request
router.post("/testing", function(req, res) {
    return res
        .status(200)
        .json({ status: true, message: "Test POST Route Working Fine!" });
});

// test api get request
router.get("/testing", function(req, res) {
    return res
        .status(200)
        .json({ status: true, message: "Test GET Route Working Fine!" });
});

module.exports = router;