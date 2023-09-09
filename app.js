/*
const express = require("express");
const app = express();
const errorMiddleware = require("./Middleware/error");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
   require("dotenv").config({ path: "Config/.env" });
}

//middleware
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
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
app.use("/api/v1", require("./Router/contactsRouter"));

//Middleware for error
app.use(errorMiddleware);

module.exports = app;

*/

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

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());

// Routers
const routers = [
   "ProductRouter",
   "UserRouter",
   "OrderRouter",
   "UploadImagesRouter",
   "PaymentRouter",
   "contactsRouter",
];

routers.forEach((routerName) => {
   app.use("/api/v1", require(`./Router/${routerName}`));
});

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
