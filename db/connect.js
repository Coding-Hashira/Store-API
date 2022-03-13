// mongodb+srv://jashan:jashan123mago456@mern-projects.2mora.mongodb.net/products?retryWrites=true&w=majority
const mongoose = require("mongoose");

const connectToDb = (url) => {
  return mongoose.connect(url);
};

module.exports = connectToDb;
