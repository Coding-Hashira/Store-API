const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "phone";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  });
  res.status(200).json({ products, productCount: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, productCount: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
