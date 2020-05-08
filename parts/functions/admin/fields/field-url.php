<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function generated a url field for admin views
 */
function UrlField($post, $fieldConfig)
{
    $fieldSlug  = $fieldConfig->fieldSlug;
    $fieldLabel = $fieldConfig->fieldLabel;
    $required   = $fieldConfig->required;

    $fieldValue = get_post_meta($post->ID, $fieldSlug, true);
    RenderUrl($fieldSlug, $fieldLabel, $fieldValue, $required);
}

function RenderUrl($fieldSlug, $fieldLabel, $fieldValue, $required)
{
    ?>
<tr>
    <th>
        <label for="<?php echo $fieldSlug; ?>"><?php echo $fieldLabel; ?></label>
    </th>
    <td>
        <input type="url" name="<?php echo $fieldSlug; ?>" id="<?php echo $fieldSlug; ?>" value="<?php echo $fieldValue; ?>"
            <?php echo $required ? 'required' : ''; ?> />
    </td>
</tr>
<?php
}

function SaveUrl($post_id, $fieldSlug)
{
    if (array_key_exists($fieldSlug, $_POST)) {
        update_post_meta($post_id, $fieldSlug, $_POST[$fieldSlug]);
    }
}