const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  occupation: {
    type: String,
  },
  createpassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Member", MemberSchema);
