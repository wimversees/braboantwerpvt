<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class FieldType
{
    const SingleLineText = 'SingleLineText';
    const MultiLineText  = 'MultiLineText';
}

require_once 'field-singlelinetext.php';

function saveField($post_id, $fieldSlug, $fieldType)
{
    update_post_meta($post_id, $fieldSlug, $_POST[$fieldSlug]);
}
