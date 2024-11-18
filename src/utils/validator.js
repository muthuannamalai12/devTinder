const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req?.body;
  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("Kindly enter the required  fields value");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Kindly enter correct emailId");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Kindly enter strong password");
  }
};

const validateUpdateData = (req) => {
  const { imageUrl, skills, firstName } = req?.body;

  if (!validator.isURL(imageUrl)) {
    throw new Error("Invalid Image URL");
  }
  if (skills.length > 10) {
    throw new Error("Skills cannot be more than 10");
  }
  if (!validator.isLength(firstName, { min: 4, max: 50 })) {
    throw new Error("First Name should be within 4-50 characters");
  }
  const allowedUpdates = [
    "firstName",
    "lastName",
    "gender",
    "aboutUs",
    "imageUrl",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowedUpdates.includes(key)
  );
  return isEditAllowed;
};

const validatePassword = (req) => {
  const { password } = req?.body;
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};
module.exports = {
  validateSignUpData,
  validateUpdateData,
  validatePassword,
};
