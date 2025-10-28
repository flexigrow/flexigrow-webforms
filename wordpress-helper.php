<?php
/**
 * FlexiGrow Web Forms - WordPress Helper
 * 
 * Copy this code to your theme's functions.php or create a simple plugin
 */

// Enqueue all web components
function flexigrow_enqueue_webforms() {
    $components = [
        'multi-step-form' => 'MultiStepForm.js',
        'general-business-form' => 'GeneralBusinessForm.js',
        'cleaners-form' => 'Cleaners.js',
    ];

    foreach ($components as $handle => $filename) {
        wp_enqueue_script(
            $handle,
            get_template_directory_uri() . '/js/' . $filename,
            array(),
            '1.0.0',
            true
        );
    }
    
    // Add type="module" attribute to make ES modules work
    add_filter('script_loader_tag', 'flexigrow_add_type_module', 10, 3);
}
add_action('wp_enqueue_scripts', 'flexigrow_enqueue_webforms');

function flexigrow_add_type_module($tag, $handle, $src) {
    // Add type="module" to our web components
    $module_handles = ['multi-step-form', 'general-business-form', 'cleaners-form'];
    if (in_array($handle, $module_handles)) {
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}

// Create REST API endpoints for all forms
add_action('rest_api_init', function () {
    // Multi-step form endpoint
    register_rest_route('flexigrow/v1', '/quote', array(
        'methods' => 'POST',
        'callback' => 'flexigrow_handle_quote_form',
        'permission_callback' => '__return_true'
    ));
    
    // General business form endpoint
    register_rest_route('flexigrow/v1', '/general-business-quote', array(
        'methods' => 'POST',
        'callback' => 'flexigrow_handle_general_business_form',
        'permission_callback' => '__return_true'
    ));
    
    // Cleaners form endpoint
    register_rest_route('flexigrow/v1', '/cleaners-quote', array(
        'methods' => 'POST',
        'callback' => 'flexigrow_handle_cleaners_form',
        'permission_callback' => '__return_true'
    ));
});

function flexigrow_handle_quote_form($request) {
    $data = $request->get_json_params();
    
    // Sanitize Step 1 data (Your Details)
    $your_name = sanitize_text_field($data['1']['yourName'] ?? '');
    $business_name = sanitize_text_field($data['1']['businessName'] ?? '');
    $abn = sanitize_text_field($data['1']['abn'] ?? '');
    $address = sanitize_text_field($data['1']['address'] ?? '');
    $website = esc_url_raw($data['1']['website'] ?? '');
    $email = sanitize_email($data['1']['email'] ?? '');
    $phone = sanitize_text_field($data['1']['phoneNumber'] ?? '');
    
    // Validate required fields
    if (empty($your_name) || empty($business_name) || empty($email)) {
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
    
    // Send email notification
    $to = get_option('admin_email');
    $subject = 'New Insurance Quote Request - ' . $business_name;
    $email_body = sprintf(
        "New Insurance Quote Request\n\n" .
        "Your Details:\n" .
        "Name: %s\n" .
        "Business Name: %s\n" .
        "ABN: %s\n" .
        "Address: %s\n" .
        "Website: %s\n" .
        "Email: %s\n" .
        "Phone: %s\n\n" .
        "Full Form Data:\n%s",
        $your_name,
        $business_name,
        $abn,
        $address,
        $website ?: 'Not provided',
        $email,
        $phone,
        print_r($data, true)
    );
    
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $email,
    );
    
    // Save to database (optional)
    // You can create a custom post type or use a plugin like Gravity Forms
    
    $sent = wp_mail($to, $subject, $email_body, $headers);
    
    if ($sent) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Thank you! Your quote request has been submitted.',
        ), 200);
    } else {
        return new WP_Error(
            'email_failed',
            'Failed to submit your request. Please try again.',
            array('status' => 500)
        );
    }
}

