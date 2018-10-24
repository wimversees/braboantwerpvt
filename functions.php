<?php 

// include custom function parts
include('/parts/functions/functions-general.php');
include('/parts/functions/functions-posts.php');
include('/parts/functions/functions-post-actions.php');
include('/parts/functions/functions-og-tags.php');
include('/parts/functions/functions-caching.php');

// theme supports
add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );

// Register Custom Navigation Walker
require_once('parts/wiver_navwalker.php');

// Register custom image sizes
// add_image_size('block-image', 255, 165, true);

// add featured image to custom post types
// add_post_type_support( 'custom-type', 'thumbnail' );

// global action settings
function global_settings() {  
    // Add category metabox to page 
	// register_taxonomy_for_object_type('category', 'page'); 
}
add_action( 'init', 'global_settings' );