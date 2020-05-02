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
    $home_text = get_the_title(gpid('page-home'));
    $home_link = get_the_permalink(gpid('page-home'));
    $position  = 1;

    $breadcrumb_output = '<ul class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">';

    if (is_home() || is_front_page()) {
        // Do not show breadcrumbs on homepage or frontpage
        /* if (is_paged()) {
    $breadcrumb_output_link .= '<a href="' . $home_link . '">' . $home_text . '</a>';
    $breadcrumb_output_link .= $page_addon;
    }*/
    } else {
        $breadcrumb_output .= getBreadCrumbItem($home_text, $home_link, $position);

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
    $stripLength         = 20;
    $stripLengthLastItem = 50;
    if (strlen($title) > $stripLength) {
        // search for space and split on first space after split length
        $pos = strpos($title, ' ', $isLastItem ? $stripLengthLastItem : $stripLength);
        if ($pos > 0) {
            $title = substr($title, 0, $pos) . '...';
        }
    }
    $output .= '<span itemprop="name">' . $title . '</span></a>';
    $output .= '<meta itemprop="position" content="' . $position . '" />';
    $output .= '</li>';
    return $output;
}