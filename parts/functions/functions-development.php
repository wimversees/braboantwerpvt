<?php

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
 * This function returns a palceholder image for a given width, height and possible description
 *
 * @param integer $width
 * @param integer $height
 * @param string $text
 * @return void
 */
function devtext(int $length = 500, string $textStart = '', bool $echo = true)
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
    return !(strpos('localhost:81', strtolower($_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'])) !== false);
}