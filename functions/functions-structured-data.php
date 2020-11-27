<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/*
 * SECTION Structured data
 */

function cleanupStructuredDataOutput($output)
{
    $output = str_replace('\u20ac', '€', $output);
    $output = str_replace('\/', '/', $output);
    return $output;
}