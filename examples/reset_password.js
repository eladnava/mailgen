var Mailgen = require('../');

// Configure mailgen by setting a theme and specifying your product name
var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Mailgen'
    }
});

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