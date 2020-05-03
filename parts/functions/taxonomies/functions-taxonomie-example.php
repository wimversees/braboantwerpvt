<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * Add custom taxonomy example-tax
 */
function add_example_taxonomy()
{
    $taxonomyName      = c('example-tax');
    $singularName      = "Example";
    $pluralName        = "Examples";
    $slug              = strtolower($taxonomyName);
    $enableOnPostTypes = array('post', c('example'));

    $labels = array(
        'name'              => _x($pluralName, 'taxonomy general name', 'textdomain'),
        'singular_name'     => _x($singularName, 'taxonomy singular name', 'textdomain'),
        'search_items'      => __('Search ' . $pluralName, 'textdomain'),
        'all_items'         => __('All ' . $pluralName, 'textdomain'),
        'parent_item'       => __('Parent ' . $singularName, 'textdomain'),
        'parent_item_colon' => __('Parent ' . $singularName . ':', 'textdomain'),
        'edit_item'         => __('Edit ' . $singularName, 'textdomain'),
        'update_item'       => __('Update ' . $singularName, 'textdomain'),
        'add_new_item'      => __('Add New ' . $singularName, 'textdomain'),
        'new_item_name'     => __('New ' . $singularName, 'textdomain'),
        'menu_name'         => __($singularName, 'textdomain'),
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
            'slug'         => $slug, // This controls the base slug that will display before each term
             'with_front'   => false, // Don't display the category base before "/example-taxs/"
             'hierarchical' => true, // This will allow URL's like "/example-taxs/boston/cambridge/"
        ),
    );

    register_taxonomy($taxonomyName, $enableOnPostTypes, $args);
}

add_action('init', 'add_example_taxonomy', 0);