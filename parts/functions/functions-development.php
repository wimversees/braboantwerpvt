<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/*
 * SECTION DEVELOPMENT
 */

/**
 * This function returns a palceholder image for a given width, height and possible description
 *
 * @param integer $width
 * @param integer $height
 * @param string $text
 * @return void
 */
function devimage(int $width = 100, int $height = 100, string $text = '', bool $echo = true)
{
    if (strlen($text) > 0) {
        $text = $text . ' - ' . $width . 'x' . $height;
    }
    $url = '//placehold.it/' . $width . 'x' . $height . '/' . randomHexColor() . '/ddd?text=' . $text;
    if ($echo) {
        echo $url;return;
    }
    return $url;
}

/**
 * This function returns a placeholder text for a given length of characters
 *
 * @param integer $length the length in characters
 * @param string $text the text that will be placed in front of the generated text
 * @return void
 */
function devtext(int $length = 500, string $text = '', bool $echo = true)
{
    if (strlen($text) > 0) {
        $text .= ' ';
    }
    while (strlen($text) < $length) {
        $text .= randomWord(mt_rand(2, 8));
        $text .= ' ';
    }

    if ($echo) {
        echo $text;return;
    }
    return $text;
}

function randomWord($len = 10)
{
    $characters  = range('a', 'z');
    $doubleChars = ['a', 'e', 'i', 'o', 'u', 'ij', 'ou', 'ui', 'au', 'ie'];
    $word        = array_merge($characters, $doubleChars, $doubleChars);
    shuffle($word);
    return substr(implode($word), 0, $len);
}

/**
 * This function creates a random hex color part (two digits)
 */
function randomHexColorPart()
{
    return str_pad(dechex(mt_rand(0, 255)), 2, '0', STR_PAD_LEFT);
}

/**
 * This function creates a random hex color
 */
function randomHexColor()
{
    return randomHexColorPart() . randomHexColorPart() . randomHexColorPart();
}

/**
 * This function checks if the environments is PRO, based on localhost base url.
 */
function IsProEnvironment()
{
    return !IsLocalEnvironment() && !IsTestEnvironment();
}

/**
 * This function checks if the environment is TEST (*.wiver.be), based on localhost base url.
 */
function IsTestEnvironment()
{
    $hasWiverInUrl       = strpos($_SERVER['SERVER_NAME'], '.wiver.be') !== false;
    $hasWwwDotWiverInUrl = strpos($_SERVER['SERVER_NAME'], 'www.wiver.be') !== false;
    return $hasWiverInUrl && !$hasWwwDotWiverInUrl;
}

/**
 * This function checks if the environment is LOCAL, based on localhost base url.
 */
function IsLocalEnvironment()
{
    $serverAndPort = strtolower($_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT']);
    return strpos($serverAndPort, 'localhost:81') !== false;
}

/**
 * This function returns a warning on all front end pages that the current environment is not the production environment
 */
function ShowEnvironmentWarning()
{
    $html = '';
    $html .= '<div style="position: absolute; margin-top:-7rem; z-index: 99999999; background: #bf2026; color: #fff; width: 100%; text-align: center; font-weight:bold;">';
    $html .= '<p class="m-1">THIS IS NOT A PRODUCTION ENVIRONMENT</p>';
    $html .= '</div>';
    $html .= '<style>';
    $html .= 'body{margin-top:7rem;}';
    $html .= '</style>';
    echo $html;
}