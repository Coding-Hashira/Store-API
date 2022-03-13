const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Waheguru!" });
};

module.exports = {
  getAllProducts,
};
