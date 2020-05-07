<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a checkbox field for admin views
 */
function CheckboxField($post, $fieldConfig)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldLabel = $fieldConfig->fieldLabel;

    $fieldValue = get_post_meta($post->ID, $fieldSlug, true);
    RenderCheckBox($fieldSlug, $fieldLabel, $fieldValue);
}

function RenderCheckBox($fieldSlug, $fieldLabel, $fieldValue)
{
    ?>
    <tr>
        <th>
            <label for="<?php echo $fieldSlug; ?>"><?php echo $fieldLabel; ?></label>
        </th>
        <td>
            <input type="checkbox" name="<?php echo $fieldSlug; ?>" id="<?php echo $fieldSlug; ?>" value="<?php echo $fieldSlug; ?>" <?php echo $fieldValue == 1 ? 'checked' : ''; ?> />
        </td>
    </tr>
    <?php
}

function SaveCheckBox($post_id, $fieldSlug)
{
    if (array_key_exists($fieldSlug, $_POST) && $_POST[$fieldSlug] == $fieldSlug) {
        update_post_meta($post_id, $fieldSlug, 1);
    } else {
        update_post_meta($post_id, $fieldSlug, 0);
    }
}