const express = require("express");

const userRouter = express.Router();

const { checkUserAccess } = require("../middleware/auth");
const { ConnectionRequest } = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName imageUrl age gender aboutUs skills";

userRouter.get("/user/requests/received", checkUserAccess, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // .populate("fromUserId", ["firstName", "lastName", "imageUrl", "age", "gender", "aboutUs", "skills"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

userRouter.get("/user/connections", checkUserAccess, async (req, res) => {
  const loggedInUser = req.user;

  const connectionRequest = await ConnectionRequest.find({
    $or: [
      { fromUserId: loggedInUser._id, status: "accepted" },
      { toUserId: loggedInUser._id, status: "accepted" },
    ],
  })
    .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);

  const data = connectionRequest.map((request) => {
    // Checking if the logged in user is present in the fromUser id then he has sent the request so we are getting the touserId as his connections
    if (request.fromUserId._id.toString() === loggedInUser._id.toString()) {
      return request.toUserId;
    } else {
      // If the logged in user is not present in the fromUserId he has received a request so getting the fromUserId as his connection
      return request.fromUserId;
    }
  });

  res.json({
    data,
  });
});

module.exports = {
  userRouter,
};
