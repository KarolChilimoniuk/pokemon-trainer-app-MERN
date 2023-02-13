const getMain = async (req, res) => {
  try {
    res.status(200).send("Hello World!");
  } catch (err) {
    res.status(500).send({ message: "Server error :(" });
  }
};

module.exports = getMain;
