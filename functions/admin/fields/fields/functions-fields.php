<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class FieldType
{
    const Checkbox       = 'Checkbox';
    const Date           = 'Date';
    const DateTime       = 'DateTime';
    const Gallery        = 'Gallery';
    const Image          = 'Image';
    const Integer        = 'Integer';
    const MultiLineText  = 'MultiLineText';
    const MultiSelect    = 'MultiSelect';
    const Radio          = 'Radio';
    const RichText       = 'RichText';
    const Select         = 'Select';
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
require_once 'field-datetime.php';
require_once 'field-gallery.php';
require_once 'field-image.php';
require_once 'field-integer.php';
require_once 'field-multilinetext.php';
require_once 'field-multiselect.php';
require_once 'field-radio.php';
require_once 'field-richtext.php';
require_once 'field-select.php';
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
        case FieldType::DateTime:
            SaveDateTimeField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::Gallery:
            SaveGalleryField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::Image:
            SaveImageField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::Integer:
            SaveIntegerField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::MultiLineText:
            SaveMultiLineTextField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::MultiSelect:
            SaveMultiSelectField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::Radio:
            SaveRadioField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::RichText:
            SaveRichTextField($post_id, $fieldSlug, $saveOrRenderForType);
            break;
        case FieldType::Select:
            SaveSelectField($post_id, $fieldSlug, $saveOrRenderForType);
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
        case FieldType::DateTime:
            DateTimeField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::Gallery:
            GalleryField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::Image:
            ImageField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::Integer:
            IntegerField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::Radio:
            RadioField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::MultiLineText:
            MultiLineTextField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::MultiSelect:
            MultiSelectField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::RichText:
            RichTextField($post, $field, $saveOrRenderForType);
            break;
        case FieldType::Select:
            SelectField($post, $field, $saveOrRenderForType);
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
<tr class="form-field<?php echo $fieldConfig->required ? ' form-required aria-required="true"' : ''; ?>">
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

function RenderMetaboxes($postTypeConfig)
{
    if ($postTypeConfig->fields) {
        $postType      = $postTypeConfig->postType;
        $postTypeViews = [$postType];
        foreach ($postTypeViews as $postTypeView) {
            // render meta box for single fields (not part of fieldgroup)
            $fieldsForDefaultGroup = array();
            foreach ($postTypeConfig->fields as $field) {
                if (is_object($field) && $field instanceof FieldConfig) {
                    $fieldsForDefaultGroup[] = $field;
                }
            }
            if (count($fieldsForDefaultGroup) > 0) {
                $metaBoxTitle = $postTypeConfig->singularName . ' Fields';
                add_meta_box('example_metabox', $metaBoxTitle, 'RenderMetaboxContent', $postTypeView, 'normal', 'high', array("fields" => $fieldsForDefaultGroup, "postTypeConfig" => $postTypeConfig));
            }

            // render meta box groups
            foreach ($postTypeConfig->fields as $field) {
                if (is_object($field) && $field instanceof FieldGroup) {
                    $metaBoxId = 'metabox-' . str_replace(' ', '-', $field->fieldGroupTitle);
                    add_meta_box($metaBoxId, $field->fieldGroupTitle, 'RenderMetaboxContent', $postTypeView, 'normal', 'high', array("fields" => $field->fieldGroupFields, "postTypeConfig" => $postTypeConfig));
                }
            }
        }
    }
}

function RenderMetaboxContent($post, $callback_args)
{
    global $post;
    $args           = $callback_args['args'];
    $fields         = $args['fields'];
    $postTypeConfig = $args['postTypeConfig'];

    if (count($fields) > 0) {
        echo '<div class="wiver-fields">';
        echo '<table class="form-table">';
        foreach ($fields as $field) {
            RenderField($post, $field);
        }
        echo '</table>';
        echo '</div>';
    } else {
        echo '<p class="alert alert-warning">No fields configured for this group.</p>';
    }
}

function SavePostData($postTypeConfig, $postId)
{
    foreach ($postTypeConfig->fields as $field) {
        if (is_object($field) && $field instanceof FieldGroup) {
            foreach ($field->fieldGroupFields as $fieldGroupField) {
                SaveField($postId, $fieldGroupField->fieldSlug, $fieldGroupField->fieldType);
            }
        } else {
            SaveField($postId, $field->fieldSlug, $field->fieldType);
        }
    }
}

function RenderMetaboxesForTaxonomy($taxonomyTypeConfig, $tag)
{
    if ($taxonomyTypeConfig->fields) {
        $taxonomyType      = $taxonomyTypeConfig->taxonomyType;
        $taxonomyTypeViews = [$taxonomyType];
        foreach ($taxonomyTypeViews as $taxonomyTypeView) {
            // render meta box for single fields (not part of fieldgroup)
            $fieldsForDefaultGroup = array();
            foreach ($taxonomyTypeConfig->fields as $field) {
                if (is_object($field) && $field instanceof FieldConfig) {
                    $fieldsForDefaultGroup[] = $field;
                }
            }
            if (count($fieldsForDefaultGroup) > 0) {
                $metaBoxTitle = $taxonomyTypeConfig->singularName . ' Fields';
                RenderMetaboxTaxonomyContent($tag, $fieldsForDefaultGroup, $metaBoxTitle);
            }

            // render meta box groups
            foreach ($taxonomyTypeConfig->fields as $field) {
                if (is_object($field) && $field instanceof FieldGroup) {
                    $metaBoxId    = 'metabox-' . str_replace(' ', '-', $field->fieldGroupTitle);
                    $metaBoxTitle = $field->fieldGroupTitle . ' Fields';
                    RenderMetaboxTaxonomyContent($tag, $field->fieldGroupFields, $metaBoxTitle);
                }
            }
        }
    }
}

function RenderMetaboxTaxonomyContent($tag, $fields, $metaBoxTitle)
{
    echo '<div class="wiver-fields taxonomy-fields">';
    echo '<h2>' . $metaBoxTitle . '</h2>';
    foreach ($fields as $field) {
        echo '<div class="form-field' . ($field->required ? ' form-required aria-required="true"' : '') . '">';
        RenderField($tag, $field, SaveOrRenderForType::Term);
        echo '</div>';
    }
    echo '</div>';
}

function SaveTaxonomyData($taxonomyTypeConfig, $termId)
{
    foreach ($taxonomyTypeConfig->fields as $field) {
        if (is_object($field) && $field instanceof FieldGroup) {
            foreach ($field->fieldGroupFields as $fieldGroupField) {
                SaveField($termId, $fieldGroupField->fieldSlug, $fieldGroupField->fieldType, SaveOrRenderForType::Term);
            }
        } else {
            SaveField($termId, $field->fieldSlug, $field->fieldType, SaveOrRenderForType::Term);
        }
    }
}

/**
 * This function lower cases the given string, and replaces all characters not allowed in a slug
 */
function SluggifyString($string)
{
    return sanitize_title($string);
}