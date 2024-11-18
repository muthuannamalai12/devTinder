const express = require("express");

const { checkUserAccess } = require("../middleware/auth");

const { validateUpdateData, validatePassword } = require("../utils/validator");

const bcrpyt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", checkUserAccess, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    return res.status(500).send("Error " + err.message);
  }
});

profileRouter.patch("/profile/edit", checkUserAccess, async (req, res) => {
  try {
    if (!validateUpdateData(req)) {
      throw new Error("Update Fields");
    }
    const loggedInUser = req.user;
    // Wrong way of doing it
    // loggedInUser.firstName = req.body.firstName;
    // loggedInUser.lastName = req.body.lastName;

    // Correct way
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );
    await loggedInUser.save();
    // res.send("Update Successfull");
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

profileRouter.patch(
  "/profile/edit/password",
  checkUserAccess,
  async (req, res) => {
    try {
      const { password } = req?.body;
      validatePassword(req);
      const loggedInUser = req.user;
      loggedInUser.password = await bcrpyt.hash(password, 10);
      await loggedInUser.save();
      res.json({
        message: "Password has been updated successfully",
      });
    } catch (err) {
      res.status(500).send("ERROR " + err.message);
    }
  }
);

module.exports = {
  profileRouter,
};
