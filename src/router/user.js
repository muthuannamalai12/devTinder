const express = require("express");

const userRouter = express.Router();

const { checkUserAccess } = require("../middleware/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { User } = require("../models/user");

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
  try {
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
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }

  res.json({
    data,
  });
});

userRouter.get("/user/feed", checkUserAccess, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    // Muthu Feed should contain all the cards except below
    // i) His own card
    // ii) The cards which he has sent request
    // iii) The cards which he has ignored
    // iv) The cards he has shown interest upon

    // Get the list of connection request sent or received by the logged in user
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideUsersFromFeed = new Set();

    // Adding those users in a set which will not allow duplicate values
    connectionRequest.map((request) => {
      hideUsersFromFeed.add(request.fromUserId);
      hideUsersFromFeed.add(request.toUserId);
    });

    const data = await User.find({
      $and: [
        // Feed api should not return the details of users from hideUsersFromFeed and his own details
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.json({
      data,
    });
  } catch (err) {
    res.status(500).send("ERROR " + err.message);
  }
});

module.exports = {
  userRouter,
};
