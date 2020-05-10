<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a url field for admin views
 */
function UrlField($post, $fieldConfig)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = get_post_meta($post->ID, $fieldSlug, true);
    RenderUrl($fieldConfig, $fieldValue);
}

function RenderUrl($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;
    $fieldHtml = '<input type="url" name="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldValue . '" ' . ($fieldConfig->required ? 'required' : '') . '/>';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveUrl($post_id, $fieldSlug)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        update_post_meta($post_id, $fieldSlug, $_POST[$fieldSlug]);
    }
}
