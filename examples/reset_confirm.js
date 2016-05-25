var Mailgen = require('../');

// Configure mailgen by setting a theme and specifying your product name
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Mailgen',
        link: 'https://mailgen.js/'
        // Optional logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});

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

// Optionally, preview the generated e-mail by writing it to a local file
require('fs').writeFileSync('preview.html', emailBody, 'utf8');

// `emailBody` now contains the HTML body.
// It's up to you to send the e-mail. 
// Check out nodemailer to accomplish this: 
// https://nodemailer.com/

// Send the e-mail with your favorite mailer
// transporter.sendMail({
//     from: 'no-reply@mailgen.js',
//     to: 'target@email.com',
//     subject: 'Mailgen',
//     body: emailBody
// }, function (err) {
//     if (err) return console.log(err);
//     console.log('Message sent successfully.');
// });