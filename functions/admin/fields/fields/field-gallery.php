<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a gallery field for admin views
 */
function GalleryField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderGallery($fieldConfig, $fieldValue);
}

function RenderGallery($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;

    $fieldHtml = '';
    $gallery   = '';
    foreach (explode(',', $fieldValue) as $imageId) {
        if (intval($imageId) > 0) {
            $gallery .= wp_get_attachment_image(intval($imageId));
        }
    }

    // gallery holder with gallery
    $fieldHtml .= '<div class="holder-' . $fieldSlug . ' gallery-holder">';
    $fieldHtml .= $gallery;
    $fieldHtml .= '</div>';

    // hidden field for field id
    $fieldHtml .= '<input type="hidden" name="' . $fieldSlug . '" class="' . $fieldSlug . '" id="' . $fieldSlug . '" value="' . $fieldValue . '" class="regular-text" />';

    // buttons
    $fieldHtml .= '<input type="button" class="wiver-gallery-manager button button-primary" value="Select gallery" data-gallery="' . $fieldSlug . '" />';
    $fieldHtml .= '<input type="button" class="wiver-gallery-remove button button-secondary" value="Remove gallery" data-gallery="' . $fieldSlug . '" />';
    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveGalleryField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}

// ajax admin handler after new selection of gallery
add_action('wp_ajax_wiverGalleryRefresh', 'wiverGalleryRefresh');
function wiverGalleryRefresh()
{
    if (isset($_GET['id'])) {
        $imageIds = explode(',', $_GET['id']);

        $data = array(
            'gallery' => array(),
        );

        foreach ($imageIds as $imageId) {
            $imageUrl          = wp_get_attachment_image($imageId);
            $data['gallery'][] = $imageUrl;
        }

        wp_send_json_success($data);
    } else {
        wp_send_json_error();
    }
}