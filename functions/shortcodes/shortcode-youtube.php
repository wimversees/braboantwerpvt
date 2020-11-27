<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

function wiver_shortcode_youtube($atts)
{
    // merge parameters with default set
    $a = shortcode_atts(array(
        'doc'     => '',
        'id'      => '',
        'name'    => '',
        'title'   => get_the_title(get_the_ID()),
        'cc'      => '0',
        'cc_lang' => get_og_locale(),
    ), $atts);

    // return documentation table
    if (strlen($a['doc']) > 0) {
        return wiver_shortcode_youtube_documentation();
    }

    // fallback from name to title
    if (strlen($a['name']) > 0) {
        $a['title'] = $a['name'];
    }

    // create output html
    $linkHtml = '<iframe ';
    $linkHtml .= 'title="' . $a['title'] . '" ';
    $linkHtml .= 'data-src="https://www.youtube.com/embed/' . $a['id'] . '?ecver=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560' . ($a['cc'] == '1' ? '&amp;cc_lang_pref=' . $a['cc_lang'] . '&amp;cc_load_policy=1' : '') . '" ';
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
            [
                "attr"    => "cc",
                "default" => "0",
                "comment" => "Enables the captions of the video",
                "example" => "1",
            ],
            [
                "attr"    => "cc_lang",
                "default" => "The current locale.",
                "comment" => "Sets the language of the captions",
                "example" => "en",
            ],
        ],
    ];
    return shortcode_documentation($documentation);
}
