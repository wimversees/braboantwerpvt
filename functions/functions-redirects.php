<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function returns the destination path of a requested path. The function returns null when a requested path is not found.
 *
 * @param [type] $key
 * @return void
 */
function checkRedirect($key)
{
    if (!function_exists('redirects')) {
        include __DIR__ . '/../data/redirects.php';
    }
    $redirects = redirects();
    if (array_key_exists($key, $redirects)) {
        if (function_exists('icl_object_id')) {
            return icl_object_id($ids[$key]);
        }

        return $redirects[$key];
    }
    return null;
}

function checkRedirects()
{
    // Only for the front-end
    if (is_admin()) {
        return;
    }

    // Get current url
    $requestUrl  = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $requestPath = str_replace(home_url(), '', $requestUrl);

    $requestPath = explode('?', $requestPath)[0];
    $requestPath = explode('#', $requestPath)[0];
    $requestPath = rtrim($requestPath, '/');

    $destination = checkRedirect($requestPath);

    if ($destination != null) {
        header("HTTP/1.1 301 Moved Permanently");
        header("Location: " . $destination);
        exit;
    }
}
add_action('init', 'checkRedirects');