<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a multi line text field for admin views
 */
function MultiLineTextField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderMultiLineText($fieldConfig, $fieldValue);
}

function RenderMultiLineText($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;
    $fieldHtml = '<textarea type="text" name="' . $fieldSlug . '" id="' . $fieldSlug . '" rows="4" ' . ($fieldConfig->required ? 'required' : '') . '>' . $fieldValue . '</textarea>';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveMultiLineTextField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}