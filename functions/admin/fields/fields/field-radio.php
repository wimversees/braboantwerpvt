<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a radio field for admin views
 */
function RadioField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderRadio($fieldConfig, $fieldValue);
}

function RenderRadio($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;

    $fieldHtml = '';

    if (!$fieldConfig->fieldValues || count($fieldConfig->fieldValues) < 1) {
        $fieldHtml .= '<div class="alert alert-warning"><strong>Configuration Error.</strong> No options configured.</div>';
    } else {
        foreach ($fieldConfig->fieldValues as $fieldRawValue) {
            $fieldValueSlugged = str_replace(' ', '-', strtolower($fieldRawValue));
            $fieldHtml .= '<input type="radio" id="' . $fieldSlug . '-' . $fieldValueSlugged . '" name="' . $fieldSlug . '" value="' . $fieldValueSlugged . '" ' . ($fieldValue == $fieldValueSlugged ? 'checked' : '') . '>';
            $fieldHtml .= '<label for="' . $fieldSlug . '-' . $fieldValueSlugged . '">' . $fieldRawValue . '</label>';
        }
    }

    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveRadioField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}