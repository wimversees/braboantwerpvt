<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

$pageTypeConfig = new PostTypeConfig(
    c('page'),
    null,
    null,
    array(
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

function page_metaboxes()
{
    global $pageTypeConfig;
    if ($pageTypeConfig->fields) {
        $postType      = $pageTypeConfig->postType;
        $postTypeViews = [$postType];
        $metaBoxTitle  = $pageTypeConfig->singularName . ' Fields';
        foreach ($postTypeViews as $postTypeView) {
            add_meta_box('page_metabox', $metaBoxTitle, 'page_metabox_html', $postTypeView, 'normal', 'high');
        }
    }
}
add_action('add_meta_boxes', 'page_metaboxes');

function page_metabox_html($post)
{
    global $pageTypeConfig;
    echo '<div class="wiver-fields">';
    echo '<table class="form-table">';
    foreach ($pageTypeConfig->fields as $field) {
        RenderField($post, $field);
    }
    echo '</table>';
    echo '</div>';
}

function page_save_postdata($post_id)
{
    global $pageTypeConfig;
    foreach ($pageTypeConfig->fields as $field) {
        SaveField($post_id, $field->fieldSlug, $field->fieldType);
    }
}
add_action('save_post', 'page_save_postdata');