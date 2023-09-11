const express = require("express");
const router = express.Router();
const { processPayment, sendStripeApiKey } = require("../Controller/PaymentController");
const { isAuthenticatedUser } = require("../Middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/send_stripe_api_key").get(sendStripeApiKey);

module.exports = router;