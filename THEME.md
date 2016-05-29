# Creating a Theme

Here are instructions for creating a new built-in Mailgen theme.

1. Create a new directory inside `themes` with the desired theme name
2. Create an `index.html` file and an `index.txt` file within your theme directory
3. Copy the contents of `themes/defaults/index.txt` to your `index.txt` file (we may change this in the future)
4. Paste your custom template HTML into the `index.html` file you created

Now, all that's left is to inject the e-mail variables into your template.

## Product Name Injection

The following will inject the product name into the template.

```html
<%- product.name %>
```

## Product Branding Injection

The following will inject either the product logo or name into the template.

```html
<% if (locals.product.logo) { %>
    <img src="<%- product.logo %>" class="email-logo" />
<% } else { %>
    <%- product.name %>
<% } %>
```

> It's a good idea to add the following CSS declaration to set `max-height: 50px` for the logo:

```css
.email-logo {
    max-height: 50px;
}
```

## Recipient Name Injection

The following will inject the recipient's name into the e-mail.

```html
<%- name %>
```

## Intro Injection

The following will inject the intro text into the e-mail:

```html
<%- intro %>
```

## Outro Injection

The following will inject the outro text into the e-mail:

```html
<%- outro %>
```

## Action Injection

The following will inject the action link (or button) into the e-mail:

```html
<!-- Action -->
<% if (locals.action) { %>
    <p><%- action.instructions %></p>
    <a href="<%- action.button.link %>" class="button--<%- action.button.color %>" target="_blank">
        <%- action.button.text %>
    </a>
<% } %>
```

## Table Injection

The following will inject the table into the e-mail:

```html
<!-- Table -->
<% if (locals.table) { %>
<table class="data-table" width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <% for (var column in table.data[0]) {%>
        <th
            <% if(locals.table.columns && locals.table.columns.customWidth && locals.table.columns.customWidth[column]) { %>
                width="<%= table.columns.customWidth[column] %>" 
            <% } %>
            <% if(locals.table.columns && locals.table.columns.customAlignment && locals.table.columns.customAlignment[column]) { %>
                style="text-align:<%= table.columns.customAlignment[column] %>" 
            <% } %>
        >
            <p><%- column.charAt(0).toUpperCase() + column.slice(1) %></p>
        </th>
        <% } %>
    </tr>
    <% for (var i in table.data) {%>
    <tr>
        <% for (var column in table.data[i]) {%>
        <td
            <% if(locals.table.columns && locals.table.columns.customAlignment && locals.table.columns.customAlignment[column]) { %>
                style="text-align:<%= table.columns.customAlignment[column] %>" 
            <% } %>
        >
            <%- table.data[i][column] %>
        </td>
        <% } %>
    </tr>
    <% } %>
</table>
<% } %>
```

## Copyright Injection

The following will inject the copyright symbol, the current year, and the product name into the e-mail:

```html
&copy; <%- new Date().getFullYear() %> <a href="<%- product.link %>" target="_blank"><%- product.name %></a>. All rights reserved.
```

## Go-To Action Injection

In order to support Gmail's [Go-To Actions](https://developers.google.com/gmail/markup/reference/go-to-action), add the following anywhere within the template:

```html
<!-- Support for Gmail Go-To Actions -->
<% if (locals.goToAction) { %>
    <script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "EmailMessage",
        "potentialAction": {
            "@type": "ViewAction",
            "url": "<%- goToAction.link %>",
            "target": "<%- goToAction.link %>",
            "name": "<%- goToAction.text %>"
        },
        "description": "<%- goToAction.description %>"
    }
    </script>
<% } %>
```

## Submit PR

Once you're done testing the theme using the `examples/*.js` scripts, take screenshots of the theme and place them into the `screenshots/` directory.

Finally, submit a PR with the new theme and screenshot files, and we'll let you know if anything's missing!

Thanks again for your contribution!