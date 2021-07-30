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
        'sitemap-news'               => 'Nouvelles',

        /* 404 page */
        '404-breadcrumb-title'       => 'Error 404',
        '404-title'                  => 'Oops...  Cette page n\'a pas été trouvée!',
        '404-text'                   => 'La page demandée n\'est pas disponible.',
        '404-allpages'               => 'Toutes les pages',

        /* search */
        'search-breadcrumb-title'    => 'Resultats pour: %s',
        'search-title'               => 'Resultats pour: ',

        /* footer */
        'footer-copyright'           => 'Droits d\'auteur',
        'footer-all-rights-reserved' => 'Tous droits réservés.',
        'footer-follow-us'           => 'Suivez nous',

        /* socials */
        'social-follow-on-twitter'   => 'Suivez %s sur Twitter',
        'social-follow-on-instagram' => 'Suivez %s sur Instagram',
        'social-follow-on-linkedin'  => 'Suivez %s sur LinkedIn',
        'social-follow-on-youtube'   => 'Suivez %s sur YouTube',
        'social-follow-on-facebook'  => 'Suivez %s sur Facebook',
        'social-follow-on-flickr'    => 'Suivez %s sur Flickr',

        /* cookie bar */
        'cookie-ok'                  => 'OK',
        'cookie-ok-title'            => 'Je comprends',
        'cookie-message'             => 'En utilisant notre site web, vous acceptez nos %s et %s.',
        'cookie-more-info'           => 'Plus d\'informations.',

        /* wpml */
        'wpml-check-in'              => 'Montrer cette page en ',

    );
}
