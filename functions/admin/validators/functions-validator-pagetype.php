<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 *
 */
function IsPageTypeValidator($page)
{
    if (array_key_exists('post', $_GET)) {
        $id   = $_GET['post'];
        $slug = get_page_template_slug($id);
        return $page == $slug;
    }
    return false;
}