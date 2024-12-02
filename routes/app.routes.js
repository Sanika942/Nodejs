module.exports = (app) => {
  const Service = require("../controllers/service.controller.js");
  const Request = require("../controllers/request.controller.js");
  const Member = require("../controllers/member.controller.js");

  app.get("/services", Service.findAll);
  app.get("/service/:type", Service.findOne);
  app.post("/service/:type/form", Request.create);
  app.post("/service/:type/calculate", Request.calculateEMI);
  app.put("/updaterequest", Request.updateRequest);
  app.delete("/deleterequest/:mobile", Request.delete);
  app.post("/member", Member.create);
  app.put("/updatepassword/:mobile", Member.updatePassword);
  app.delete("/cancelmember", Member.cancelMember);
};
