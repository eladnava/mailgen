var he = require('he');
var fs = require('fs');
var ejs = require('ejs');
var juice = require('juice');

// Package constructor
function Mailgen(options) {
    // Set options as instance members
    this.theme = options.theme;
    this.product = options.product;
    this.themeName = (typeof this.theme === 'string' && this.theme) ? this.theme : 'default';

    // No product?
    if (!this.product || typeof this.product !== 'object') {
        throw new Error('Please provide the `product` object.');
    }

    // No product name or link?
    if (!this.product.name || !this.product.link) {
        throw new Error('Please provide the product name and link.');
    }

    // Support for custom text direction (fallback to LTR)
    this.textDirection = options.textDirection || 'ltr';

    // Support for custom copyright (fallback to sensible default)
    this.product.copyright = this.product.copyright || '&copy; ' + new Date().getFullYear() + ' <a href="' + this.product.link + '" target="_blank">' + this.product.name + '</a>. All rights reserved.';

    // Cache theme files for later to avoid spamming fs.readFileSync()
    this.cacheThemes();
}

function convertToArray(arr) {
    return Array.isArray(arr) ? arr : [arr].filter(Boolean)
}

function setupButtonFallbackText(btn) {
    // No fallback or false passed in?
    if (!btn.fallback) {
        return;
    }

    // Default fallback text requested?
    if (btn.fallback === true) {
        btn.fallback = {
            text: `If you're having trouble clicking the "${btn.text}" button, please copy and paste the following link into your web browser's address bar:`
        };
    }
}

Mailgen.prototype.cacheThemes = function () {
    // Build path to theme file (make it possible to pass in a custom theme path, fallback to mailgen-bundled theme)
    var themePath = (typeof this.theme === 'object' && this.theme.path) ? this.theme.path : __dirname + '/themes/' + this.themeName + '/index.html';


    // Bad theme path?
    if (!fs.existsSync(themePath)) {
        throw new Error('You have specified an invalid theme.');
    }

    // Load theme (sync) and cache it for later
    this.cachedTheme = fs.readFileSync(themePath, 'utf8');

    // Build path to plaintext theme file (make it possible to pass in a custom plaintext theme path, fallback to mailgen-bundled theme)
    var plaintextPath = (typeof this.theme === 'object' && this.theme.plaintextPath) ? this.theme.plaintextPath : __dirname + '/themes/' + this.themeName + '/index.txt';

    // Bad plaintext theme path?
    if (!fs.existsSync(plaintextPath)) {
        throw new Error('You have specified an invalid plaintext theme.');
    }

    // Keep this for referencing in ejs.render()
    this.themePath = themePath;

    // Load plaintext theme (sync) and cache it for later
    this.cachedPlaintextTheme = fs.readFileSync(plaintextPath, 'utf8');
};

// HTML e-mail generator
Mailgen.prototype.generate = function (params) {
    // Parse email params and get back an object with data to inject
    var ejsParams = this.parseParams(params);

    // Render the theme with ejs, injecting the data accordingly
    var output = ejs.render(this.cachedTheme, ejsParams, { filename: this.themePath });

    // Inline CSS
    output = juice(output);

    // All done!
    return output;
};

// Plaintext text e-mail generator
Mailgen.prototype.generatePlaintext = function (params) {
    // Parse email params and get back an object with data to inject
    var ejsParams = this.parseParams(params);

    // Render the plaintext theme with ejs, injecting the data accordingly
    var output = ejs.render(this.cachedPlaintextTheme, ejsParams);

    // Definition of the <br /> tag as a regex pattern
    var breakTag = /(?:\<br\s*\/?\>)/g;
    var breakTagPattern = new RegExp(breakTag);

    // Check the plaintext for html break tag, maintains backwards compatiblity
    if (breakTagPattern.test(this.cachedPlaintextTheme)) {
        // Strip all linebreaks from the rendered plaintext
        output = output.replace(/(?:\r\n|\r|\n)/g, '');

        // Replace html break tags with linebreaks
        output = output.replace(breakTag, '\n');

        // Remove plaintext theme indentation (tabs or spaces in the beginning of each line)
        output = output.replace(/^(?: |\t)*/gm, "");
    }

    // Strip all HTML tags from plaintext output
    output = output.replace(/<.+?>/g, '');

    // Decode HTML entities such as &copy;
    output = he.decode(output);

    // All done!
    return output;
};

// Validates, parses and returns injectable ejs parameters
Mailgen.prototype.parseParams = function (params) {
    // Basic params validation
    if (!params || typeof params !== 'object') {
        throw new Error('Please provide parameters for generating transactional e-mails.');
    }

    // Get body params to inject into theme
    var body = params.body;

    // Basic body validation
    if (!body || typeof body !== 'object') {
        throw new Error('Please provide the `body` parameter as an object.');
    }

    // Pass text direction to template
    body.textDirection = this.textDirection;

    // Only set greeting if greeting is not false (allow any greeting (name & title) to be optional)
    // Setting greeting to false will override title and name options
    if (body.greeting !== false) {
        // Support for custom greeting/signature (fallback to sensible defaults)
        body.greeting = body.greeting || 'Hi';

        // Use `greeting` or `name` for title if not set
        if (!body.title) {
            // Use name if provided, otherwise, default to greeting only
            body.title = (body.name ? body.greeting + ' ' + body.name : body.greeting) + ',';
        }
    }

    // Only set signature if signature is not false
    if (body.signature !== false) {
        body.signature = body.signature || 'Yours truly';
    }

    // Convert intro, outro, and action to arrays if a string or object is used instead
    body.intro = convertToArray(body.intro);
    body.outro = convertToArray(body.outro);
    body.action = convertToArray(body.action);

    // Enable multiple buttons per action
    for (var action of body.action) {
        action.button = convertToArray(action.button);

        // Set up default button fallback text
        for (var button of action.button) {
            setupButtonFallbackText(button);
        }
    }

    body.table = convertToArray(body.table);

    // Prepare data to be passed to ejs engine
    var ejsParams = {
        product: this.product
    };

    // Pass email body elements to ejs
    for (var k in body) {
        ejsParams[k] = body[k];
    }

    return ejsParams;
};

// Expose the Mailgen class
module.exports = Mailgen;
