<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a single line text field for admin views
 */
function DateField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderDateField($fieldConfig, $fieldValue);
}

function RenderDateField($fieldConfig, $fieldValue)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = $fieldValue > 0 ? date('Y-m-d', intval($fieldValue)) : '';
    $fieldHtml  = '<input type="date" name="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldValue . '" ' . ($fieldConfig->required ? 'required' : '') . '/>';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveDateField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = strtotime($_POST[$fieldSlug]);
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}