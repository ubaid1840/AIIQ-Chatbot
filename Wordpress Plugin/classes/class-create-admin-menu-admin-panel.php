<?php
/**
 * This file will create admin menu page for the Admin Panel plugin.
 */

class Admin_Panel_Create_Admin_Page {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'wpap_create_admin_menu' ] );
    }

    public function wpap_create_admin_menu() {
        $capability = 'manage_options';
        $parent_slug = 'wpap-view-files';

        add_menu_page(
            __( 'AIIQ Chatbot', 'wp-admin-panel' ),
            __( 'AIIQ Chatbot', 'wp-admin-panel' ),
            $capability,
            $parent_slug,
            [ $this, 'wpap_menu_page_template' ],
            'dashicons-admin-multisite',
            4
        );

        add_submenu_page(
            $parent_slug,
            __( 'Files', 'wp-admin-panel' ),
            __( 'Files', 'wp-admin-panel' ),
            $capability,
            $parent_slug,
            [ $this, 'wpap_menu_page_template' ] // Render the same template for different pages
        );


        add_submenu_page(
            $parent_slug,
            __( 'Sessions', 'wp-admin-panel' ),
            __( 'Sessions', 'wp-admin-panel' ),
            $capability,
            'wpap-view-sessions',
            [ $this, 'wpap_menu_page_template' ] // Render the same template for different pages
        );

        add_submenu_page(
            $parent_slug,
            __( 'Configuration', 'wp-admin-panel' ),
            __( 'Configuration', 'wp-admin-panel' ),
            $capability,
            'wpap-configure-parameters',
            [ $this, 'wpap_menu_page_template' ] // Render the same template for different pages
        );

        add_submenu_page(
            $parent_slug,
            __( 'Retrieval History', 'wp-admin-panel' ),
            __( 'Retrieval History', 'wp-admin-panel' ),
            $capability,
            'wpap-view-retrieval-history',
            [ $this, 'wpap_menu_page_template' ] // Render the same template for different pages
        );

 
    }

    public function wpap_menu_page_template() {
        echo '<div class="wrap"><div id="wpap-admin-app"></div></div>';
    }

}

new Admin_Panel_Create_Admin_Page();
