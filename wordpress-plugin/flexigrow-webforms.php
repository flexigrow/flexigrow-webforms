<?php
/**
 * Plugin Name: FlexiGrow Web Forms
 * Plugin URI: https://yoursite.com
 * Description: Modern React-based web components for WordPress (Contact Form, Newsletter, etc.)
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yoursite.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: flexigrow-webforms
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('FLEXIGROW_VERSION', '1.0.0');
define('FLEXIGROW_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FLEXIGROW_PLUGIN_URL', plugin_dir_url(__FILE__));

// Enqueue all web components
function flexigrow_enqueue_webforms() {
    $components = [
        'contact-form' => 'ContactForm.js',
        'newsletter-signup' => 'NewsletterSignup.js',
        // Optional: R2W versions
        // 'contact-form-r2w' => 'ContactFormR2W.js',
        // 'newsletter-signup-r2w' => 'NewsletterSignupR2W.js',
    ];

    foreach ($components as $handle => $filename) {
        wp_enqueue_script(
            $handle,
            FLEXIGROW_PLUGIN_URL . 'assets/' . $filename,
            array(),
            FLEXIGROW_VERSION,
            true
        );
    }
    
    // Add type="module" attribute to make ES modules work
    add_filter('script_loader_tag', 'flexigrow_add_type_module', 10, 3);
}
add_action('wp_enqueue_scripts', 'flexigrow_enqueue_webforms');

function flexigrow_add_type_module($tag, $handle, $src) {
    // Add type="module" to our web components
    $module_handles = ['contact-form', 'newsletter-signup', 'contact-form-r2w', 'newsletter-signup-r2w'];
    if (in_array($handle, $module_handles)) {
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}

// Create REST API endpoint for contact form
add_action('rest_api_init', function () {
    register_rest_route('flexigrow/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'flexigrow_handle_contact_form',
        'permission_callback' => '__return_true'
    ));
});

function flexigrow_handle_contact_form($request) {
    $data = $request->get_json_params();
    
    // Sanitize inputs
    $name = sanitize_text_field($data['name'] ?? '');
    $email = sanitize_email($data['email'] ?? '');
    $phone = sanitize_text_field($data['phone'] ?? '');
    $subject = sanitize_text_field($data['subject'] ?? '');
    $message = sanitize_textarea_field($data['message'] ?? '');
    
    // Validate
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        return new WP_Error(
            'missing_fields',
            'Please fill in all required fields',
            array('status' => 400)
        );
    }
    
    if (!is_email($email)) {
        return new WP_Error(
            'invalid_email',
            'Please enter a valid email address',
            array('status' => 400)
        );
    }
    
    // Send email
    $to = get_option('admin_email');
    $email_subject = 'New Contact Form: ' . $subject;
    $email_body = sprintf(
        "Name: %s\nEmail: %s\nPhone: %s\n\nMessage:\n%s",
        $name,
        $email,
        $phone,
        $message
    );
    
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $email,
    );
    
    $sent = wp_mail($to, $email_subject, $email_body, $headers);
    
    if ($sent) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Thank you! We will get back to you soon.',
        ), 200);
    } else {
        return new WP_Error(
            'email_failed',
            'Failed to send email. Please try again.',
            array('status' => 500)
        );
    }
}

// Create REST API endpoint for newsletter
add_action('rest_api_init', function () {
    register_rest_route('flexigrow/v1', '/newsletter', array(
        'methods' => 'POST',
        'callback' => 'flexigrow_handle_newsletter',
        'permission_callback' => '__return_true'
    ));
});

function flexigrow_handle_newsletter($request) {
    $data = $request->get_json_params();
    
    $email = sanitize_email($data['email'] ?? '');
    $firstName = sanitize_text_field($data['firstName'] ?? '');
    
    if (empty($email) || !is_email($email)) {
        return new WP_Error(
            'invalid_email',
            'Please enter a valid email address',
            array('status' => 400)
        );
    }
    
    // Here you would integrate with your newsletter service
    // Examples: Mailchimp, SendGrid, etc.
    
    // For now, just send a notification email
    $to = get_option('admin_email');
    $subject = 'New Newsletter Signup';
    $message = sprintf(
        "New newsletter subscription:\nName: %s\nEmail: %s",
        $firstName ?: 'Not provided',
        $email
    );
    
    wp_mail($to, $subject, $message);
    
    return new WP_REST_Response(array(
        'success' => true,
        'message' => 'Successfully subscribed!',
    ), 200);
}

// Shortcode for contact form
function flexigrow_contact_form_shortcode($atts) {
    wp_enqueue_script('contact-form');
    
    $atts = shortcode_atts(array(
        'title' => 'Contact Us',
        'description' => 'Fill out the form below',
        'button-text' => 'Send Message',
    ), $atts);
    
    return sprintf(
        '<contact-form 
            title="%s" 
            description="%s" 
            submit-button-text="%s"
            api-endpoint="%s"
        ></contact-form>',
        esc_attr($atts['title']),
        esc_attr($atts['description']),
        esc_attr($atts['button-text']),
        esc_url(rest_url('flexigrow/v1/contact'))
    );
}
add_shortcode('contact_form', 'flexigrow_contact_form_shortcode');

// Shortcode for newsletter
function flexigrow_newsletter_shortcode($atts) {
    wp_enqueue_script('newsletter-signup');
    
    $atts = shortcode_atts(array(
        'title' => 'Subscribe to Newsletter',
        'description' => 'Get updates in your inbox',
        'button-text' => 'Subscribe',
        'show-name' => 'false',
    ), $atts);
    
    return sprintf(
        '<newsletter-signup 
            title="%s" 
            description="%s" 
            button-text="%s"
            show-name-field="%s"
            api-endpoint="%s"
        ></newsletter-signup>',
        esc_attr($atts['title']),
        esc_attr($atts['description']),
        esc_attr($atts['button-text']),
        esc_attr($atts['show-name']),
        esc_url(rest_url('flexigrow/v1/newsletter'))
    );
}
add_shortcode('newsletter', 'flexigrow_newsletter_shortcode');

