<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

// remove the generator meta key
function wp_version_remove_version()
{
    return '';
}
add_filter('the_generator', 'wp_version_remove_version');