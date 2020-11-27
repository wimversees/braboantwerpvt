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

    // retreive and set settings on top of default settings
    $defaultSettings = array(
        'media_buttons' => false,
        'textarea_rows' => 10,
    );
    $customSettings = $fieldConfig->fieldSettings;
    $editorSettings = array_merge($defaultSettings, $customSettings);

    // create rich text editor with ob_
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