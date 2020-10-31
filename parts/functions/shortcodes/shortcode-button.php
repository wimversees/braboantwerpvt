<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

function wiver_shortcode_button($atts)
{
    // merge parameters with default set
    $a = shortcode_atts(array(
        'doc'    => '',
        'class'  => 'btn-primary',
        'link'   => '',
        'linkid' => '',
        'text'   => '',
        'target' => '',
    ), $atts);

    // return documentation table
    if (strlen($a['doc']) > 0) {
        return wiver_shortcode_button_documentation();
    }

    // set link when linkid has been filled in
    if (intval($a['linkid']) > 0) {
        $a['link'] = get_the_permalink(intval($a['linkid']));
        if (strlen($a['text']) == 0) {
            $a['text'] = get_the_title(intval($a['linkid']));
        }
    }

    $isExternalLink = !(strpos($a['link'], $_SERVER['HTTP_HOST']) !== false);

    // set the target to _blank for mailto and external urls
    if (substr($a["link"], 0, 7) === "mailto:" || $isExternalLink) {
        $a["target"] = "_blank";
    }

    $linkHtml = '<a ';
    $linkHtml .= 'href="' . $a['link'] . '" ';
    $linkHtml .= 'title="' . $a['text'] . '" ';
    $linkHtml .= 'class="btn ' . $a['class'] . '" ';
    if ($isExternalLink) {
        $linkHtml .= 'rel="noreferrer" ';
    }
    if (strlen($a['target']) > 0) {
        $linkHtml .= 'target="' . $a['target'] . '" ';
    }
    $linkHtml .= '>';
    $linkHtml .= $a['text'];
    $linkHtml .= '</a>';
    return $linkHtml;
}
add_shortcode('button', 'wiver_shortcode_button');

function wiver_shortcode_button_documentation()
{
    $documentation = [
        "shortcode"  => "button",
        "attributes" => [
            [
                "attr"    => "class",
                "default" => "btn-primary",
                "comment" => "Css class for the button",
                "example" => "btn-secondary",
            ],
            [
                "attr"    => "link",
                "default" => "",
                "comment" => "The URL for the buttonq",
                "example" => "https://www.wiver.be",
            ],
            [
                "attr"    => "linkid",
                "default" => "",
                "comment" => "The ID of the item to link to, as internal link",
                "example" => "",
            ],
            [
                "attr"    => "text",
                "default" => "",
                "comment" => "The shown text on the button",
                "example" => "Text of the button",
            ],
            [
                "attr"    => "target",
                "default" => "Empty, _blank for url not from current website",
                "comment" => "The target attribute of the anchor",
                "example" => "_blank",
            ],
        ],
    ];
    return shortcode_documentation($documentation);
}