<?php

// include custom function parts
require_once 'parts/functions/functions-general.php';
require_once 'parts/functions/functions-posts.php';
require_once 'parts/functions/functions-post-actions.php';
require_once 'parts/functions/functions-og-tags.php';
require_once 'parts/functions/functions-caching.php';
require_once 'parts/functions/functions-media.php';
// require_once('parts/functions/functions-gallery.php');
require_once 'parts/functions/functions-breadcrumb.php';
require_once 'parts/functions/functions-development.php';
require_once 'parts/functions/functions-sitemap.php';

// theme supports
add_theme_support('menus');
add_theme_support('post-thumbnails');

// Register Custom Navigation Walker
require_once 'parts/wiver_navwalker.php';

// add featured image to custom post types
// add_post_type_support( 'custom-type', 'thumbnail' );

// remove contact form 7 wpcf7 from admin menu for not admins
if (!(current_user_can('administrator'))) {
    function remove_wpcf7()
    {
        remove_menu_page('wpcf7');
    }
    add_action('admin_menu', 'remove_wpcf7');
}

// global action settings
function global_settings()
{
    // Add category metabox to page
    // register_taxonomy_for_object_type('category', 'page');
}
add_action('init', 'global_settings');