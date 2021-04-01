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
        $seoSharedFieldsSetting,
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
add_action('init', 'create_posttype_post');

/**
 * Action registration for metaboxes
 */
function post_metaboxes()
{
    global $postTypeConfig;
    RenderMetaboxes($postTypeConfig);
}
add_action('add_meta_boxes', 'post_metaboxes');

/**
 * Action registration to save post fields
 */
function post_save_postdata($post_id)
{
    global $postTypeConfig;
    SavePostData($postTypeConfig, $post_id);
}
add_action('save_post', 'post_save_postdata');