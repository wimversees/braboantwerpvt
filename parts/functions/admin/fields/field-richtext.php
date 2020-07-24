<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a single line text field for admin views
 */
function RichTextField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderRichText($fieldConfig, $fieldValue);
}

function RenderRichText($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;

    $editorSettings = array(
        'media_buttons' => false,
        'textarea_rows' => 10,
    );
    ob_start();
    wp_editor($fieldValue, $fieldSlug, $editorSettings);
    $outputStream = ob_get_clean();

    $fieldHtml = $outputStream;

    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveRichTextField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}