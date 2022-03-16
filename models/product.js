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
  image: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    minlength: 50,
    maxlength: 500,
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
        "Books",
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
