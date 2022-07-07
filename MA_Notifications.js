"use strict";
const SQSServices = require("./sqsServices.js");
const EmailValidator = require("email-validator");

class MA_Notifications {
  sqsServices = new SQSServices();
  arn = "https://sqs.eu-central-1.amazonaws.com/059256371462/notifications-";
  constructor() {}

  validateSmsParams(phonenumbers, text) {
    for (let i = 0; i < phonenumbers.length; i++) {
      if (
        phonenumbers[i].toString().length <= 6 ||
        phonenumbers[i].toString().length > 15
      ) {
        console.log("not a valid phone number", phonenumbers[i]);
        return;
      }
    }
    if (text.length < 3) {
      console.log("text is too short");
      return;
    }

    if (typeof text != "string") {
      console.log("invalid text");
      return;
    }
    return true;
  }

  async sendSMS(phonenumbers, text) {
    var url = this.arn + "sms";
    let ok_to_send = this.validateSmsParams(phonenumbers, text);
    if (ok_to_send === true) {
      let sms_params = {
        phonenumbers: phonenumbers,
        text: text,
      };
      return await this.sqsServices.PushToSQS(sms_params, url);
    } else {
      return "SMS not sent";
    }
  }

  validateEmailParams(
    to_emails,
    cc_emails,
    bcc_emails,
    subject,
    body_text,
    body_html
  ) {
    for (let i = 0; i < to_emails.length; i++) {
      if (EmailValidator.validate(to_emails[i]) == false) {
        console.log("invalid to email address", to_emails[i]);
        return;
      }
    }

    for (let i = 0; i < cc_emails.length; i++) {
      if (EmailValidator.validate(cc_emails[i]) == false) {
        console.log("invalid cc email address", cc_emails[i]);
        return;
      }
    }
    for (let i = 0; i < bcc_emails.length; i++) {
      if (EmailValidator.validate(bcc_emails[i]) == false) {
        console.log("invalid cc email address", bcc_emails[i]);
        return;
      }
    }

    if (subject == "" && body_text == "" && body_html == "") {
      console.log("subject and body are empty");
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

    return true;
  }

  async sendEmail(
    to_emails,
    cc_emails,
    bcc_emails,
    subject,
    body_text,
    body_html
  ) {
    var url = this.arn + "email";
    let ok_to_send = this.validateEmailParams(
      to_emails,
      cc_emails,
      bcc_emails,
      subject,
      body_text,
      body_html
    );
    if (ok_to_send === true) {
      let email_params = {
        to_emails: to_emails,
        cc_emails: cc_emails,
        bcc_emails: bcc_emails,
        message: {
          subject: subject,
          body_text: body_text,
          body_html: body_html,
        },
      };
      return await this.sqsServices.PushToSQS(email_params, url);
    } else {
      return "Email not sent";
    }
  }

  async sendTelegram(chat_ids, text) {
    var url = this.arn + "telegram";

    let ok_to_send = this.validateTelegramParams(chat_ids, text);
    if (ok_to_send === true) {
      let telegram_params = {
        chat_ids: chat_ids,
        text: text,
      };
      return await this.sqsServices.PushToSQS(telegram_params, url);
    } else {
      return "Telegram message not sent";
    }
  }

  validateTelegramParams(chat_ids, text) {
    for (let i = 0; i < chat_ids.length; i++) {
      if (
        chat_ids[i].toString().length <= 6 ||
        chat_ids[i].toString().length > 15
      ) {
        console.log("not a valid chat id", chat_ids[i]);
        return;
      }
    }

    if (text.length < 3) {
      console.log("text is too short");
      return;
    }

    if (typeof text != "string") {
      console.log("invalid text");
      return;
    }

    return true;
  }
}

module.exports = MA_Notifications;
