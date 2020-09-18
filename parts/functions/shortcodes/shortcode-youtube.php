<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

function wiver_shortcode_youtube($atts)
{
    // merge parameters with default set
    $a = shortcode_atts(array(
        'doc'  => '',
        'id'   => '',
        'name' => 'Video of ' . get_bloginfo('name'),
    ), $atts);

    // return documentation table
    if (strlen($a['doc']) > 0) {
        return wiver_shortcode_youtube_documentation();
    }

    // create output html
    $linkHtml = '<iframe ';
    $linkHtml .= 'title="' . $a['name'] . '" ';
    $linkHtml .= 'data-src="https://www.youtube.com/embed/' . $a['id'] . '?ecver=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" ';
    $linkHtml .= 'class="youtube" ';
    $linkHtml .= 'width="560" height="315" allowtransparency="true" frameborder="0"';
    $linkHtml .= '>';
    $linkHtml .= '</iframe>';
    return $linkHtml;
}
add_shortcode('youtube', 'wiver_shortcode_youtube');

function wiver_shortcode_youtube_documentation()
{
    $documentation = [
        "shortcode"  => "youtube",
        "attributes" => [
            [
                "attr"    => "id",
                "default" => "",
                "comment" => "Youtube Video ID",
                "example" => "Lwk8e2q4qHo",
            ],
            [
                "attr"    => "name",
                "default" => "Title of the current post",
                "comment" => "This parameter will be the title attribute of the iframe",
                "example" => "The title of the iframe",
            ],
        ],
    ];
    return shortcode_documentation($documentation);
}