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
function devimage(int $width = 100, int $height = 100, string $text = '', bool $echo = true){
	if(strlen($text) > 0){
		$text = $text . ' ' . $width . 'x' . $height;
	}
	$url = '//placehold.it/' . $width . 'x' . $height . '/efefef/ddd?text=' . $text;
	if($echo) {	
		echo $url; return;
	}
	return $url;
}