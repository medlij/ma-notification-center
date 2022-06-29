# ma-notification-center version #2


ma-notification-center is a package to be used by mobilearts to send internal notifications via sms, email or telegram.

> new updated package takes multiple notification recipients 

## Functions

- sendEmail(params)
- sendTelegram(params)
- sendSMS(params)


## Installation

Install the dependencies.

```sh
cd yourpath
npm i ma-notification-center
```

## Usage

After installation add requirment to your code
```sh
const MA_Notifications = require('ma-notification-center');
const notifications = new MA_Notifications();
```

For Email

```sh
/*to_emails and cc_emails are arrays*/
notifications.sendEmail(to_emails,cc_emails,subject,text_body,text_html)
```

For Telegram

```sh
/*chat_ids is an array*/
notifications.sendTelegram(chat_ids,text)
```

For SMS

```sh
/*phonenumbers is an array*/
notifications.sendSMS(phonenumbers, text)
```
