const Request = require("../models/request.model.js");

exports.create = (req, res) => {
  if (!req.body.mobile || !req.body.email || !req.body.amt || !req.body.type) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }

  const newRequest = new Request({
    mobile: req.body.mobile,
    email: req.body.email,
    amt: req.body.amt,
    type: req.body.type,
    msg: req.body.msg,
    code: req.body.code,
  });

  newRequest
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};

exports.calculateEMI = (req, res) => {
  const { amt, tenure, type } = req.body;

  // Define interest rates for different loan types
  const interestRates = {
    "Home Loan": 0.08, // 8% annual interest rate
    "Personal Loan": 0.12, // 12% annual interest rate
    "MI Loan": 0.1, // 10% annual interest rate
  };

  // Validate loan type
  if (!interestRates[type]) {
    return res.status(400).send({
      message: "Invalid loan type",
    });
  }

  const annualInterestRate = interestRates[type];
  const monthlyInterestRate = annualInterestRate / 12;
  const n = tenure; // tenure in months

  // EMI Calculation
  const emi =
    (amt * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n)) /
    (Math.pow(1 + monthlyInterestRate, n) - 1);

  res.send({
    message: "EMI calculated successfully",
    emi: emi.toFixed(2), // Return EMI rounded to two decimal places
  });
};

exports.updateRequest = (req, res) => {
  const { mobile, service, type, remarks } = req.body;

  if (!mobile || !service || !type || !remarks) {
    return res.status(400).send({ message: "All fields are required" });
  }

  Request.findOneAndUpdate(
    { mobile: mobile }, // Search by mobile number
    { service: service, type: type, remarks: remarks }, // Update fields
    { new: true } // Return the updated document
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Request not found" });
      }
      res.send({
        message: "Request updated successfully",
        updatedRequest: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the request",
      });
    });
};

exports.delete = (req, res) => {
  Request.findOneAndDelete({ mobile: req.params.mobile })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Request not found" });
      }
      res.send({ message: "Request deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred" });
    });
};
