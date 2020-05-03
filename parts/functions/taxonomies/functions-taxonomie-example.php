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
    $slug              = strtolower($taxonomyName);
    $enableOnPostTypes = array('post', c('example'));

    // Add new "example-taxs" taxonomy to Posts
    register_taxonomy($slug, $enableOnPostTypes, array(
        'hierarchical' => true, // Hierarchical taxonomy (like categories)
         'labels'       => array(
            'name'          => _x('example-taxs', 'taxonomy general name'),
            'singular_name' => _x('example-tax', 'taxonomy singular name'),
        ),
        // Control the slugs used for this taxonomy
         'rewrite'      => array(
            'slug'         => 'example-taxs', // This controls the base slug that will display before each term
             'with_front'   => false, // Don't display the category base before "/example-taxs/"
             'hierarchical' => true, // This will allow URL's like "/example-taxs/boston/cambridge/"
        ),
    ));
}
add_action('init', 'add_example_taxonomy', 0);