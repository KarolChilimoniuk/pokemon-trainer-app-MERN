const getMain = async (req, res) => {
  try {
    res.send("Hello World!");
  } catch (err) {
    res.send("Server error :(");
  }
};

module.exports = getMain;
