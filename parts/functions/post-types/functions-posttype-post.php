<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class PostType
{
    const Type = 'post';
    // const ImageField = 'highlighted-image';
}

$postTypeConfig = new PostTypeConfig(
    PostType::Type,
    null,
    null,
    array(
    )
);

/**
 * Register Post Type post
 */
function create_posttype_post()
{
    global $postTypeConfig;
    $postType = $postTypeConfig->postType;

    // Add category metabox to post type
    register_taxonomy_for_object_type('category', $postType);

    // Add tags to post type
    // register_taxonomy_for_object_type('post_tag', $postType);
}

/**
 * The actual register of the posttype
 */
add_action('init', 'create_posttype_example');

/**
 * Action registration for metaboxes
 */
function example_metaboxes()
{
    global $postTypeConfig;
    RenderMetaboxes($postTypeConfig);
}
add_action('add_meta_boxes', 'example_metaboxes');

/**
 * Action registration to save post fields
 */
function example_save_postdata($post_id)
{
    global $postTypeConfig;
    SavePostData($postTypeConfig, $post_id);
}
add_action('save_post', 'example_save_postdata');