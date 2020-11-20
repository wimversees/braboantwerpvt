<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

add_action('admin_enqueue_scripts', 'load_admin_frontend');
function load_admin_frontend()
{
    wp_enqueue_style('wiver_admin_css', getFrontEndFile('/parts/functions/admin/design/css/wiver-admin.css', false), false, '1.0.0');
    wp_enqueue_script('wiver_admin_js', getFrontEndFile('/parts/functions/admin/design/js/wiver-admin.js', false), array('jquery'), '1.0.0');
}

/**
 * This function changes the logo of wordpress on the login view
 */
function wiver_login_logo()
{
    ?>
<style type="text/css">
body.login {
    background: #2b2e3b;
}

body.login div#login h1 a {
    background-image: url(<?php getFrontEndFile('/parts/functions/admin/design/img/wiver.svg');
    ?>);
    padding-bottom: 30px;
    background-repeat: no-repeat;
    width: 100%;
    background-size: 50%;
    background-position: top center;
    position: relative;
    padding-top: 5rem;
}


body.login div#login h1 a::after {
    content: '';
    background-image: url(<?php getFrontEndFile('/design/img/logo.svg');
    ?>);
    padding-bottom: 30px;
    background-repeat: no-repeat;
    background-position: bottom center;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-size: contain;
    height: 5rem;
}

<?php if ( !IsProEnvironment()) {}

?>#loginform {
    position: relative;
}

#loginform::before {
    content: '⚠ This is a demo website. To edit the live website, please use the live website url.';
    display: inline-block;
    padding: .5rem;
    background: #bf2026;
    text-align: center;
    margin-bottom: 1rem;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
}
</style>
<?php
}
add_action('login_enqueue_scripts', 'wiver_login_logo');