<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * Set options for page type
 */
function set_page_options()
{
    $postType = 'page';

// Add category to post type
    // register_taxonomy_for_object_type('category', $postType);

// Add tags to post type
    // register_taxonomy_for_object_type('post_tag', $postType);
}
add_action('init', 'set_page_options');