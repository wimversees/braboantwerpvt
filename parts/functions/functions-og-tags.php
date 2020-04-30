<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/*
 * SECTION OPEN GRAPH
 */

/**
 * This function returns the og:image url
 *
 * @return void
 */
function get_og_image()
{
    if (!is_home() || !is_front_page()) {
        // general thumbnail defined
        $currentThumb = get_the_post_thumbnail_url();
        if (strlen($currentThumb) > 0) {
            return $currentThumb;
        }

    }
    // default image
    return get_stylesheet_directory_uri() . c('default-og-image');
}

/**
 * This function returns the og:image url, with the optimal dimensions for facebook
 *
 * @return void
 */
function get_og_image_facebook()
{
    // default image
    return get_og_image();
}

/**
 * This function returns the og:image url, with the optimal dimensions for twitter
 *
 * @return void
 */
function get_og_image_twitter()
{
    // default image
    return get_og_image();
}

/**
 * This function returns the og:description value
 *
 * @return void
 */
function get_og_description()
{
    if (!is_home() || !is_front_page()) {
        $excerpt = excerpt(20);
        if (strlen($excerpt) == 0) {
            $excerpt = bloginfo('description');
        }

        return $excerpt;
    }
    return bloginfo('description');
}

/**
 * This function returns the locale of the current page
 *
 * @return void
 */
function get_og_locale()
{
    return defined('ICL_LANGUAGE_CODE') && strlen(ICL_LANGUAGE_CODE) > 0 ? ICL_LANGUAGE_CODE : c('default-locale');
}