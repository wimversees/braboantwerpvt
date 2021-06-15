<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a single line text field for admin views
 */
function DateTimeField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderDateTimeField($fieldConfig, $fieldValue);
}

function RenderDateTimeField($fieldConfig, $fieldValue)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = $fieldValue > 0 ? date('Y-m-d\TH:i', intval($fieldValue)) : '';
    $fieldHtml  = '<input type="datetime-local" name="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldValue . '" ' . ($fieldConfig->required ? 'required aria-required="true"' : '') . '/>';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveDateTimeField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = strtotime($_POST[$fieldSlug]);
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}