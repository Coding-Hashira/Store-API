require("dotenv").config();

const connectToDb = require("./db/connect");
const Product = require("./models/product");

const dummyProducts = require("./products.json");

const start = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(dummyProducts);
    console.log("Success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
