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
    $sitemapMainLocation = 'sitemap.xml';

    if (c('sitemap-use-splitted-structure') === true) {
        CreateDividedSitemaps($sitemapMainLocation);
    } else {
        CreateSingleSitemap($sitemapMainLocation);
    }
}

/**
 * This function saves the given sitemap content to the specified sitemap name
 */
function SaveSitemap($name, $sitemapContent)
{
    $cleanContent = GetCleanSitemapContent($sitemapContent);
    $fp           = fopen(ABSPATH . $name, 'w');
    fwrite($fp, $cleanContent);
    fclose($fp);
}

/**
 * This function cleans and formats the given sitemap content
 */
function GetCleanSitemapContent($sitemapContent)
{
    $sitemapContent = str_replace('&', '&amp;', $sitemapContent);
    $sitemapContent = iconv('UTF-8', 'ISO-8859-1//TRANSLIT//IGNORE', $sitemapContent);
    return $sitemapContent;
}

/**
 * This function creates all the sitemaps according to the structure defined in the config types and taxonomies
 */
function CreateDividedSitemaps($sitemapName = 'sitemap.xml')
{
    $sitemapIndex = GetSitemapXmlHeader();
    $sitemapIndex .= GetIndexSitemapHeader();

    // generate sub sitemaps by post type
    foreach (c('sitemap-post-types') as $postType) {
        $subSitemapName = 'sitemap_' . $postType . '.xml';
        $sitemap        = GetSitemapXmlHeader();
        $sitemap .= GetSingleSitemapHeader();
        $sitemap .= GetSitemapContentForPostType($postType);
        $sitemap .= GetSingleSitemapFooter();
        SaveSitemap($subSitemapName, $sitemap);
        $sitemapIndex .= GetSitemapIndexSingleContent(get_bloginfo('url') . '/' . $subSitemapName);
    }

    // generate sub sitemaps by taxonomy
    foreach (c('sitemap-taxonomies') as $termType) {
        $subSitemapName = 'sitemap_' . $termType . '.xml';
        $sitemap        = GetSitemapXmlHeader();
        $sitemap .= GetSingleSitemapHeader();
        $sitemap .= GetSitemapContentForTaxonomy($termType);
        $sitemap .= GetSingleSitemapFooter();
        SaveSitemap($subSitemapName, $sitemap);
        $sitemapIndex .= GetSitemapIndexSingleContent(get_bloginfo('url') . '/' . $subSitemapName);
    }

    $sitemapIndex .= GetIndexSitemapFooter();
    SaveSitemap($sitemapName, $sitemapIndex);
}

/**
 * This function creates the full single sitemap
 */
function CreateSingleSitemap($sitemapName = 'sitemap.xml')
{
    $sitemap = GetSitemapXmlHeader();
    $sitemap .= GetSingleSitemapHeader();

    foreach (c('sitemap-post-types') as $postType) {
        $sitemap .= GetSitemapContentForPostType($postType);
    }

    foreach (c('sitemap-taxonomies') as $termType) {
        $sitemap .= GetSitemapContentForTaxonomy($termType);
    }

    $sitemap .= GetSingleSitemapFooter();
    SaveSitemap($sitemapName, $sitemap);
}

/**
 * This function builds the full sitemap content for a given post type
 */
function GetSitemapContentForPostType($postType)
{
    global $sitepress;
    if ($sitepress != null && c('multilanguage-enabled')) {
        $current_lang = $sitepress->get_current_language();
        $default_lang = $sitepress->get_default_language();
        $sitepress->switch_lang($default_lang);
    }

    $sitemap = '';
    $args    = array(
        'numberposts' => -1,
        'post_status' => 'publish', // add explicit publish state to fix draft statusses because sitemap is generated when a user is logged in
         'post_type'   => $postType,
        'orderby'     => 'modified',
        'order'       => 'DESC',
    );
    $results = new WP_Query($args);

    if ($sitepress != null && c('multilanguage-enabled')) {
        $sitepress->switch_lang($current_lang);
    }

    foreach ($results->posts as $post) {
        setup_postdata($post);
        if (strpos(get_page_template_slug($post->ID), 'page-noindex.php') !== false) {
            // do not add no-index template
        } else {
            $sitemap .= GetSitemapSinglePost($post);
        }
    }
    return $sitemap;
}

/**
 * This function builds the full sitemap content for a given taxonomy/term type
 */
function GetSitemapContentForTaxonomy($taxonomyType)
{
    global $sitepress;
    if ($sitepress != null && c('multilanguage-enabled')) {
        $current_lang = $sitepress->get_current_language();
        $default_lang = $sitepress->get_default_language();
        $sitepress->switch_lang($default_lang);
    }

    $sitemap = '';
    $args    = array(
        'numberposts' => -1,
        'taxonomy'    => $taxonomyType,
        'hide_empty'  => false,
        'orderby'     => 'modified',
        'order'       => 'DESC',
    );
    $results = new WP_Term_Query($args);

    if ($sitepress != null && c('multilanguage-enabled')) {
        $sitepress->switch_lang($current_lang);
    }

    if ($results && $results->terms) {
        foreach ($results->terms as $term) {
            setup_postdata($term);
            $sitemap .= GetSitemapSingleTaxonomy($term);
        }
    }
    return $sitemap;
}

