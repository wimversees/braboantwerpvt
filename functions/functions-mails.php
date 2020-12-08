<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/*
 * SECTION DEVELOPMENT
 */

// set the default email address to a no-reply address
function wiver_sender_email($original_email_address)
{
    $fullDomain = get_bloginfo('url');
    $fullDomain = str_replace(array('https', 'http', ':', '//', '/', 'www.'), '', $fullDomain);
    return 'noreply@' . $fullDomain;
}
add_filter('wp_mail_from', 'wiver_sender_email');

// set the default name to the name of the website
function wiver_sender_name($original_email_from)
{
    return get_bloginfo('name');
}
add_filter('wp_mail_from_name', 'wiver_sender_name');

// to debug cf7
/*function debug_cf7_add_error($items, $result)
{
if ('mail_failed' == $result['status']) {
global $phpmailer;
$items['errorInfo'] = $phpmailer->ErrorInfo;
}
return $items;
}
add_action('wpcf7_ajax_json_echo', 'debug_cf7_add_error', 10, 2); */