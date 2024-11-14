const mongoose = require("mongoose");

const connectToDb = async () => {
  await mongoose.connect(
    "mongodb+srv://muthuannamalai:tvm22111976@muthu-annamalai.e7nqp.mongodb.net/devTinder"
  );
};

module.exports = {
  connectToDb,
};
