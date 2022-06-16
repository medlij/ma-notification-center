"use strict";
const NotificationCenter = require("./NotificationCenter.js");

module.exports.Main = async (event) => {
  const notifications = new NotificationCenter();
  var body = event

  notifications.sendSMS(body);
};
