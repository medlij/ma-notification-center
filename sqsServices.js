var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-central-1" });

var sqs = new AWS.SQS();

class SQSServices {
  constructor() {}

  async PushToSQS(data, sqsUrl) {
    try {
      var params = {
        MessageBody: JSON.stringify(data),
        QueueUrl: sqsUrl,
      };
      sqs
        .sendMessage(params)
        .promise()
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = SQSServices;
