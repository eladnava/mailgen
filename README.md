# mailgen
[![npm version](https://badge.fury.io/js/mailgen.svg)](https://www.npmjs.com/package/mailgen)

A Node.js package that generates clean, responsive HTML e-mails for sending transactional mail.

## Demo

<img src="https://raw.github.com/eladnava/mailgen/master/screenshots/default/1.png" height="400" /> 
<img src="https://raw.github.com/eladnava/mailgen/master/screenshots/default/2.png" height="300" /> 
<img src="https://raw.github.com/eladnava/mailgen/master/screenshots/default/3.png" height="300" /> 
<img src="https://raw.github.com/eladnava/mailgen/master/screenshots/default/4.png" height="300" /> 

## Usage

First, install the package using npm:

```shell
npm install mailgen --save
```

Then, start using the package by importing and configuring it:

```js
var Mailgen = require('mailgen');

// Configure mailgen by setting a theme and specifying your product name
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Mailgen',
        link: 'https://mailgen.js/'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});
```

Next, generate an e-mail using the following code:

```js
// Generate e-mail body using mailgen
var emailBody = mailGenerator.generate({
    body: {
        name: 'John Appleseed',
        intro: 'Welcome to Mailgen! We’re very excited to have you on board.',
        action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
                color: 'green',
                text: 'Confirm Your Account',
                link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
});

// `emailBody` now contains the HTML body.
// It's up to you to send the e-mail. 
// Check out nodemailer to accomplish this: 
// https://nodemailer.com/
```

![Welcome](https://raw.github.com/eladnava/mailgen/master/screenshots/default/1.png) 

## More Examples

#### Reset Password E-mail

```js
// Generate e-mail body using mailgen
var emailBody = mailGenerator.generate({
    body: {
        name: 'John Appleseed',
        intro: 'You have received this email because a password reset request for your account was received.',
        action: {
            instructions: 'Click the button below to reset your password:',
            button: {
                color: 'red',
                text: 'Reset Your Password',
                link: 'https://mailgen.js/reset?s=b350163a1a010d9729feb74992c1a010'
            }
        },
        outro: 'If you did not request a password reset, no further action is required on your part.'
    }
});
```

![Reset Password](https://raw.github.com/eladnava/mailgen/master/screenshots/default/2.png) 

#### Reset Password Confirmation E-mail

```js
// Generate e-mail body using mailgen
var emailBody = mailGenerator.generate({
    body: {
        name: 'John Appleseed',
        intro: 'Your Mailgen account password has been reset successfully.',
        action: {
            instructions: 'Click the button below to sign in to your account:',
            button: {
                color: 'blue',
                text: 'Sign in to Mailgen',
                link: 'https://mailgen.js/login'
            }
        },
        outro: 'If you did not request a password reset, please reply to this e-mail and let us know immediately.'
    }
});
```

![Reset Password Confirmation](https://raw.github.com/eladnava/mailgen/master/screenshots/default/3.png) 

#### Subscription Renewal E-mail

```js
// Generate e-mail body using mailgen
var emailBody = mailGenerator.generate({
    body: {
        name: 'John Appleseed',
        intro: 'Your subscription has been renewed successfully.',
        action: {
            instructions: 'You can review your purchase and check your account balance in your dashboard:',
            button: {
                color: 'blue',
                text: 'Go to Dashboard',
                link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
            }
        },
        outro: 'We hope you enjoy what we have to offer.'
    }
});
```

![Subscription Renewal](https://raw.github.com/eladnava/mailgen/master/screenshots/default/4.png) 

## Supported Themes

The following open-source themes are bundled with this package:

* `default` - [Postmark Transactional Email Templates](https://github.com/wildbit/postmark-templates)

We thank the contributing authors for creating these themes.

## Troubleshooting

1. After sending multiple e-mails to the same Gmail / Inbox address, they become grouped and truncated since they contain similar text, breaking the responsive template layout.

> Simply sending the `X-Entity-Ref-ID` header with your e-mails will prevent grouping / truncation. 

## Contributing

* Want to add another theme?
* Have an idea for a new e-mail type?

Open an issue and let's talk about it!

## License

Apache 2.0