<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class MultiSelectFieldSettings
{
    const PostType = 'multiselect_posttype';
    const Query    = 'multiselect_query';
}

/**
 * This function generated a multiselect field for admin views
 */
function MultiSelectField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderMultiSelect($fieldConfig, $fieldValue);
}

function RenderMultiSelect($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;

    // retreive and set settings on top of default settings
    $defaultSettings = array(
        MultiSelectFieldSettings::PostType => 'post',
        MultiSelectFieldSettings::Query    => array(),
    );
    $customSettings = $fieldConfig->fieldSettings;
    $fieldSettings  = array_merge($defaultSettings, $customSettings);

    $fieldOptions = array();
    // if query is set, use query
    if (count($fieldSettings[MultiSelectFieldSettings::Query]) > 0) {

    }
    // if query is not set, use posttype with default: post
    else {
        $args = array(
            'numberposts' => -1,
            'orderby'     => 'title',
            'order'       => 'ASC',
            'post_type'   => $fieldSettings[MultiSelectFieldSettings::PostType],
        );
        $fieldOptions = get_posts($args);
    }

    $selectedOptions = explode('|', $fieldValue);

    // retreive all posts
    $fieldHtml = '<div class="wiver-multiselect">';
    $fieldHtml .= '<input id="' . $fieldSlug . '" type="hidden" name="' . $fieldSlug . '" value="' . $fieldValue . '" />';
    foreach ($fieldOptions as $fieldOption) {
        $fieldOptionId    = $fieldOption->ID;
        $fieldOptionTitle = $fieldOption->post_title;
        $fieldHtml .= '<label><input data-group="' . $fieldSlug . '" type="checkbox" id="' . $fieldOptionId . '" value="' . $fieldOptionId . '" ' . (in_array($fieldOptionId, $selectedOptions) ? 'checked' : '') . ' />' . $fieldOptionTitle . '</label>';
    }
    $fieldHtml .= "</div>";

    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveMultiSelectField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}

/**
 * This function returns an array of integer ids for a given fieldslug and a post id.
 */
function MultiSelectIdArrayFromField($postId, $fieldSlug)
{
    $fieldValue = get_post_meta($postId, $fieldSlug, true);
    $ids        = array();
    foreach (explode('|', $fieldValue) as $id) {
        $idInteger = intval($id);
        if ($idInteger > 0) {
            $ids[] = $idInteger;
        }
    }
    return $ids;
}