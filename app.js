const express = require("express");
const app = express();
const errorMiddleware = require("./Middleware/error");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
   require("dotenv").config({ path: "Config/.env" });
}

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//local or dev
// app.use(cors());

app.use("*", cors({
   origin: true,
   credentials: true,
}))


// router import
app.use("/api/v1", require("./Router/ProductRouter"));
app.use("/api/v1", require("./Router/UserRouter"));
app.use("/api/v1", require("./Router/OrderRouter"));
app.use("/api/v1", require("./Router/UploadImagesRouter"));
app.use("/api/v1", require("./Router/PaymentRouter"));

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
