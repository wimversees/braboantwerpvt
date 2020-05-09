<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * Set options for author type
 */
function set_author_options()
{
    global $wp_rewrite;
    $postType = 'author';

    // change slug and rewrite
    $author_slug             = 'profile';
    $wp_rewrite->author_base = $author_slug;

// Add category to post type
    // register_taxonomy_for_object_type('category', $postType);

// Add tags to post type
    // register_taxonomy_for_object_type('post_tag', $postType);
}
add_action('init', 'set_author_options');