const Member = require("../models/member.model.js");

exports.create = (req, res) => {
  if (!req.body.mobile || !req.body.email || !req.body.createpassword) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }

  const newMember = new Member({
    mobile: req.body.mobile,
    email: req.body.email,
    occupation: req.body.occupation,
    createpassword: req.body.createpassword,
  });

  newMember
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};

exports.updatePassword = (req, res) => {
  Member.findOneAndUpdate(
    { mobile: req.params.mobile },
    { createpassword: req.body.password },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Member not found" });
      }
      res.send({ message: "Password updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};

exports.cancelMember = (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).send({ message: "Mobile number is required" });
  }

  Member.findOneAndDelete({ mobile: mobile })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Member not found" });
      }
      res.send({ message: "Membership canceled successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while canceling membership",
      });
    });
};
