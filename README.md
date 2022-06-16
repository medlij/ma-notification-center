# ma-notification-center


ma-notification-center is a package to be used by mobilearts to send internal notifications via sms, email or telegram.

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
var params = {
    to_email: "example@mail.com", /*required*/
    cc_email: "example2@mail.com",
    message: { /*required*/
      subject: "String", /*required*/
      body_text: "String", /* both body params cannot be empty*/
      body_html: "String", 
    }
}
    
notifications.sendEmail(params)
```

For Telegram

```sh
var params = {
    chat_id: -123456789, /*required can be number or string*/
    text: "String", /*required*/
}
    
notifications.sendTelegram(params)
```

For SMS

```sh
var params = {
    phonenumber: 961XXXXXX, /*required with country code*/
    text: "String", /*required*/
}
    
notifications.sendSMS(params)
```
