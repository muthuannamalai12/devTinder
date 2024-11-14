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

module.exports = {
  validateSignUpData,
};
