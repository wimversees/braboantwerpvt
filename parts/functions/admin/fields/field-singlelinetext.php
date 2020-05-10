<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a single line text field for admin views
 */
function SingleLineTextField($post, $fieldConfig)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = get_post_meta($post->ID, $fieldSlug, true);
    RenderSingleLineText($fieldConfig, $fieldValue);
}

function RenderSingleLineText($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;
    $fieldHtml = '<input type="text" name="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldValue . '" ' . ($fieldConfig->required ? 'required' : '') . '/>';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveSingleLineText($post_id, $fieldSlug)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        update_post_meta($post_id, $fieldSlug, $_POST[$fieldSlug]);
    }
}
