<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class ExampleType
{
    const Type = 'example';

    const Group1   = 'Group 1';
    const Checkbox = 'example-checkbox';
    const Date     = 'example-date';

    const Group2         = 'Group 2';
    const Group3         = 'Group 3';
    const Image          = 'example-image';
    const Radio          = 'example-radio';
    const Radio2         = 'example-radio-2';
    const RichText       = 'example-richtext';
    const Select         = 'example-selection';
    const SingleLineText = 'example-single';
    const Url            = 'example-url';
}

$examplePostTypeConfig = new PostTypeConfig(
    ExampleType::Type,
    "Example",
    "Examples",
    array(
        new FieldGroup(
            ExampleType::Group1,
            array(
                new FieldConfig(FieldType::Checkbox, ExampleType::Checkbox, 'Checkbox Field', false, "description of the field"),
                new FieldConfig(FieldType::Date, ExampleType::Date, 'Date Field', true, "description of the field"),
            )
        ),
        new FieldConfig(FieldType::Checkbox, ExampleType::Checkbox, 'Checkbox Field', false, "description of the field"),
        new FieldGroup(
            ExampleType::Group2,
            array(
                new FieldConfig(FieldType::Image, ExampleType::Image, 'Image Field', false, "description of the field"),
                new FieldConfig(FieldType::Radio, ExampleType::Radio, 'Radio Field', false, "description of the field", array('left', 'right', 'center')),
                new FieldConfig(FieldType::Radio, ExampleType::Radio2, 'Radio Field 2', false, "description of the field", array('left', 'right', 'center')),
                new FieldConfig(FieldType::RichText, ExampleType::RichText, 'Rich Text Field', false, "description of the field"),
                new FieldConfig(FieldType::Select, ExampleType::Select, 'Select Field', false, "description of the field", array('left', 'right', 'center')),
                new FieldConfig(FieldType::SingleLineText, ExampleType::SingleLineText, 'Single Line Text Field', true, 'this is a comment for the field'),
                new FieldConfig(FieldType::Url, ExampleType::Url, 'Url Field', false, 'this is a comment for the field'))
        ),
        new FieldConfig(FieldType::Checkbox, ExampleType::Checkbox, 'Checkbox Field', false, "description of the field"),
        new FieldConfig(FieldType::Checkbox, ExampleType::Checkbox, 'Checkbox Field', false, "description of the field"),

        new FieldGroup(
            ExampleType::Group3,
            array(
            )
        ), new FieldConfig(FieldType::Checkbox, ExampleType::Checkbox, 'Checkbox Field', false, "description of the field"),
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

/**
 * Action registration for metaboxes
 */
function example_metaboxes()
{
    global $examplePostTypeConfig;
    RenderMetaboxes($examplePostTypeConfig);
}
add_action('add_meta_boxes', 'example_metaboxes');

/**
 * Action registration to save post fields
 */
function example_save_postdata($post_id)
{
    global $examplePostTypeConfig;
    SavePostData($examplePostTypeConfig, $post_id);
}
add_action('save_post', 'example_save_postdata');