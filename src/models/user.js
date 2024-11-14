const mongoose = require("mongoose");

const validator = require("validator");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      // Without this the data will not be inserted to the DB
      required: true,
      // It should not be less than 4
      minLength: 4,
      // It should not be greater than 50
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    emailId: {
      type: String,
      // Without this the data will not be inserted to the DB
      required: true,
      // Will Allow only unique fields to be added will not allow duplicate
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(
            "Email Id is not valid. Please enter a valid email address"
          );
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender should be either male, female, or others");
        }
      },
    },
    password: {
      type: String,
      // Without this the data will not be inserted to the DB
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Kindly provide a strong password");
        }
      },
    },
    aboutUs: {
      type: String,
      // Sets a default value for the path
      default: "Default Value for About",
    },
    imageUrl: {
      type: String,
      // Sets a default value for the path
      default:
        "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.Model(User, UserSchema);

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
