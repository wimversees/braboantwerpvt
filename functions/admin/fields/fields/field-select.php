<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class SelectFieldSettings
{
    const PostType = 'select_posttype';
    const Query    = 'select_query';
    const Options  = 'select_options';
}

/**
 * This function generated a select field for admin views
 */
function SelectField($object, $fieldConfig, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldValue = GetStoredFieldValue($object, $fieldSlug, $saveOrRenderForType);
    RenderSelect($fieldConfig, $fieldValue);
}

function RenderSelect($fieldConfig, $fieldValue)
{
    $fieldSlug = $fieldConfig->fieldSlug;

    // retreive and set settings on top of default settings
    $defaultSettings = array(
        SelectFieldSettings::PostType => '',
        SelectFieldSettings::Query    => array(),
        SelectFieldSettings::Options  => array(),
    );
    $customSettings = $fieldConfig->fieldSettings;
    $fieldSettings  = array_merge($defaultSettings, $customSettings);

    // field options array (will be filled with post items depending on query, or with passed options)
    $fieldOptions = array();

    // OPTION 1 : if options are set, use the options
    if (count($fieldSettings[SelectFieldSettings::Options]) > 0) {
        $fieldOptions = $fieldSettings[SelectFieldSettings::Options];
    } else
    // OPTION 2 : if query is set, use query to fill the field options
    if (count($fieldSettings[SelectFieldSettings::Query]) > 0) {
        // todo, implement query approach
    } else
    // OPTION 3 : if posttype is set, use the posttype to get all the posts for that posttype
    if (strlen($fieldSettings[SelectFieldSettings::PostType]) > 0) {
        $args = array(
            'numberposts' => -1,
            'orderby'     => 'title',
            'order'       => 'ASC',
            'post_type'   => $fieldSettings[SelectFieldSettings::PostType],
        );
        $fieldOptions = get_posts($args);
    }

    $fieldHtml = '';

    if (!$fieldOptions || count($fieldOptions) < 1) {
        $fieldHtml .= '<div class="alert alert-warning"><strong>Configuration Error.</strong> No options configured.</div>';
    } else {
        $fieldHtml .= '<select name="' . $fieldSlug . '" class="' . $fieldSlug . '" ' . ($fieldConfig->required ? 'required aria-required="true"' : '') . '>';
        $fieldHtml .= '<option value="" ' . ($fieldValue == '' ? 'selected' : '') . ' ' . ($fieldConfig->required ? 'disabled' : '') . '>Choose...</option>';
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

            $fieldHtml .= '<option value="' . $fieldOptionValue . '" ' . ($fieldValue == $fieldOptionValue ? 'selected' : '') . '>' . $fieldOptionTitle . '</option>';
        }
        $fieldHtml .= '</select>';
    }

    // remove button when field is not required
    if (!$fieldConfig->required) {
        $fieldHtml .= '<input type="button" class="wiver-select-remove button button-secondary" value="Remove Selection" data-select="' . $fieldSlug . '" />';
    }

    RenderFieldHtml($fieldConfig, $fieldHtml);
}

function SaveSelectField($objectId, $fieldSlug, $saveOrRenderForType = SaveOrRenderForType::Post)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        $valueToStore = $_POST[$fieldSlug];
        StoreFieldValue($objectId, $fieldSlug, $valueToStore, $saveOrRenderForType);
    }
}
