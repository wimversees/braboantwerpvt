<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

// include custom function parts
require_once 'parts/functions/functions-general.php';
require_once 'parts/functions/functions-posts.php';
require_once 'parts/functions/functions-post-actions.php';
require_once 'parts/functions/functions-og-tags.php';
require_once 'parts/functions/functions-caching.php';
require_once 'parts/functions/functions-media.php';
require_once 'parts/functions/functions-gallery.php';
require_once 'parts/functions/functions-breadcrumb.php';
require_once 'parts/functions/functions-development.php';
require_once 'parts/functions/functions-sitemap.php';
require_once 'parts/functions/functions-wpcf7.php';
require_once 'parts/functions/functions-navigation.php';

// theme supports
add_theme_support('menus');
add_theme_support('post-thumbnails');

// post types
//require_once 'parts/functions/post-types/functions-posttype-example.php';