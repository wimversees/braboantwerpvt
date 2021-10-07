<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

function wiver_shortcode_vimeo($atts)
{
    // merge parameters with default set
    $a = shortcode_atts(array(
        'doc'   => '',
        'id'    => '',
        'name'  => '',
        'title' => get_the_title(get_the_ID()),
    ), $atts);

    // return documentation table
    if (strlen($a['doc']) > 0) {
        return wiver_shortcode_vimeo_documentation();
    }

    // fallback from name to title
    if (strlen($a['name']) > 0) {
        $a['title'] = $a['name'];
    }

    // create output html
    $linkHtml = '<iframe ';
    $linkHtml .= 'title="' . $a['title'] . '" ';
    $linkHtml .= 'data-src="https://player.vimeo.com/video/' . $a['id'] . '" ';
    $linkHtml .= 'class="vimeo" ';
    $linkHtml .= 'width="560" height="315" allowtransparency="true" frameborder="0"';
    $linkHtml .= '>';
    $linkHtml .= '</iframe>';
    return $linkHtml;
}
add_shortcode('vimeo', 'wiver_shortcode_vimeo');

function wiver_shortcode_vimeo_documentation()
{
    $documentation = [
        "shortcode"  => "vimeo",
        "attributes" => [
            [
                "attr"    => "id",
                "default" => "",
                "comment" => "Vimeo Video ID",
                "example" => "112836958",
            ],
            [
                "attr"    => "name",
                "default" => "",
                "comment" => "This parameter will be the title attribute of the iframe",
                "example" => "The title of the iframe",
            ],
            [
                "attr"    => "title",
                "default" => "Title of the current post, or name parameter when populated",
                "comment" => "This parameter will be the title attribute of the iframe",
                "example" => "The title of the iframe",
            ],
        ],
    ];
    return shortcode_documentation($documentation);
}