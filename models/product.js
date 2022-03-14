const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided!"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided!"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: null,
  },
  company: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    enum: {
      values: [
        "Sports",
        "Beauty",
        "Fashion",
        "Toys & Games",
        "Accessories",
        "Electronics",
        "Entertainment",
        "Others",
      ],
      message: "{VALUE} is not a valid category!",
    },
    default: "Others",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
