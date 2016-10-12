var Mailgen = require('../');

// Configure mailgen by setting a theme and your product info
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

// Prepare email contents
var email = {
    body: {
        name: 'John Appleseed',
        intro: 'Your order has been processed successfully.',
        table: {
            data: [
                {
                    item: 'Node.js',
                    description: 'Event-driven I/O server-side JavaScript environment based on V8.',
                    price: '$10.99'
                },
                {
                    item: 'Mailgen',
                    description: 'Programmatically create beautiful e-mails using plain old JavaScript.',
                    price: '$1.99'
                }
            ],
            columns: {
                // Optionally, customize the column widths
                customWidth: {
                    item: '20%',
                    price: '15%'
                },
                // Optionally, change column text alignment
                customAlignment: {
                    price: 'right'
                }
            }
        },
        action: {
            instructions: 'You can check the status of your order and more in your dashboard:',
            button: {
                color: '#3869D4',
                text: 'Go to Dashboard',
                link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
            }
        },
        outro: 'We thank you for your purchase.'
    }
};

// Generate an HTML email with the provided contents
var emailBody = mailGenerator.generate(email);

// Generate the plaintext version of the e-mail (for clients that do not support HTML)
var emailText = mailGenerator.generatePlaintext(email);

// Optionally, preview the generated HTML e-mail by writing it to a local file
require('fs').writeFileSync('preview.html', emailBody, 'utf8');
require('fs').writeFileSync('preview.txt', emailText, 'utf8');

// `emailBody` now contains the HTML body,
// and `emailText` contains the textual version.
// 
// It's up to you to send the e-mail.
// Check out nodemailer to accomplish this:
// https://nodemailer.com/

// Send the e-mail with your favorite mailer
// transporter.sendMail({
//     from: 'no-reply@mailgen.js',
//     to: 'target@email.com',
//     subject: 'Mailgen',
//     html: emailBody,
//     text: emailText,
// }, function (err) {
//     if (err) return console.log(err);
//     console.log('Message sent successfully.');
// });
