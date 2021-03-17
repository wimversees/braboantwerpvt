<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class RadioFieldSettings
{
    const PostType = 'radio_posttype';
    const Query    = 'radio_query';
    const Options  = 'radio_options';
}

/**
 * This function generated a radio field for admin views
 */
function RadioField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderRadio($fieldConfig, $fieldValue);
}

function RenderRadio($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;

    // retreive and set settings on top of default settings
    $defaultSettings = array(
        RadioFieldSettings::PostType => '',
        RadioFieldSettings::Query    => array(),
        RadioFieldSettings::Options  => array(),
    );
    $customSettings = $fieldConfig->fieldSettings;
    $fieldSettings  = array_merge($defaultSettings, $customSettings);

    // field options array (will be filled with post items depending on query, or with passed options)
    $fieldOptions = array();

    // OPTION 1 : if options are set, use the options
    if (count($fieldSettings[RadioFieldSettings::Options]) > 0) {
        $fieldOptions = $fieldSettings[RadioFieldSettings::Options];
    } else
    // OPTION 2 : if query is set, use query to fill the field options
    if (count($fieldSettings[RadioFieldSettings::Query]) > 0) {
        // todo, implement query approach
    } else
    // OPTION 3 : if posttype is set, use the posttype to get all the posts for that posttype
    if (strlen($fieldSettings[RadioFieldSettings::PostType]) > 0) {
        $args = array(
            'numberposts' => -1,
            'orderby'     => 'title',
            'order'       => 'ASC',
            'post_type'   => $fieldSettings[RadioFieldSettings::PostType],
        );
        $fieldOptions = get_posts($args);
    }

    $fieldHtml = '';

    if (!$fieldOptions || count($fieldOptions) < 1) {
        $fieldHtml .= '<div class="alert alert-warning"><strong>Configuration Error.</strong> No options configured.</div>';
    } else {
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

            $fieldHtml .= '<input type="radio" id="' . $fieldSlug . '-' . $fieldOptionValue . '" name="' . $fieldSlug . '" value="' . $fieldOptionValue . '" ' . ($fieldValue == $fieldOptionValue ? 'checked' : '') . '>';
            $fieldHtml .= '<label for="' . $fieldSlug . '-' . $fieldOptionValue . '">' . $fieldOptionTitle . '</label>';
        }
    }

    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveRadioField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}