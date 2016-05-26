var fs = require('fs');
var ejs = require('ejs');
var juice = require('juice');

// Package constructor
function Mailgen(options) {
    // Set options as instance members
    this.product = options.product;
    this.theme = options.theme || 'default';

    // No product?
    if (!this.product || typeof this.product !== 'object') {
        throw new Error('Please provide the `product` object.');
    }

    // No product name or link?
    if (!this.product.name || !this.product.link) {
        throw new Error('Please provide the product name and link.');
    }

    // Build path to theme file
    var themePath;

    // Passed in a custom theme path?
    if (typeof this.theme === 'object' && this.theme.path) {
        themePath = this.theme.path;
    }
    else {
        // Build path to mailgen theme
        themePath = __dirname + '/themes/' + this.theme + '.html';
    }

    // Bad path?
    if (!fs.existsSync(themePath)) {
        throw new Error('You have specified an invalid theme.');
    }

    // Load theme (sync) and cache it for later
    this.theme = fs.readFileSync(themePath, 'utf8');
}

// HTML e-mail generator
Mailgen.prototype.generate = function (params) {
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

    // Prepare data to be passed to ejs engine
    var ejsParams = {
        product: this.product
    };

    // Pass provided body to ejs
    for (var k in body) {
        ejsParams[k] = body[k];
    }

    // Fetch cached theme HTML
    var output = this.theme;

    // Render the theme with ejs, injecting the data accordingly
    output = ejs.render(output, ejsParams);

    // Inline CSS
    output = juice(output);

    // All done!
    return output;
};

// Expose the Mailgen class
module.exports = Mailgen;
