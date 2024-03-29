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
    $blogName = get_bloginfo('name');

    // check if page has meta title filled in
    $seoTitle = get_post_meta(get_the_ID(), SeoBaseType::SeoMetaTitle, true);
    if (strlen($seoTitle) > 0) {
        $defaultForPage = $seoTitle . ' - ' . $blogName;
        echo strlen($defaultForPage) >= 70 ? $seoTitle : $defaultForPage;
        return;
    }

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
 * This function echoes the keywords of the page
 *
 * @return void
 */
function page_keywords()
{
    $blogName = get_bloginfo('name');

    // check if page has meta description filled in
    $seoKeywords = get_post_meta(get_the_ID(), SeoBaseType::SeoMetaKeywords, true);
    if (strlen($seoKeywords) > 0) {
        echo $seoKeywords . ' ' . $blogName;
        return;
    }

    $blogDescription = get_bloginfo('description');
    $default         = $blogName . ' ' . $blogDescription;
    // homepage
    if (is_home() || is_front_page()) {
        echo $default;
        return;
    }
    // other page
    $pageTitle      = GetPageTitleH1();
    $defaultForPage = GetPageTitleH1() . ' ' . $default;
    echo $defaultForPage;
}

/**
 * This function returns the h1 title of the current page, according to the type of page
 */
function GetPageTitleH1()
{
    if (is_front_page()) {
        // Do not return title
    } elseif (is_home()) {
        // empty value as first parameter to remove separator
        return trim(wp_title("", false));
    } elseif (is_single()) {
        return get_the_title(get_the_ID());
    }
    // disabled for no-shop websites
    /* elseif (is_shop()) {
    return woocommerce_page_title(false);
    }*/elseif (is_author()) {
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
    // check if page has meta description filled in
    $seoDescription = get_post_meta(get_the_ID(), SeoBaseType::SeoMetaDescription, true);
    if (strlen($seoDescription) > 0) {
        echo $seoDescription;
        return;
    }

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
    return strip_tags($excerpt);
}