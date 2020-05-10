<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a single line text field for admin views
 */
function SingleLineTextField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderSingleLineText($fieldConfig, $fieldValue);
}

function RenderSingleLineText($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;
    $fieldHtml = '<input type="text" name="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldValue . '" ' . ($fieldConfig->required ? 'required' : '') . '/>';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveSingleLineText($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}