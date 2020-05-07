<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

add_action('admin_enqueue_scripts', 'load_admin_styles');
function load_admin_styles()
{
    wp_enqueue_style('admin_css_foo', get_template_directory_uri() . '/parts/functions/admin/design/css/wiver-admin.css', false, '1.0.0');
}