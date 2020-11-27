<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/*
 * SECTION SHORTCODES
 */

require_once 'shortcode-button.php';
require_once 'shortcode-youtube.php';

function shortcode_documentation($shortcode)
{
    $shortcodeName     = $shortcode["shortcode"];
    $attributes        = $shortcode["attributes"];
    $exampleAttributes = [];

    $outputHtml = '<div class="col-12">';

    $outputHtml .= '<h2>Shortcode: ' . $shortcodeName . '</h2>';

    $outputHtml .= '<table class="table table-sm table-bordered table-light table-striped">';
    $outputHtml .= '<tr>';
    $outputHtml .= '<th>Attribute</th>';
    $outputHtml .= '<th>Default Value</th>';
    $outputHtml .= '<th>Comment</th>';
    $outputHtml .= '</tr>';

    foreach ($attributes as $attribute) {
        $outputHtml .= '<tr>';
        $outputHtml .= '<th>' . $attribute["attr"] . '</th>';
        $outputHtml .= '<td>' . $attribute["default"] . '</td>';
        $outputHtml .= '<td>' . $attribute["comment"] . '</td>';
        $outputHtml .= '</tr>';
        $exampleAttributes[] = $attribute["attr"] . '="' . $attribute["example"] . '"';
    }

    $outputHtml .= '</table>';

    $exampleShortcode = '[' . $shortcodeName . ' ' . implode(" ", $exampleAttributes) . ']';
    $outputHtml .= '<p>Example: <pre>' . $exampleShortcode . '</pre></p>';
    $outputHtml .= do_shortcode($exampleShortcode);

    $outputHtml .= '</div>';

    return $outputHtml;
}
