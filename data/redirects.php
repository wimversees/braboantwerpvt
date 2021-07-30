<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

function redirects()
{
    return array(
        '/testredirect' => 'https://www.wiver.be',
    );
}