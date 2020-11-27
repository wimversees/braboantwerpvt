<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/*
 * SECTION CUSTOM BREADCRUMB
 */

// general structure
/*
<ul itemscope itemtype="http://schema.org/BreadcrumbList">
<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
<a itemprop="item" href="https://example.com/dresses">
<span itemprop="name">Dresses</span></a>
<meta itemprop="position" content="1" />
</li>
<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
<a itemprop="item" href="https://example.com/dresses/real">
<span itemprop="name">Real Dresses</span></a>
<meta itemprop="position" content="2" />
</li>
</ul>
 */

function wiver_breadcrumb()
{
    global $post;
    // args
    $home_text = get_bloginfo('title'); // get_the_title(gpid('page-home'));
    $home_link = get_the_permalink(gpid('page-home'));
    $position  = 1;

    $breadcrumb_output = '<ul class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">';
    $breadcrumb_output .= getBreadCrumbItem($home_text, $home_link, $position);

    if (is_front_page()) {
        // Do not show breadcrumbs on homepage or frontpage
    } elseif (is_home()) {
        $breadcrumb_output .= getBreadCrumbItem(trim(wp_title("", false)), get_the_permalink(get_the_ID()), ++$position);
    } elseif (is_single()) {
        $postType = get_post_type();
        // If it is a custom post type display name and link
        if ($postType != 'post') {
            $postTypeObject      = get_post_type_object($postType);
            $postTypeArchiveLink = get_post_type_archive_link($postType);
            $breadcrumb_output .= getBreadCrumbItem($postTypeObject->labels->name, $postTypeArchiveLink, ++$position);
        }
        $breadcrumb_output .= getBreadCrumbItem(get_the_title(get_the_ID()), get_the_permalink(get_the_ID()), ++$position, true);
    } elseif (is_author()) {
        global $author;
        $userdata = get_userdata($author);
        $breadcrumb_output .= getBreadCrumbItem($userdata->data->user_nicename, get_author_posts_url($author), ++$position);
    } elseif (is_archive() && !is_tax() && !is_category() && !is_tag()) {
        $archive = get_queried_object();
        $breadcrumb_output .= getBreadCrumbItem($archive->label, get_post_type_archive_link($archive->name), ++$position, true);
    } elseif (is_tax() || is_category() || is_tag()) {
        $term         = get_queried_object();
        $parrentTerms = array();
        $parent       = $term->parent;
        while ($parent) {
            $parentTerm     = get_term($parent, $term->taxonomy);
            $parrentTerms[] = $parentTerm;
            $parent         = $parentTerm->parent;
        }
        foreach (array_reverse($parrentTerms) as $parentTerm) {
            $breadcrumb_output .= getBreadCrumbItem($parentTerm->name, get_term_link($parentTerm), ++$position);
        }
        $breadcrumb_output .= getBreadCrumbItem($term->name, get_term_link($term), ++$position, true);
    } elseif (is_search()) {
        $breadcrumb_output .= getBreadCrumbItem(sprintf(t('search-breadcrumb-title', false), get_search_query()), GetCurrentFullUrl(), ++$position, true);
    } elseif (is_404()) {
        $breadcrumb_output .= getBreadCrumbItem(t('404-breadcrumb-title', false), '#', ++$position, true);
    } else {
        // default for pages
        $parentsOfCurrentpage = array_reverse(get_post_ancestors($post));
        foreach ($parentsOfCurrentpage as $parent) {
            $breadcrumb_output .= getBreadCrumbItem(get_the_title($parent), get_the_permalink($parent), ++$position);
        }
        $breadcrumb_output .= getBreadCrumbItem(get_the_title(get_the_ID()), get_the_permalink(get_the_ID()), ++$position, true);
    }

    $breadcrumb_output .= '</ul>';

    return $breadcrumb_output;
}

function getBreadCrumbItem($title, $url, $position, $isLastItem = false)
{
    $output = '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">';
    $output .= '<a itemprop="item" href="' . $url . '" title="' . $title . '">';
    // shorten breadcrumb title for readability
    $stripLength = $isLastItem ? 50 : 20;
    if (strlen($title) > $stripLength) {
        // search for space and split on first space after split length
        $pos = strpos($title, ' ', $stripLength);
        if ($pos > 0) {
            $title = substr($title, 0, $pos) . '...';
        }
    }
    $output .= '<span itemprop="name">' . $title . '</span></a>';
    $output .= '<meta itemprop="position" content="' . $position . '" />';
    $output .= '</li>';
    return $output;
}

function GetCurrentFullUrl()
{
    return (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}