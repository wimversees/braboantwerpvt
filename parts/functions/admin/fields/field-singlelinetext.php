<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a single line text field for admin views
 */
function SingleLineTextField($post, $fieldConfig)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldLabel = $fieldConfig->fieldLabel;

    $fieldValue = get_post_meta($post->ID, $fieldSlug, true);
    RenderSingleLineText($fieldSlug, $fieldLabel, $fieldValue);
}

function RenderSingleLineText($fieldSlug, $fieldLabel, $fieldValue)
{
    ?>
    <tr>
        <th>
            <label for="<?php echo $fieldSlug; ?>"><?php echo $fieldLabel; ?></label>
        </th>
        <td>
            <input name="<?php echo $fieldSlug; ?>" id="<?php echo $fieldSlug; ?>" value="<?php echo $fieldValue; ?>" />
        </td>
    </tr>
    <?php
}

function SaveSingleLineText($post_id, $fieldSlug)
{
    update_post_meta($post_id, $fieldSlug, $_POST[$fieldSlug]);
}