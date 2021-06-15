<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class ExampleTax
{
    const Type = 'example';

    const Group1   = 'Group 1';
    const Checkbox = 'example-checkbox';
    const Date     = 'example-date';
    const Url      = 'example-url';
}

$exampleTaxonomyConfig = new TaxonomyConfig(
    ExampleTax::Type,
    "Example",
    "Examples",
    array('post', ExampleType::Type),
    array(
        new FieldGroup(
            ExampleTax::Group1,
            array(
                new FieldConfig(FieldType::Checkbox, ExampleTax::Checkbox, 'Checkbox Field', false, "description of the field"),
                new FieldConfig(FieldType::Date, ExampleTax::Date, 'Date Field', true, "description of the field"),
            )
        ),
        new FieldConfig(FieldType::Url, ExampleTax::Url, 'URL', true, "description of the field"),
    )
);

/**
 * Add custom taxonomy example-tax
 */
function add_example_taxonomy()
{
    global $exampleTaxonomyConfig;

    $taxonomyType     = $exampleTaxonomyConfig->taxonomyType;
    $singularName     = $exampleTaxonomyConfig->singularName;
    $pluralName       = $exampleTaxonomyConfig->pluralName;
    $enabledPostTypes = $exampleTaxonomyConfig->enabledPostTypes;

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

    $args = array(
        'hierarchical'       => true, // true like category, false like tags
         'public'             => true,
        'labels'             => $labels,
        'show_ui'            => true,
        'show_admin_column'  => true,
        'show_in_nav_menus'  => true,
        'show_in_quick_edit' => true, // show in the quick/bulk edit panel
         'query_var'          => true,
        'rewrite'            => array(
            'slug'         => $taxonomyType, // This controls the base slug that will display before each term
             'with_front'   => false, // Don't display the category base before "/example-taxs/"
             'hierarchical' => true, // This will allow URL's like "/example-taxs/boston/cambridge/"
        ),
    );

    register_taxonomy($taxonomyType, $enabledPostTypes, $args);
}

add_action('init', 'add_example_taxonomy', 0);

function example_tax_metabox_html($tag)
{
    global $exampleTaxonomyConfig;
    RenderMetaboxesForTaxonomy($exampleTaxonomyConfig, $tag);
}
add_action($exampleTaxonomyConfig->taxonomyType . '_add_form_fields', 'example_tax_metabox_html');
add_action($exampleTaxonomyConfig->taxonomyType . '_edit_form_fields', 'example_tax_metabox_html');

function example_tax_save_postdata($term_id)
{
    global $exampleTaxonomyConfig;
    SaveTaxonomyData($exampleTaxonomyConfig, $term_id);
}
add_action('create_' . $exampleTaxonomyConfig->taxonomyType, 'example_tax_save_postdata');
add_action('edited_' . $exampleTaxonomyConfig->taxonomyType, 'example_tax_save_postdata');