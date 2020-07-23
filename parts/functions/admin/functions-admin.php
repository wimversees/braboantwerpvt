<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

add_action('admin_enqueue_scripts', 'load_admin_frontend');
function load_admin_frontend()
{
    wp_enqueue_style('wiver_admin_css', getFrontEndFile('/parts/functions/admin/design/css/wiver-admin.css', false), false, '1.0.0');
    wp_enqueue_script('wiver_admin_js', getFrontEndFile('/parts/functions/admin/design/js/wiver-admin.js', false), array('jquery'), '1.0.0');
}