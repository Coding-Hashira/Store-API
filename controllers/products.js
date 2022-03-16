const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  // Numeric Filters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "=": "$e",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
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
};
