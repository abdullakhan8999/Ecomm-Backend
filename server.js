const app = require("./app");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const { connectDB } = require("./Config/ConfigDB");
const UserModel = require("./Models/UserModel");


// Init admin
const initAdmin = async () => {
  //get the admin email address
  const adminEmail = process.env.AdminEmail;
  try {
    //check if admin is already
    const existingAdmin = await UserModel.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    // if not, create a new admin
    const newAdmin = new UserModel({
      name: process.env.AdminName,
      email: process.env.AdminEmail,
      role: process.env.Role,
      password: process.env.AdminPassword,
    });

    // send responds
    await newAdmin.save();
    console.log("Admin is created.");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

//config
dotenv.config({ path: "Config/.env" });

//uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Message: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  server.close(() => {
    process.exit(1);
  });
});

//Db
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Server running
const server = app.listen(process.env.PORT, async () => {
  //init Admin
  await initAdmin();

  // log the port
  console.log(
    `Server is up and running! Access it at http://localhost:${process.env.PORT}`
  );
});

//unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Message: ${err.message}`);
  console.log("Shutting down server due to unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
