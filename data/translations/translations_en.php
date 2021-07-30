<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

function getDictionary()
{
    return array(
        /* sitemap */
        'sitemap-pages'              => 'Pages',
        'sitemap-news'               => 'News',

        /* 404 page */
        '404-breadcrumb-title'       => 'Error 404',
        '404-title'                  => 'Oops... We cannot find this page!',
        '404-text'                   => 'The requested page is not available.',
        '404-allpages'               => 'All pages',

        /* search */
        'search-breadcrumb-title'    => 'Search results for: %s',
        'search-title'               => 'Search results for: ',

        /* footer */
        'footer-copyright'           => 'Copyright',
        'footer-all-rights-reserved' => 'All rights reserved.',
        'footer-follow-us'           => 'Follow us',

        /* socials */
        'social-follow-on-twitter'   => 'Follow %s on Twitter',
        'social-follow-on-instagram' => 'Follow %s on Instagram',
        'social-follow-on-linkedin'  => 'Follow %s on LinkedIn',
        'social-follow-on-youtube'   => 'Follow %s on YouTube',
        'social-follow-on-facebook'  => 'Follow %s on Facebook',
        'social-follow-on-flickr'    => 'Follow %s on Flickr',

        /* cookie bar */
        'cookie-ok'                  => 'OK',
        'cookie-ok-title'            => 'I understand',
        'cookie-message'             => 'By using our website, you accept our %s and %s.',
        'cookie-more-info'           => 'More information.',

        /* wpml */
        'wpml-check-in'              => 'Discover this page in ',

    );
}
