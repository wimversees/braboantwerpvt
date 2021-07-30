<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    $host = $_SERVER["HTTP_HOST"];
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: http://" . $host);
    die();
}