<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/*
 * SECTION WPCF7
 */

// remove contact form 7 wpcf7 from admin menu for not admins
if (!(current_user_can('administrator'))) {
    function remove_wpcf7()
    {
        remove_menu_page('wpcf7');
    }
    add_action('admin_menu', 'remove_wpcf7');
}