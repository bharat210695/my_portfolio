const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const app = express();
var morgan = require("morgan");
var cors = require("cors");
const serverless = require("serverless-http");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// import the route files........................
const testRoute = require("./src/routes/testing");
const adminRoute = require("./src/routes/adminRoute")

//..................................................

// connect mongo db server
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));

app.use(morgan("dev"));
const baseApi = "api/v1";

app.get("/", (req, res) => {
    res.render("index");
});

//..................................................
app.use(`/${baseApi}/test`, testRoute);
app.use(`/${baseApi}/admin`, adminRoute);
//..................................................

app.use((res, req, next) => {
    return next(createError(404, "Route Not Found!"));
});

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({
        status: false,
        message: error.message,
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Express app running on port " + (process.env.PORT || 3000));
});

module.exports.handler = serverless(app);