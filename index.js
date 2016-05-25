var fs = require('fs');
var ejs = require('ejs');
var juice = require('juice');

// Supported e-mail types
var supportedTypes = [
    'welcome',
    'reset_password',
    'reset_confirmation'
];

// Package constructor
function Mailgen(options) {
    // Set options as instance members
    this.theme = options.theme;
    this.product = options.product;

    // No theme - use default
    if (!this.theme) {
        this.theme = 'default';
    }

    // Build path to theme directory
    this.themePath = __dirname + '/templates/' + this.theme;
    
    // Bad theme?
    if (!fs.existsSync(this.themePath)) {
        throw new Error('You have specified an invalid theme.');
    }

    // No product?
    if (!this.product || typeof this.product !== 'object') {
        throw new Error('Please provide the `product` object.');
    }
    
    // No product name?
    if (!this.product.name) {
        throw new Error('Please provide the product name.');
    }
}

// HTML e-mail generator
Mailgen.prototype.generate = function (params) {
    // Basic params validation
    if (!params || typeof params !== 'object') {
        throw new Error('Please provide parameters for generating transactional e-mails.');
    }
    
    // Get transaction e-mail type & body params
    var type = params.type;
    var body = params.body;

    // Validate type
    if (supportedTypes.indexOf(type) === -1) {
        throw new Error('You have specified an invalid e-mail type.');
    }

    // Basic body validation
    if (!body || typeof body !== 'object') {
        throw new Error('Please provide the `body` parameter as an object.');
    }

    // Build path to template
    var templatePath = this.themePath + '/' + type + '.html';

    // Verify file exists
    if (!fs.existsSync(templatePath)) {
        throw new Error('The specified e-mail template file could not be loaded.');
    }

    // Load it (sync)
    var output = fs.readFileSync(templatePath, 'utf8');

    // Prepare data to be passed to ejs engine
    var templateData = {
        product: this.product
    };

    // Pass provided body to template
    for (var k in body) {
        templateData[k] = body[k];
    }

    // Render the template with ejs
    output = ejs.render(output, templateData);
    
    // Inline CSS
    output = juice(output);
    
    // All done!
    return output;
};

// Expose the Mailgen class
module.exports = Mailgen;
