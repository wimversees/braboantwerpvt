<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function is used in the header and footer, to check the configured slug to enable the wordpress wp_head and wp_foot default functions.
 */
function useWpHeadWpFooter()
{
    global $template;
    if (is_user_logged_in()) {
        return true;
    }

    foreach (c('enable-wp-head-foot-slugs') as $enabledSlug) {
        if (strpos($template, $enabledSlug) !== false) {
            return true;
        }
    }

    return false;
}