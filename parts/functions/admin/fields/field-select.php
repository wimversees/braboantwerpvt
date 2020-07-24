<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a select field for admin views
 */
function SelectField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderSelect($fieldConfig, $fieldValue);
}

function RenderSelect($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;

    $fieldHtml = '';

    if (!$fieldConfig->fieldValues || count($fieldConfig->fieldValues) < 1) {
        $fieldHtml .= '<div class="alert alert-warning"><strong>Configuration Error.</strong> No options configured.</div>';
    } else {
        $fieldHtml .= '<select name="' . $fieldSlug . '" class="' . $fieldSlug . '" ' . ($fieldConfig->required ? 'required' : '') . '>';
        $fieldHtml .= '<option value="" ' . ($fieldValue == '' ? 'selected' : '') . ' ' . ($fieldConfig->required ? 'disabled' : '') . '>Choose...</option>';
        foreach ($fieldConfig->fieldValues as $fieldRawValue) {
            $fieldValueSlugged = str_replace(' ', '-', strtolower($fieldRawValue));
            $fieldHtml .= '<option value="' . $fieldValueSlugged . '" ' . ($fieldValue == $fieldValueSlugged ? 'selected' : '') . '>' . $fieldRawValue . '</option>';
        }
        $fieldHtml .= '</select>';
    }

    // remove button when field is not required
    if (!$fieldConfig->required) {
        $fieldHtml .= '<input type="button" class="wiver-select-remove button button-secondary" value="Remove Selection" data-select="' . $fieldSlug . '" />';
    }

    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveSelectField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}