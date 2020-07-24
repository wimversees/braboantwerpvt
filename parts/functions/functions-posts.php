<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function echoes the title of the page, used for the browser tab title
 *
 * @return void
 */
function page_title()
{
    $blogName        = get_bloginfo('name');
    $blogDescription = get_bloginfo('description');
    $default         = $blogName . ' - ' . $blogDescription;
    // homepage
    if (is_home() || is_front_page()) {
        echo strlen($default) >= 70 ? $blogName : $default;
        return;
    }
    // other page
    $pageTitle      = GetPageTitleH1();
    $defaultForPage = GetPageTitleH1() . ' - ' . $default;
    if (strlen($defaultForPage) >= 70) {
        $defaultForPageWithoutDescription = $pageTitle . ' - ' . $blogName;
        echo strlen($defaultForPageWithoutDescription) >= 70 ? $pageTitle : $defaultForPageWithoutDescription;
    } else {
        echo $defaultForPage;
    }
}

/**
 * This function returns the h1 title of the current page, according to the type of page
 */
function GetPageTitleH1()
{
    if (is_home() || is_front_page()) {
        // Do not return title
    } elseif (is_single()) {
        return get_the_title(get_the_ID());
    } elseif (is_author()) {
        global $author;
        $userdata = get_userdata($author);
        return $userdata->data->user_nicename;
    } elseif (is_archive() && !is_tax() && !is_category() && !is_tag()) {
        $archive = get_queried_object();
        return $archive->label;
    } elseif (is_tax() || is_category() || is_tag()) {
        $term = get_queried_object();
        return $term->name;
    } elseif (is_search()) {
        return sprintf(t('search-breadcrumb-title', false), get_search_query());
    } elseif (is_404()) {
        return t('404-breadcrumb-title', false);
    } else {
        return get_the_title(get_the_ID());
    }
}

/**
 * This page echoes the description of the page, used for the browser tab title.
 *
 * @return void
 */
function page_description()
{
    $excerpt = excerpt(20);
    if (strlen($excerpt) == 0) {
        $excerpt = bloginfo('description');
    }

    echo $excerpt;
}

/**
 * This function returns the excerpt with a custom length in words.
 *
 * @param int $limit
 * @return void
 */
function excerpt($limit)
{
    $excerpt = explode(' ', get_the_excerpt(), $limit);
    if (count($excerpt) >= $limit) {
        array_pop($excerpt);
        $excerpt = implode(' ', $excerpt) . '...';
    } else {
        $excerpt = implode(' ', $excerpt);
    }
    $excerpt = preg_replace('`\[[^\]]*\]`', '', $excerpt);
    return $excerpt;
}