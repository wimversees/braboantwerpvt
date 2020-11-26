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
require_once 'parts/functions/functions-header-footer.php';
require_once 'parts/functions/functions-gallery.php';
require_once 'parts/functions/functions-breadcrumb.php';
require_once 'parts/functions/functions-development.php';
require_once 'parts/functions/functions-sitemap.php';
require_once 'parts/functions/functions-wpcf7.php';
require_once 'parts/functions/functions-navigation.php';
require_once 'parts/functions/functions-taxonomies.php';
require_once 'parts/functions/functions-permalinks.php';
require_once 'parts/functions/functions-structured-data.php';
require_once 'parts/functions/functions-minification.php';
require_once 'parts/functions/functions-mails.php';

// admin functions
require_once 'parts/functions/admin/functions-admin.php';

// set default lcoale
setlocale(LC_ALL, get_og_locale());

// shortcodes
require_once 'parts/functions/shortcodes/shortcodes.php';

// admin pages
require_once 'parts/functions/admin/toolbox/functions-admin-toolbox.php';

// theme supports
add_theme_support('menus');
add_theme_support('post-thumbnails');

// post types init
require_once 'parts/functions/admin/fields/config/field-config-class.php';
require_once 'parts/functions/admin/fields/config/field-group-config-class.php';
require_once 'parts/functions/post-types/config/posttype-config-class.php';
require_once 'parts/functions/taxonomies/config/taxonomy-config-class.php';
require_once 'parts/functions/admin/fields/functions-fields.php';

// post types
require_once 'parts/functions/post-types/functions-posttype-post.php';
require_once 'parts/functions/post-types/functions-posttype-page.php';
require_once 'parts/functions/post-types/functions-posttype-author.php';
require_once 'parts/functions/post-types/functions-posttype-example.php';
// require_once 'parts/functions/post-types/functions-posttype-faq.php';

// taxonomies
// require_once 'parts/functions/taxonomies/functions-taxonomy-example.php';

// flush rewrite rules on local environment
if (IsLocalEnvironment()) {
    add_action('init', function () {
        global $wp_rewrite;
        $wp_rewrite->set_permalink_structure('/%postname%/');
    });
    flush_rewrite_rules();
}