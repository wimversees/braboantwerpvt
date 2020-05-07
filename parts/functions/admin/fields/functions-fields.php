<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class FieldType
{
    const SingleLineText = 'SingleLineText';
    const MultiLineText  = 'MultiLineText';
    const Checkbox       = 'Checkbox';
}

require_once 'field-singlelinetext.php';
require_once 'field-checkbox.php';

function saveField($post_id, $fieldSlug, $fieldType)
{
    switch ($fieldType) {
        case FieldType::SingleLineText:
            SaveSingleLineText($post_id, $fieldSlug);
            break;
        case FieldType::Checkbox:
            SaveCheckbox($post_id, $fieldSlug);
            break;
        default:
            SaveSingleLineText($post_id, $fieldSlug);
            break;
    }
}

function renderField($post, $field)
{
    switch ($field->fieldType) {
        case FieldType::SingleLineText:
            SingleLineTextField($post, $field);
            break;
        case FieldType::Checkbox:
            CheckboxField($post, $field);
            break;
        default:
            SingleLineTextField($post, $field);
            break;
    }
}
