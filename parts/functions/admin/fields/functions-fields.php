<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class FieldType
{
    const Checkbox       = 'Checkbox';
    const Date           = 'Date';
    const Image          = 'Image';
    const SingleLineText = 'SingleLineText';
    const Url            = 'Url';
}

abstract class SaveOrRenderForType
{
    const Post = 'Post';
    const Term = 'Term';
}

require_once 'field-checkbox.php';
require_once 'field-date.php';
require_once 'field-image.php';
require_once 'field-singlelinetext.php';
require_once 'field-url.php';

function SaveField($post_id, $fieldSlug, $fieldType, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    switch ($fieldType) {
        case FieldType::Checkbox:
            SaveCheckboxField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::Date:
            SaveDateField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::Image:
            SaveImageField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::SingleLineText:
            SaveSingleLineTextField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::Url:
            SaveUrlField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        default:
            SaveSingleLineTextField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
    }
}

function SaveFieldForTaxonomy($term_id, $fieldSlug, $fieldType)
{
    SaveField($term_id, $fieldSlug, $fieldType, SaveOrRenderForType::Term);
}

function RenderField($post, $field, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    // set post object to null for taxonomy creation form
    if (is_string($post)) {
        $post = null;
    }

    switch ($field->fieldType) {
        case FieldType::Checkbox:
            CheckboxField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::Date:
            DateField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::Image:
            ImageField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::SingleLineText:
            SingleLineTextField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::Url:
            UrlField($post, $field, $saveOrRenderForType);
            break;
        default:
            SingleLineTextField($post, $field, $saveOrRenderForType);
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

function GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if ($object == null) {
        return;
    }

    switch ($saveOrRenderForType) {
        case SaveOrRenderForType::Post:
            $objectId = $object->ID;
            return get_post_meta($objectId, $fieldSlug, true);
        case SaveOrRenderForType::Term:
            $objectId = $object->term_id;
            return get_term_meta($objectId, $fieldSlug, true);
        default:
            return '';
    }
}

function StoreFieldValue($objectId, $fieldSlug, $fieldValue = '', $saveOrRenderForType = SaveOrRenderForType::Post)
{
    switch ($saveOrRenderForType) {
        case SaveOrRenderForType::Post:
            return update_post_meta($objectId, $fieldSlug, $fieldValue);
        case SaveOrRenderForType::Term:
            return update_term_meta($objectId, $fieldSlug, $fieldValue);
        default:
            return '';
    }
}