=== FlexiGrow Web Forms ===
Contributors: yourname
Tags: forms, contact form, newsletter, react, web components
Requires at least: 5.0
Tested up to: 6.4
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Modern React-based web components for WordPress. Beautiful contact forms and newsletter signups.

== Description ==

FlexiGrow Web Forms provides modern, beautiful web components for your WordPress site:

* Contact Form - Full-featured contact form with validation
* Newsletter Signup - Email collection form
* Built with React, TypeScript, and Tailwind CSS
* Form validation using Zod
* Mobile responsive
* Accessible (WCAG 2.1)

= Features =

* Beautiful, modern UI
* Form validation
* Shortcode support
* REST API integration
* Event tracking support
* Shadow DOM (no style conflicts)

= Usage =

**Contact Form:**
`[contact_form title="Get in Touch" button-text="Send"]`

**Newsletter:**
`[newsletter title="Subscribe" show-name="true"]`

**HTML:**
```html
<contact-form 
  title="Contact Us"
  api-endpoint="<?php echo rest_url('flexigrow/v1/contact'); ?>"
></contact-form>
```

== Installation ==

1. Upload the plugin files to `/wp-content/plugins/flexigrow-webforms/`
2. Upload the component JavaScript files to `/wp-content/plugins/flexigrow-webforms/assets/`
3. Activate the plugin through the 'Plugins' screen in WordPress
4. Use shortcodes or HTML tags in your pages

== Frequently Asked Questions ==

= Do I need to know React to use this? =

No! Just use the shortcodes or HTML tags. The plugin handles everything.

= Will it work with my theme? =

Yes! The components use Shadow DOM, so they won't conflict with your theme's styles.

= How do I customize the forms? =

You can pass attributes like title, description, button-text, etc. See the documentation.

== Changelog ==

= 1.0.0 =
* Initial release
* Contact form component
* Newsletter signup component
* Shortcode support
* REST API endpoints

