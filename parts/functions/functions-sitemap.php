<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

add_action('publish_post', 'create_sitemap');
add_action('publish_page', 'create_sitemap');
add_action('save_post', 'create_sitemap'); // commented for memory leak

function create_sitemap()
{
    global $post;
    $postsForSitemap = get_posts(array(
        'numberposts' => -1,
        'orderby'     => 'modified',
        // 'custom_post' should be replaced with your own Custom Post Type (one or many)
         'post_type'   => c('sitemap-post-types'),
        'order'       => 'DESC',
    ));

    $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
$sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';

    foreach ($postsForSitemap as $post) {
    setup_postdata($post);

    // remove no indexable pages
    if (strpos(get_page_template_slug($post->ID), 'page-noindex.php') !== false) {
    // do not add no-index template
    } else {
    $postdate = explode(" ", $post->post_modified);

    $sitemap .= '<url>' .
        '<loc>' . get_permalink($post->ID) . '</loc>' .
        '<lastmod>' . $postdate[0] . '</lastmod>' .
        '<changefreq>monthly</changefreq>' .
        '<priority>0.8</priority>' .
        '</url>';
    }
    }

    $sitemap .= '</urlset>';

$fp = fopen(ABSPATH . 'sitemap.xml', 'w');

fwrite($fp, $sitemap);
fclose($fp);
}