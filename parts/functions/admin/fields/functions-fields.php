<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class FieldType
{
    const Checkbox       = 'Checkbox';
    const SingleLineText = 'SingleLineText';
    const Url            = 'Url';
}

require_once 'field-checkbox.php';
require_once 'field-singlelinetext.php';
require_once 'field-url.php';

function saveField($post_id, $fieldSlug, $fieldType)
{
    switch ($fieldType) {
        case FieldType::Checkbox:
            SaveCheckbox($post_id, $fieldSlug);
            break;
        case FieldType::SingleLineText:
            SaveSingleLineText($post_id, $fieldSlug);
            break;
        case FieldType::Url:
            SaveUrl($post_id, $fieldSlug);
            break;
        default:
            SaveSingleLineText($post_id, $fieldSlug);
            break;
    }
}

function renderField($post, $field)
{
    switch ($field->fieldType) {
        case FieldType::Checkbox:
            CheckboxField($post, $field);
            break;
        case FieldType::SingleLineText:
            SingleLineTextField($post, $field);
            break;
        case FieldType::Url:
            UrlField($post, $field);
            break;
        default:
            SingleLineTextField($post, $field);
            break;
    }
}

function renderFieldLabel($fieldSlug, $fieldLabel, $fieldComment = '', $required = false)
{
    ?>
<label for="<?php echo $fieldSlug; ?>"><?php echo $fieldLabel;
    echo $required ? ' * ' : ''; ?></label>
<?php if (strlen($fieldComment) > 0) { ?>
<p class="field-comment"><?php echo $fieldComment; ?></p>
<?php
}
}