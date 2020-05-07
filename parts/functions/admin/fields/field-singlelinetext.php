<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a single line text field for admin views, it also handles the save action of this field
 */
function SingleLineTextField($post, $fieldConfig)
{
    $fieldSlug = $fieldConfig->fieldSlug;
    $fieldLabel = $fieldConfig->fieldLabel;

    //SaveSingleLineText($post->ID, $fieldSlug);
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