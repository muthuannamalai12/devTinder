const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  emailId: {
    type: String,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
});

// module.exports = mongoose.Model(User, UserSchema);

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
