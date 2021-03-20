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
    return getFrontEndFile(c('default-og-image'), false);
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
    return GetLocale();
}

/**
 * This function returns the locale for the html element. Eg: en_GB will be transfered to EN
 *
 * @return void
 */
function get_html_locale()
{
    $locale = GetLocale();
    return strlen($locale) >= 2 ? substr($locale, 0, 2) : $locale;
}