const express = require("express");
const app = express();
const errorMiddleware = require("./Middleware/error");
const cookiesParser = require("cookie-parser");
const cors = require('cors');

//middleware
app.use(express.json());
app.use(cookiesParser());
const corsOptions = {
   origin: 'https://unrivaled-granita-450d81.netlify.app',
   credentials: true,
};

app.use(cors(corsOptions));


// router import
app.use("/api/v1", require("./Router/ProductRouter"));
app.use("/api/v1", require("./Router/UserRouter"));
app.use("/api/v1", require("./Router/OrderRouter"));
app.use("/api/v1", require("./Router/UploadImagesRouter"));

//Middleware for error
app.use(errorMiddleware);

module.exports = app;
