"use strict";
const SQSServices = require("./sqsServices.js");
const EmailValidator = require("email-validator");

class MA_Notifications {
  sqsServices = new SQSServices();
  arn = "https://sqs.eu-central-1.amazonaws.com/059256371462/notifications-"
  constructor() {}

  async sendSMS(data) {
    var url = this.arn + "sms";
    if (data["phonenumber"] && data["text"]) {
      var phonenumber = data["phonenumber"];
      var text = data["text"];

      if (text.length < 3) {
        console.log("text is too short");
        return;
      }
      if (
        phonenumber.toString().length <= 6 ||
        phonenumber.toString().length > 15
      ) {
        console.log("not a valid phone number");
        return;
      }

      if (typeof text != "string") {
        console.log("invalid text");
        return;
      }

      var params = {
        phonenumber: phonenumber,
        text: text,
      };

      console.log(params);
      this.sqsServices.PushToSQS(params, url);
    } else {
      console.log("phone number and text fields are required parameters");
      return;
    }
  }

  async sendEmail(body) {
    var url = this.arn + "email";
    if (body["message"] && body["to_email"]) {
      if (body["message"]["subject"]) {
        var subject = body["message"]["subject"];
      } else {
        var subject = "";
      }

      if (body["message"]["body_text"]) {
        var body_text = body["message"]["body_text"];
      } else {
        var body_text = "";
      }

      if (body["message"]["body_html"]) {
        var body_html = body["message"]["body_html"];
      } else {
        var body_html = "";
      }

      if (EmailValidator.validate(body["to_email"]) == false) {
        console.log("invalid to email address");
        return;
      }
      if (body["cc_email"]) {
        if (EmailValidator.validate(body["cc_email"]) == false) {
          console.log("invalid cc email address");
          return;
        }
      }
      if (subject == "" && body_text == "" && body_html == "") {
        console.log("message object is empty");
        return;
      }
      if (subject == "") {
        console.log("subject cannot be empty");
        return;
      }
      if (body_html == "" && body_text == "") {
        console.log("body of email cannot be empty");
        return;
      }

      this.sqsServices.PushToSQS(body, url);
    } else {
      console.log(
        "to email address , subject and email body are required fields"
      );
      return;
    }
  }

  async sendTelegram(data) {
    var url = this.arn + "telegram";
    if (data["text"] && data["chat_id"]) {
      var chat_id = data["chat_id"];
      var text = data["text"];

      if (text.length < 3) {
        console.log("text is too short");
        return;
      }

      if (chat_id.toString().length <= 6 || chat_id.toString().length > 15) {
        console.log("not a valid chat id");
        return;
      }

      if (typeof text != "string") {
        console.log("invalid text");
        return;
      }

      var params = {
        chat_id: chat_id,
        text: text,
      };

      console.log(params);
      this.sqsServices.PushToSQS(params, url);
    } else {
      console.log("chat id and text are required fields");
      return;
    }
  }
}

module.exports = MA_Notifications;
