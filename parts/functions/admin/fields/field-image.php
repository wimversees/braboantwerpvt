<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a image field for admin views
 */
function ImageField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderImage($fieldConfig, $fieldValue);
}

function RenderImage($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;

    $fieldHtml = '';
    $image     = '';
    if (intval($fieldValue) > 0) {
        $image = wp_get_attachment_image($fieldValue);
    }

    // image holder with image
    $fieldHtml .= '<div class="holder-' . $fieldSlug . '">';
    $fieldHtml .= $image;
    $fieldHtml .= '</div>';

    // hidden field for field id
    $fieldHtml .= '<input type="hidden" name="' . $fieldSlug . '" class="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldValue . '" class="regular-text" />';

    // buttons
    $fieldHtml .= '<input type="button" class="wiver-media-manager button button-primary" value="Select image" data-image="' . $fieldSlug . '" />';
    $fieldHtml .= '<input type="button" class="wiver-media-remove button button-secondary" value="Remove image" data-image="' . $fieldSlug . '" />';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveImageField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}

// ajax admin handler after new selection of image
add_action('wp_ajax_wiverImageRefresh', 'wiverImageRefresh');
function wiverImageRefresh()
{
    if (isset($_GET['id'])) {
        $image = wp_get_attachment_image(filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT));
        $data  = array(
            'image' => $image,
        );
        wp_send_json_success($data);
    } else {
        wp_send_json_error();
    }
}