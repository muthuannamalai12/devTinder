const express = require("express");

const { checkUserAccess } = require("../middleware/auth");

const { ConnectionRequest } = require("../models/connectionRequest");

const { User } = require("../models/user");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  checkUserAccess,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const firstName = req.user.firstName;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // 1. Check if the status is valid before proceeding
      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      // 3. Check if a connection request already exists between A and B or between B and A
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(500).json({
          message: "Connection Request Already Exists",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      // The pre-save hook is invoked here when save() is called
      const data = await connectionRequest.save();

      if (status === "interested") {
        res.json({
          message: firstName + " is" + status + " on your profile",
          data,
        });
      } else {
        res.json({
          message: firstName + status + " the connection request",
          data,
        });
      }
    } catch (err) {
      res.status(500).send("ERROR : " + err.message);
    }
  }
);

connectionRequestRouter.post(
  "/request/review/:status/:requestId",
  checkUserAccess,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      // Need to check the below
      // i) Validate the status coming from the request it should only be accepted or rejected
      // ii) Validate the requestId
      // iii) Check if the user who is accepting the request is the one who is present in toUserId and he is only logged in (i.e) Should not allow the user who sent to accept the request
      // iv) If the request is in only interested state only it can be accepted

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(500).json({
          message: "Connection Request Could not be Found",
        });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Connection Request" + status,
        data,
      });
    } catch (err) {
      res.status(500).send("ERROR : " + err.message);
    }
  }
);

module.exports = {
  connectionRequestRouter,
};
