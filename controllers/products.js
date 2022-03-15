const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select("name price").limit(5);
  res.status(200).json({ productCount: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  // Search
  if (featured) {
    queryObject.featured = featured ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject); // list of products

  // Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // Select
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ productCount: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
