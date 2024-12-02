const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amt: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
  },
  code: {
    type: String,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
