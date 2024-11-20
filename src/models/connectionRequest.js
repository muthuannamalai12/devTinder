const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  status: {
    type: String,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: "{VALUE} is not supported",
    },
  },
});

// Compound Index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send request to yourself");
  }
  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = {
  ConnectionRequest,
};
