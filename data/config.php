<?php

function getConfig()
{
    return array(
        // general settings
         'cache-enabled'                              => "disabled", // "disabled" or "enabled"
         'version'                                    => "0.0.1",
        'hashkey'                                    => "ripemd160",

        // language settings
         'default-locale'                             => "nl_be",
        'multilanguage-enabled'                      => false,

        // google analytics
         'google-analytics-key'                       => '', // notation: UA-131124377-1
         'google-maps-key'                            => '', // notation: AIzaSyB_eoi3ppJF4kNz9yTBzsKCTQuokhnqRug

        // is in splash mode
         'splash-enabled'                             => false,

        // search config
         'search-enabled'                             => false,
        'search-page'                                => get_the_permalink(gpid('page-search')) . '?q=',

        // address configuration
         'company-micro-data-type'                    => 'LocalBusiness',
        'company-name'                               => 'example business',
        'company-street'                             => 'street',
        'company-city'                               => 'city',
        'company-postalcode'                         => 'postalcode',
        'company-country'                            => 'BE', // notation: 'BE'
         'company-telephone'                          => '0032',
        'company-telephone-link'                     => '0032',
        'company-latitude'                           => 0.0000, // notation: 51.284209
         'company-longitude'                          => 0.0000, // notation: 4.284209

        // open graph settings
         'default-og-image'                           => '/design/img/default-og-image.jpg',

        // sitemap settings
         'sitemap-post-types'                         => array('page', 'post'),
        'sitemap-taxonomies'                         => array('category' /*, 'example-tax'*/),
        'sitemap-use-splitted-structure'             => true,

        // wp_head, wp_footer settings
         'enable-wp-head-foot-slugs'                  => array('page-contact.php'),

        // cookie settings
         'cookie-name'                                => 'comply_cookie',

        // social media settings
         'facebook-link'                              => 'w',
        'twitter-link'                               => 'w',
        'instagram-link'                             => 'w',
        'linkedin-link'                              => 'w',
        'youtube-link'                               => 'w',
        'flickr-link'                                => 'w',

        // permalink settings
         'remove-taxonomy-name-from-permalinks'       => false, // if true, taxonomy names like %category% will be removed from the permalinks
         'remove-taxonomy-from-permalinks-taxomies'   => array('category', 'post_tag', 'example-tax'), // if true, taxonomy names like %category% will be removed from the permalinks

        // taxonomy settings
         'taxonomy-save-parent-taxonomies'            => array('category', 'example-tax'), // save parent taxonomies for the selected one in the post
         'taxonomy-save-parent-taxonomies-post-types' => array('post', 'example'), // the post types to save parent taxonomies for

        // page column settings
         'main-cssclasses'                            => 'col-md-9',
        'sidebar-cssclasses'                         => 'col-md-3',
    );
}