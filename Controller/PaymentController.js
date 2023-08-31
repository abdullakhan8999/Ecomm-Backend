const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY);

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
   res.status(200).json({
      status: "success",
      stripeApiKey: process.env.STRIPE_API_KEY
   });
})


exports.processPayment = catchAsyncError(async (req, res, next) => {
   try {
      const myPayment = await stripe.paymentIntents.create({
         amount: req.body.amount,
         currency: "inr",
         metadata: {
            company: "Ecommerce",
         }
      })
      res
         .status(200)
         .json({
            status: "success",
            clint_secret: myPayment.client_secret
         })
   } catch (error) {
      console.log("Error in PaymentController.processPayment", error);
      return next(new ErrorHandler("Something Went Wrong", 500));
   }
})