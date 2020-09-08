<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

function wiver_shortcode_button($atts)
{
    // merge parameters with default set
    $a = shortcode_atts(array(
        'class'  => 'btn-primary',
        'link'   => '',
        'linkid' => '',
        'text'   => '',
        'target' => '',
    ), $atts);

    // set the target to _blank for mailto
    if (substr($a["link"], 0, 7) === "mailto:") {
        $a["target"] = "_blank";
    }

    // set link when linkid has been filled in
    if (intval($a['linkid']) > 0) {
        $a['link'] = get_the_permalink(intval($a['linkid']));
    }

    $linkHtml = '<a ';
    $linkHtml .= 'href="' . $a['link'] . '" ';
    $linkHtml .= 'title="' . $a['text'] . '" ';
    $linkHtml .= 'class="btn ' . $a['class'] . '" ';
    if (strlen($a['target']) > 0) {
        $linkHtml .= 'target="' . $a['target'] . '" ';
    }
    $linkHtml .= '>';
    $linkHtml .= $a['text'];
    $linkHtml .= '</a>';
    return $linkHtml;
}
add_shortcode('button', 'wiver_shortcode_button');