function flexigrow_handle_general_business_form($request) {
    $data = $request->get_json_params();
    
    // Sanitize Step 1 data (Your Details)
    $your_name = sanitize_text_field($data['1']['yourName'] ?? '');
    $business_name = sanitize_text_field($data['1']['businessName'] ?? '');
    $abn = sanitize_text_field($data['1']['abn'] ?? '');
    $address = sanitize_text_field($data['1']['address'] ?? '');
    $website = esc_url_raw($data['1']['website'] ?? '');
    $email = sanitize_email($data['1']['email'] ?? '');
    $phone = sanitize_text_field($data['1']['phoneNumber'] ?? '');
    
    // Validate required fields
    if (empty($your_name) || empty($business_name) || empty($email)) {
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
    
    // Send email notification
    $to = get_option('admin_email');
    $subject = 'New General Business Insurance Quote Request - ' . $business_name;
    $email_body = sprintf(
        "New General Business Insurance Quote Request\n\n" .
        "Your Details:\n" .
        "Name: %s\n" .
        "Business Name: %s\n" .
        "ABN: %s\n" .
        "Address: %s\n" .
        "Website: %s\n" .
        "Email: %s\n" .
        "Phone: %s\n\n" .
        "Full Form Data:\n%s",
        $your_name,
        $business_name,
        $abn,
        $address,
        $website ?: 'Not provided',
        $email,
        $phone,
        print_r($data, true)
    );
    
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $email,
    );
    
    $sent = wp_mail($to, $subject, $email_body, $headers);
    
    if ($sent) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Thank you! Your general business insurance quote request has been submitted.',
        ), 200);
    } else {
        return new WP_Error(
            'email_failed',
            'Failed to submit your request. Please try again.',
            array('status' => 500)
        );
    }
}

function flexigrow_handle_cleaners_form($request) {
    $data = $request->get_json_params();
    
    // Sanitize Step 1 data (Your Details)
    $your_name = sanitize_text_field($data['1']['yourName'] ?? '');
    $business_name = sanitize_text_field($data['1']['businessName'] ?? '');
    $abn = sanitize_text_field($data['1']['abn'] ?? '');
    $address = sanitize_text_field($data['1']['address'] ?? '');
    $website = esc_url_raw($data['1']['website'] ?? '');
    $email = sanitize_email($data['1']['email'] ?? '');
    $phone = sanitize_text_field($data['1']['phoneNumber'] ?? '');
    
    // Validate required fields
    if (empty($your_name) || empty($business_name) || empty($email)) {
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
    
    // Send email notification
    $to = get_option('admin_email');
    $subject = 'New Cleaners Insurance Quote Request - ' . $business_name;
    $email_body = sprintf(
        "New Cleaners Insurance Quote Request\n\n" .
        "Your Details:\n" .
        "Name: %s\n" .
        "Business Name: %s\n" .
        "ABN: %s\n" .
        "Address: %s\n" .
        "Website: %s\n" .
        "Email: %s\n" .
        "Phone: %s\n\n" .
        "Full Form Data:\n%s",
        $your_name,
        $business_name,
        $abn,
        $address,
        $website ?: 'Not provided',
        $email,
        $phone,
        print_r($data, true)
    );
    
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $email,
    );
    
    $sent = wp_mail($to, $subject, $email_body, $headers);
    
    if ($sent) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Thank you! Your cleaners insurance quote request has been submitted.',
        ), 200);
    } else {
        return new WP_Error(
            'email_failed',
            'Failed to submit your request. Please try again.',
            array('status' => 500)
        );
    }
}

// Shortcode for multi-step form
function flexigrow_multistep_form_shortcode($atts) {
    wp_enqueue_script('multi-step-form');
    
    return '<multi-step-form></multi-step-form>';
}
add_shortcode('quote_form', 'flexigrow_multistep_form_shortcode');

// Shortcode for general business form
function flexigrow_general_business_form_shortcode($atts) {
    wp_enqueue_script('general-business-form');
    
    return '<general-business-form></general-business-form>';
}
add_shortcode('general_business_quote_form', 'flexigrow_general_business_form_shortcode');

// Shortcode for cleaners form
function flexigrow_cleaners_form_shortcode($atts) {
    wp_enqueue_script('cleaners-form');
    
    return '<cleaners-form></cleaners-form>';
}
add_shortcode('cleaners_quote_form', 'flexigrow_cleaners_form_shortcode');