/**
 * This function returns the urlset start node with namespaces
 */
function GetSingleSitemapHeader()
{
    return '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
}

/**
 * This function returns the urlset end node
 */
function GetSingleSitemapFooter()
{
    return '</urlset>';
}

/**
 * This function returns the sitemapindex start node with namespaces
 */
function GetIndexSitemapHeader()
{
    return '<sitemapindex xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
}

/**
 * This function returns the sitemapindex end node
 */
function GetIndexSitemapFooter()
{
    return '</sitemapindex>';
}

/**
 * This function returns the sitemap string for a given sitemap in the index
 */
function GetSitemapIndexSingleContent($subSitemapUrl)
{
    return '<sitemap><loc>' . $subSitemapUrl . '</loc></sitemap>';
}

/**
 * This function returns the sitemap string for a given term or taxonomy (type must be from category/post_tag or custom taxonomy)
 */
function GetSitemapSingleTaxonomy($term, $frequency = 'daily')
{
    $postdate = date("Y-m-d");
    return GetSitemapSingleItem(get_term_link($term->term_id), $postdate, $frequency);
}

/**
 * This function returns the sitemap string for a given post (type must be from post/page or custom post type)
 */
function GetSitemapSinglePost($post, $frequency = 'monthly')
{
    $postdate = explode(" ", $post->post_modified);

    // get translations (alternate urls) of the post
    $alternateLinks = array();
    global $sitepress;
    if ($sitepress != null && c('multilanguage-enabled')) {
        $current_lang = $sitepress->get_current_language();
        $default_lang = $sitepress->get_default_language();
        foreach ($sitepress->get_active_languages() as $language) {
            $languageCode = $language['code'];
            if ($languageCode != $default_lang) {
                $sitepress->switch_lang($languageCode);
                $alternateLink           = new StdClass();
                $alternateLink->language = $languageCode;
                $alternateLink->url      = get_the_permalink(apply_filters('wpml_object_id', $post->ID, $post->post_type, true, $languageCode));
                $alternateLinks[]        = $alternateLink;
                $sitepress->switch_lang($default_lang);
            }
        }
    }

    $sitemapContent = GetSitemapSingleItem(get_permalink($post->ID), $postdate[0], $frequency, $alternateLinks);
    // add featured image as image sitemap
    if (has_post_thumbnail($post->ID)) {
        $imageTitle     = $post->post_title;
        $imageUrl       = get_the_post_thumbnail_url($post->ID);
        $sitemapContent = str_replace('</url>', GetSitemapSingleImage($imageUrl, $imageTitle) . '</url>', $sitemapContent);
    }
    return $sitemapContent;
}

/**
 * This function returns the sitemap string for a given url, date, frequency and priority.
 * The alternatelinks parameter is an array of objects with a url and a language.
 */
function GetSitemapSingleItem($url, $date, $frequency = 'monthly', $alternateLinks = array(), $priority = 0.8)
{
    $urlXml = '<url>';
    $urlXml .= '<loc>' . $url . '</loc>';
    // translations of the current url
    foreach ($alternateLinks as $alternateLink) {
        $urlXml .= GetSitemapSingleItemAlternateLink($alternateLink->url, $alternateLink->language);
    }
    $urlXml .= '<lastmod>' . $date . '</lastmod>';
    $urlXml .= '<changefreq>' . $frequency . '</changefreq>';
    $urlXml .= '<priority>' . $priority . '</priority>';
    $urlXml .= '</url>';
    return $urlXml;
}

/**
 * This function returns the sitemap alternate link (translations) string for a url and language.
 */
function GetSitemapSingleItemAlternateLink($url, $hreflang = 'nl')
{
    return '<xhtml:link rel="alternate" hreflang="' . $hreflang . '" href="' . $url . '"/>';
}

/**
 * This function returns the image sitemap string for a given imageUrl, title and geolocation.
 */
function GetSitemapSingleImage($imageUrl, $title, $geoLocation = '', $caption = '')
{
    $caption      = strlen($caption) > 0 ? $caption : $title;
    $imageSitemap = '<image:image>' .
        '<image:loc>' . $imageUrl . '</image:loc>' .
        '<image:title>' . $title . '</image:title>' .
        '<image:caption>' . $caption . '</image:caption>';
    if (strlen($geoLocation) > 0) {
        $imageSitemap .= '<image:geo_location>' . $geoLocation . '</image:geo_location>';
    }

    $imageSitemap .= '</image:image>';
    return $imageSitemap;
}

/**
 * This function returns the commented string for the indication of the sitemap generation
 */
function GetSitemapGenerationTime()
{
    return '<!-- Sitemap generated on: ' . date(DATE_ATOM) . ' -->';
}

/**
 * This function returns the header for the sitemap (xml version and generation time)
 */
function GetSitemapXmlHeader()
{
    return '<?xml version="1.0" encoding="UTF-8"?>' . GetSitemapGenerationTime();
}