<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

$examplePostTypeConfig = new PostTypeConfig(
    c('example'),
    "Example",
    "Examples",
    array(
        new FieldConfig(FieldType::SingleLineText, 'test-field', 'test field label'),
        new FieldConfig(FieldType::SingleLineText, 'test-field-2', 'test field label 2'),
    )
);

/**
 * Register Post Type example
 */
function create_posttype_example()
{
    global $examplePostTypeConfig;

    $postType     = $examplePostTypeConfig->postType;
    $singularName = $examplePostTypeConfig->singularName;
    $pluralName   = $examplePostTypeConfig->pluralName;

    $singularNameLower = strtolower($singularName);
    $pluralNameLower   = strtolower($pluralName);

    $labels = array(
        'name'                  => _x($pluralName, 'Post type general name', 'textdomain'),
        'singular_name'         => _x($singularName, 'Post type singular name', 'textdomain'),
        'menu_name'             => _x($pluralName, 'Admin Menu text', 'textdomain'),
        'name_admin_bar'        => _x($singularName, 'Add New on Toolbar', 'textdomain'),
        'add_new'               => __('Add New', 'textdomain'),
        'add_new_item'          => __('Add New ' . $singularName, 'textdomain'),
        'new_item'              => __('New ' . $singularName, 'textdomain'),
        'edit_item'             => __('Edit ' . $singularName, 'textdomain'),
        'view_item'             => __('View ' . $singularName, 'textdomain'),
        'all_items'             => __('All ' . $pluralName, 'textdomain'),
        'search_items'          => __('Search ' . $pluralName, 'textdomain'),
        'parent_item_colon'     => __('Parent ' . $pluralName . ':', 'textdomain'),
        'not_found'             => __('No ' . $pluralNameLower . ' found.', 'textdomain'),
        'not_found_in_trash'    => __('No ' . $pluralNameLower . ' found in Trash.', 'textdomain'),
        'archives'              => _x($singularName . ' archives', 'The post type archive label used in nav menus. Default "Post Archives". Added in 4.4', 'textdomain'),
        'insert_into_item'      => _x('Insert into ' . $singularName, 'Overrides the "Insert into post"/"Insert into page" phrase (used when inserting media into a post). Added in 4.4', 'textdomain'),
        'uploaded_to_this_item' => _x('Uploaded to this ' . $singularName, 'Overrides the "Uploaded to this post"/"Uploaded to this page" phrase (used when viewing media attached to a post). Added in 4.4', 'textdomain'),
        'filter_items_list'     => _x('Filter ' . $pluralNameLower . ' list', 'Screen reader text for the filter links heading on the post type listing screen. Default "Filter posts list"/"Filter pages list". Added in 4.4', 'textdomain'),
        'items_list_navigation' => _x($pluralName . ' list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default "Posts list navigation"/"Pages list navigation". Added in 4.4', 'textdomain'),
        'items_list'            => _x($pluralName . ' list', 'Screen reader text for the items list heading on the post type listing screen. Default "Posts list"/"Pages list". Added in 4.4', 'textdomain'),
    );

    $postTypeSupports = array(
        'title',
        'editor',
        'author',
        //'thumbnail',
        //'excerpt',
        //'comments'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => $postType),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => $postTypeSupports,
    );

    register_post_type($postType, $args);

    // Add category metabox to post type
    register_taxonomy_for_object_type('category', $postType);
}

/**
 * The actual register of the posttype
 */
add_action('init', 'create_posttype_example');

function example_metaboxes()
{
    global $examplePostTypeConfig;
    $postType      = $examplePostTypeConfig->postType;
    $postTypeViews = [$postType];
    $metaBoxTitle  = $examplePostTypeConfig->singularName . ' Fields';
    foreach ($postTypeViews as $postTypeView) {
        add_meta_box(
            'example_metabox', // Unique ID
            $metaBoxTitle, // Box title
             'example_metabox_html', // Content callback, must be of type callable
            $postTypeView // Post type
        );
    }
}
add_action('add_meta_boxes', 'example_metaboxes');

function example_metabox_html($post)
{
    global $examplePostTypeConfig;
    echo '<div class="wiver-fields">';
    echo '<table>';
    foreach ($examplePostTypeConfig->fields as $field) {
        SingleLineTextField($post, $field);
    }
    echo '</table>';
    echo '</div>';
}

function example_save_postdata($post_id)
{
    global $examplePostTypeConfig;
    foreach ($examplePostTypeConfig->fields as $field) {
        if (array_key_exists($field->fieldSlug, $_POST)) {
            saveField($post_id, $field->fieldSlug, $field->fieldType);
        }
    }
}
add_action('save_post', 'example_save_postdata');
