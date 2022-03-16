require("dotenv").config();

const connectToDb = require("./db/connect");
const Product = require("./models/product");

const dummyProducts = require("./products.json");

const start = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);
    console.log("Connected To Mongo!");
    await Product.deleteMany();
    await Product.create(dummyProducts);
    console.log("Added Products!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
