# mailgen
[![npm version](https://badge.fury.io/js/mailgen.svg)](https://www.npmjs.com/package/mailgen)

A Node.js package that generates clean, responsive HTML e-mails for sending transactional mail.

## Demo

![Welcome](https://raw.github.com/eladnava/mailgen/master/screenshots/default/welcome.png) 

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
        name: 'Mailgen'
    }
});
```

Check out the following examples to start generating e-mail templates:

## Welcome E-mail

```js
// Generate "welcome" e-mail body using mailgen
var emailBody = mailGenerator.generate({
    type: 'welcome',
    body: {
        name: 'John Appleseed',
        action: {
            text: 'Confirm your account',
            link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
        }
    }
});

// `emailBody` now contains the HTML body.
// It's up to you to send the e-mail. 
// Check out nodemailer to accomplish this: 
// https://nodemailer.com/
```

![Welcome](https://raw.github.com/eladnava/mailgen/master/screenshots/default/welcome.png) 

## Reset Password E-mail

```js
// Generate "reset password" e-mail body using mailgen
var emailBody = mailGenerator.generate({
    type: 'reset_password',
    body: {
        name: 'John Appleseed',
        action: {
            link: 'https://mailgen.js/reset?s=b350163a1a010d9729feb74992c1a010'
        }
    }
});

// `emailBody` now contains the HTML body.
// It's up to you to send the e-mail. 
// Check out nodemailer to accomplish this: 
// https://nodemailer.com/
```

![Reset Password](https://raw.github.com/eladnava/mailgen/master/screenshots/default/reset_password.png) 

## Reset Confirmation E-mail

```js
// Generate "reset confirmation" e-mail body using mailgen
var emailBody = mailGenerator.generate({
    type: 'reset_confirmation',
    body: {
        name: 'John Appleseed',
        action: {
            link: 'https://mailgen.js/login'
        }
    }
});

// `emailBody` now contains the HTML body.
// It's up to you to send the e-mail. 
// Check out nodemailer to accomplish this: 
// https://nodemailer.com/
```

![Reset Confirmation](https://raw.github.com/eladnava/mailgen/master/screenshots/default/reset_confirmation.png) 

## Supported Types

The following e-mail types are currently supported:

* `welcome`
* `reset_password`
* `reset_confirmation`

## Supported Themes

The following open-source themes are bundled with this package:

* `default` - [Postmark Transactional Email Templates](https://github.com/wildbit/postmark-templates)

We thank the contributing authors for creating these themes.

## Contributing

* Want to add another theme?
* Have an idea for a new e-mail type?

Open an issue and let's talk about it!

## License

Apache 2.0