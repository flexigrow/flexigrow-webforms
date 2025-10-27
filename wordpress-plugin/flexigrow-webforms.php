<?php
/**
 * Plugin Name: FlexiGrow Web Forms
 * Plugin URI: https://yoursite.com
 * Description: Modern React-based multi-step form for WordPress
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

// Enqueue the multi-step form web component
function flexigrow_enqueue_webforms() {
    wp_enqueue_script(
        'flexigrow-multistep-form',
        FLEXIGROW_PLUGIN_URL . 'assets/MultiStepForm.js',
        array(),
        FLEXIGROW_VERSION,
        true
    );
    
    // Add type="module" attribute to make ES modules work
    add_filter('script_loader_tag', 'flexigrow_add_type_module', 10, 3);
}
add_action('wp_enqueue_scripts', 'flexigrow_enqueue_webforms');

function flexigrow_add_type_module($tag, $handle, $src) {
    // Add type="module" to our web component
    if ($handle === 'flexigrow-multistep-form') {
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}

// Shortcode for multi-step form
function flexigrow_multistep_form_shortcode($atts) {
    wp_enqueue_script('flexigrow-multistep-form');
    
    $atts = shortcode_atts(array(
        'api-endpoint' => '',
        'title' => 'Application Form',
        'logo-url' => '',
    ), $atts);
    
    $attributes = '';
    
    // Only add attributes if they have values
    if (!empty($atts['api-endpoint'])) {
        $attributes .= sprintf(' api-endpoint="%s"', esc_attr($atts['api-endpoint']));
    }
    
    if (!empty($atts['title'])) {
        $attributes .= sprintf(' title="%s"', esc_attr($atts['title']));
    }
    
    if (!empty($atts['logo-url'])) {
        $attributes .= sprintf(' logo-url="%s"', esc_url($atts['logo-url']));
    }
    
    return sprintf('<multi-step-form%s></multi-step-form>', $attributes);
}
add_shortcode('flexigrow_form', 'flexigrow_multistep_form_shortcode');
