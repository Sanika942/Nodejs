const Service = require("../models/service.model.js");

exports.findAll = (req, res) => {
  Service.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};

exports.findOne = (req, res) => {
  Service.findOne({ type: req.params.type })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Service not found" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
