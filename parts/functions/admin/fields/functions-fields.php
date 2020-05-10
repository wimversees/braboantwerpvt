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

function SaveField($post_id, $fieldSlug, $fieldType)
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

function RenderField($post, $field)
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

function RenderFieldHtml($fieldConfig, $fieldHtml)
{
    ?>
<tr class="form-field<?php echo $fieldConfig->required ? 'form-required' : ''; ?>">
    <th scope="row">
        <label for="<?php echo $fieldConfig->fieldSlug; ?>"><?php echo $fieldConfig->fieldLabel; ?></label>
    </th>
    <td><?php echo $fieldHtml; ?>
        <?php if (strlen($fieldConfig->fieldComment) > 0) { ?>
        <p class="description"><?php echo $fieldConfig->fieldComment; ?></p>
        <?php } ?>
    </td>
</tr>
<?php }