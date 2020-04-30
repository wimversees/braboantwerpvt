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
    $default = get_bloginfo('name') . ' - ' . get_bloginfo('description');
    if (is_home() || is_front_page()) {
        echo $default;
    } elseif (is_404()) {
        echo t('404-title') . ' - ' . $default;
    } elseif (is_category()) {
        single_cat_title();
        echo ' - ' . $default;
    } elseif (is_post_type_archive()) {
        post_type_archive_title();
        echo ' - ' . $default;
    } else {
        echo get_the_title() . ' - ' . $default;
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