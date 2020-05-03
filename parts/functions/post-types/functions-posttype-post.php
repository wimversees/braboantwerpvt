<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * Set options for post type
 */
function set_post_options()
{
    $postType = 'post';

// Add category to post type
    // register_taxonomy_for_object_type('category', $postType);

// Add tags to post type
    // register_taxonomy_for_object_type('post_tag', $postType);
}
add_action('init', 'set_post_options');