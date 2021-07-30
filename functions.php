<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

// include custom function parts
require_once 'functions/functions-general.php';
require_once 'functions/functions-posts.php';
require_once 'functions/functions-post-actions.php';
require_once 'functions/functions-redirects.php';
require_once 'functions/functions-og-tags.php';
require_once 'functions/functions-caching.php';
require_once 'functions/functions-media.php';
require_once 'functions/functions-header-footer.php';
require_once 'functions/functions-gallery.php';
require_once 'functions/functions-breadcrumb.php';
require_once 'functions/functions-development.php';
require_once 'functions/functions-sitemap.php';
require_once 'functions/functions-wpcf7.php';
require_once 'functions/functions-navigation.php';
require_once 'functions/functions-taxonomies.php';
require_once 'functions/functions-permalinks.php';
require_once 'functions/functions-security.php';
require_once 'functions/functions-structured-data.php';
require_once 'functions/functions-minification.php';
require_once 'functions/functions-mails.php';

// admin functions
require_once 'functions/admin/functions-admin.php';

// set default lcoale
setlocale(LC_ALL, get_og_locale());

// shortcodes
require_once 'functions/shortcodes/shortcodes.php';

// admin pages
require_once 'functions/admin/toolbox/functions-admin-toolbox.php';

// theme supports
add_theme_support('menus');
add_theme_support('post-thumbnails');

// init for post types and taxonomies
require_once 'functions/admin/fields/fields/config/field-config-class.php';
require_once 'functions/admin/fields/fields/config/field-group-config-class.php';
require_once 'functions/admin/fields/fields/functions-fields.php';
require_once 'functions/admin/fields/validators/functions-field-validators.php';
require_once 'functions/posttypes/config/posttype-config-class.php';
require_once 'functions/taxonomies/config/taxonomy-config-class.php';

// post types
require_once 'functions/posttypes/base/functions-posttype-base-seo.php';
require_once 'functions/posttypes/functions-posttype-post.php';
require_once 'functions/posttypes/functions-posttype-page.php';
require_once 'functions/posttypes/functions-posttype-author.php';
require_once 'functions/posttypes/functions-posttype-example.php';
// require_once 'functions/posttypes/functions-posttype-faq.php';

// taxonomies
// require_once 'functions/taxonomies/functions-taxonomy-example.php';

// flush rewrite rules on local environment
if (IsLocalEnvironment()) {
    add_action('init', function () {
        global $wp_rewrite;
        $wp_rewrite->set_permalink_structure('/%postname%/');
    });
    flush_rewrite_rules();
}