<?php
/**
 * Plugin Name: AIIQ Chatbot
 * Author: Ubaid Ur Rehman
 * Version: 2.0.0
 * Description: AIIQ chatbot plugin for wordpress.
 * Text-Domain: wp-admin-panel
 */

if (!defined('ABSPATH')) {
    exit();
}

/**
 * Define Plugin Constants
 */
define('WPAP_PATH', trailingslashit(plugin_dir_path(__FILE__)));
define('WPAP_URL', trailingslashit(plugins_url('/', __FILE__)));

/**
 * Loading Necessary Scripts for Admin Panel
 */
add_action('admin_enqueue_scripts', 'wp_ap_load_scripts');
add_action('wp_enqueue_scripts', 'floating_chatbot_enqueue_scripts');
function wp_ap_load_scripts()
{
    $api_base_url = 'https://aiiq.publicvm.com';
    wp_register_style('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
    wp_enqueue_style('bootstrap');
    wp_enqueue_script('wp-admin-panel', WPAP_URL . 'build/index.js', array('react', 'react-dom'), '1.0.0', true);
    wp_localize_script('wp-admin-panel', 'appLocalizer', [
        'apiUrl' => $api_base_url,
        'nonce' => wp_create_nonce('wp_rest'),
    ]);
}

function floating_chatbot_enqueue_scripts()
{
    $current_user = wp_get_current_user();
    $user_id = $current_user->ID;
    $api_base_url = 'https://aiiq.publicvm.com';
    $is_admin = false;
    $is_subscribed = false;

    if ($current_user && isset($current_user->ID)) {
        if (current_user_can('administrator')) {
            $is_admin = true;
            $is_subscribed = true;
        } else {
            $is_admin = false;
            if (function_exists('wcs_user_has_subscription')) {
                $is_subscribed = wcs_user_has_subscription($user_id, '', 'active');
                if ($is_subscribed) {
                    $is_subscribed = true;
                }
            }
        }
        $chatbot_script_path = WPAP_PATH . 'bot/build/index.js';
        if (file_exists($chatbot_script_path)) {
            wp_enqueue_script('floating-chatbot', plugins_url('bot/build/index.js', __FILE__), array('react', 'react-dom'), '1.0.0', true);
            wp_localize_script(
                'floating-chatbot',
                'chatbotData',
                array(
                    'userId' => $user_id,
                    'apiBaseUrl' => $api_base_url,
                    'isAdmin' => $is_admin,
                    'isSubscribed' => $is_subscribed,
                )
            );
        }

    }
}

require_once WPAP_PATH . 'classes/class-create-admin-menu-admin-panel.php';
