<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class PageType
{
    const Type = 'page';
    // const ImageField = 'highlighted-image';
}

$pageTypeConfig = new PostTypeConfig(
    PageType::Type,
    null,
    null,
    array(
        $seoSharedFieldsSetting,
    )
);

/**
 * Register Post Type page
 */
function create_posttype_page()
{
    global $pageTypeConfig;
    $postType = $pageTypeConfig->postType;

    // Add category metabox to post type
    register_taxonomy_for_object_type('category', $postType);

    // Add tags to post type
    // register_taxonomy_for_object_type('post_tag', $postType);
}

/**
 * The actual register of the posttype
 */
add_action('init', 'create_posttype_page');

/**
 * Action registration for metaboxes
 */
function page_metaboxes()
{
    global $pageTypeConfig;
    RenderMetaboxes($pageTypeConfig);
}
add_action('add_meta_boxes', 'page_metaboxes');

/**
 * Action registration to save post fields
 */
function page_save_postdata($post_id)
{
    global $pageTypeConfig;
    SavePostData($pageTypeConfig, $post_id);
}
add_action('save_post', 'page_save_postdata');