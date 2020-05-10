<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a checkbox field for admin views
 */
function CheckboxField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderCheckBox($fieldConfig, $fieldValue);
}

function RenderCheckBox($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;
    $fieldHtml = '<input type="checkbox" name="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldSlug . '" ' . ($fieldValue == 1 ? 'checked' : '') . ' />';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveCheckBox($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $valueToStore = array_key_exists($fieldSlug, $_POST) && $_POST[$fieldSlug] == $fieldSlug ? 1 : 0;
    StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
}