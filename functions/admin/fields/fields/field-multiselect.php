<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class MultiSelectFieldSettings
{
    const PostType = 'multiselect_posttype';
    const Query    = 'multiselect_query';
    const Options  = 'multiselect_options';
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
        MultiSelectFieldSettings::PostType => '',
        MultiSelectFieldSettings::Query    => array(),
        MultiSelectFieldSettings::Options  => array(),
    );
    $customSettings = $fieldConfig->fieldSettings;
    $fieldSettings  = array_merge($defaultSettings, $customSettings);

    // field options array (will be filled with post items depending on query, or with passed options)
    $fieldOptions = array();

    // OPTION 1 : if options are set, use the options
    if (count($fieldSettings[MultiSelectFieldSettings::Options]) > 0) {
        $fieldOptions = $fieldSettings[MultiSelectFieldSettings::Options];
    } else
    // OPTION 2 : if query is set, use query to fill the field options
    if (count($fieldSettings[MultiSelectFieldSettings::Query]) > 0) {
        // todo, implement query approach
    } else
    // OPTION 3 : if posttype is set, use the posttype to get all the posts for that posttype
    if (strlen($fieldSettings[MultiSelectFieldSettings::PostType]) > 0) {
        $args = array(
            'numberposts' => -1,
            'orderby'     => 'title',
            'order'       => 'ASC',
            'post_type'   => $fieldSettings[MultiSelectFieldSettings::PostType],
        );
        $fieldOptions = get_posts($args);
    }

    $selectedOptions = explode('|', $fieldValue);

    $fieldHtml = '';

    // retreive all posts
    if (!$fieldOptions || count($fieldOptions) < 1) {
        $fieldHtml .= '<div class="alert alert-warning"><strong>Configuration Error.</strong> No options configured.</div>';
    } else {
        $fieldHtml = '<div class="wiver-multiselect">';
        $fieldHtml .= '<input id="' . $fieldSlug . '" type="hidden" name="' . $fieldSlug . '" value="' . $fieldValue . '" />';
        foreach ($fieldOptions as $fieldOption) {
            $fieldOptionTitle = '';
            $fieldOptionValue = '';

            // if fieldoption is a post, take id and label instead of raw value from list
            if (is_a($fieldOption, 'WP_Post')) {
                $fieldOptionTitle = $fieldOption->post_title;
                $fieldOptionValue = $fieldOption->ID;
            } else {
                $fieldOptionTitle = $fieldOption;
                $fieldOptionValue = str_replace(' ', '-', strtolower($fieldOption));
            }

            $fieldHtml .= '<label><input data-group="' . $fieldSlug . '" type="checkbox" id="' . $fieldOptionValue . '" value="' . $fieldOptionValue . '" ' . (in_array($fieldOptionValue, $selectedOptions) ? 'checked' : '') . ' />' . $fieldOptionTitle . '</label>';
        }
        $fieldHtml .= "</div>";
    }

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

/**
 * This function returns an array of ids (of the requested post type) where the current post id is referenced in the given slug field (of the requested post type).
 */
function MultiSelectOppositeIdArray($requestedPostType, $fieldSlugOfRequestedPostType, $currentPostId)
{
    $args = array(
        'post_type'      => $requestedPostType,
        'meta_key'       => $fieldSlugOfRequestedPostType,
        'compare'        => 'EXISTS',
        'posts_per_page' => -1,
    );

    $oppositePosts = get_posts($args);
    $ids           = array();
    foreach ($oppositePosts as $oppositePost) {
        $slugFieldIds = MultiSelectIdArrayFromField($oppositePost->ID, $fieldSlugOfRequestedPostType);
        if (in_array($currentPostId, $slugFieldIds)) {
            $ids[] = $oppositePost->ID;
        }
    }
    $ids = array_unique($ids);
    return $ids;
}