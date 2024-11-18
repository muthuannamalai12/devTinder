const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const checkUserAccess = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token not valid");
    }
    const decodedMessage = await jwt.verify(token, "Muthu");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).send("ERROR :" + err.message);
  }
};

module.exports = {
  checkUserAccess,
};
