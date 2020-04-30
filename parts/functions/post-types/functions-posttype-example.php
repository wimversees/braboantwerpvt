<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    //die();
}

/**
 * Register Post Type EXAMPLE
 */
function create_posttype_EXAMPLE()
{
    $postType = "example";

    register_post_type($postType,
        // CPT Options
        array(
            'labels'             => array(
                'name'          => __('EXAMPLES'),
                'singular_name' => __($postType),
            ),
            'public'             => true, // default true, to use the post type on the FE of the website
             'has_archive'        => true,
            'rewrite'            => array('slug' => 'EXAMPLE'), // part of the url: blogurl/example/post_name
             'show_in_rest'       => true,
            'publicly_queryable' => true,
            'show_in_nav_menus'  => false, // default $public, make selectable in menu
        )
    );

    // set author functionality for post type
    $postTypeSupports = array(
        'author', // add author relation for post type
         'excerpt', // add excerpt for post type
         'thumbnail', // add featured image for post type
    );
    // add featured image for post type
    add_post_type_support($postType, $postTypeSupports);

    // Add category metabox to post type
    register_taxonomy_for_object_type('category', $postType);
}

/**
 * The actual register of the posttype
 */
add_action('init', 'create_posttype_EXAMPLE');