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
add_action('init', 'create_posttype_post');

function post_metaboxes()
{
    global $postTypeConfig;
    if ($postTypeConfig->fields) {
        $postType      = $postTypeConfig->postType;
        $postTypeViews = [$postType];
        $metaBoxTitle  = $postTypeConfig->singularName . ' Fields';
        foreach ($postTypeViews as $postTypeView) {
            add_meta_box('post_metabox', $metaBoxTitle, 'post_metabox_html', $postTypeView, 'normal', 'high');
        }
    }
}
add_action('add_meta_boxes', 'post_metaboxes');

function post_metabox_html($post)
{
    global $postTypeConfig;
    echo '<div class="wiver-fields">';
    echo '<table class="form-table">';
    foreach ($postTypeConfig->fields as $field) {
        RenderField($post, $field);
    }
    echo '</table>';
    echo '</div>';
}

function post_save_postdata($post_id)
{
    global $postTypeConfig;
    foreach ($postTypeConfig->fields as $field) {
        SaveField($post_id, $field->fieldSlug, $field->fieldType);
    }
}
add_action('save_post', 'post_save_postdata');