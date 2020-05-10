<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a checkbox field for admin views
 */
function CheckboxField($post, $fieldConfig)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = get_post_meta($post->ID, $fieldSlug, true);
    RenderCheckBox($fieldConfig, $fieldValue);
}

function RenderCheckBox($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;
    $fieldHtml = '<input type="checkbox" name="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldSlug . '" ' . ($fieldValue == 1 ? 'checked' : '') . ' />';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveCheckBox($post_id, $fieldSlug)
{
    if (array_key_exists($fieldSlug, $_POST) && $_POST[$fieldSlug] == $fieldSlug) {
        update_post_meta($post_id, $fieldSlug, 1);
    } else {
        update_post_meta($post_id, $fieldSlug, 0);
    }
}
