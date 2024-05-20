<?php
/**
 * Plugin Name: Floating Chatbot
 * Description: Floating chatbot for WordPress.
 * Version: 1.0.0
 * Author: Ubaid Ur Rehman
 */

// Enqueue frontend scripts
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

        wp_enqueue_script('floating-chatbot', plugins_url('build/index.js', __FILE__), array('react', 'react-dom'), '1.0.0', true);
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
add_action('wp_enqueue_scripts', 'floating_chatbot_enqueue_scripts');
