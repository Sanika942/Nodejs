const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  detail: {
    type: [String], // Assuming detail is an array of strings
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
