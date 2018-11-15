<?php 

/**
 * This function enables svg as possible uploadable images
 *
 * @param [type] $mimes
 * @return void
 */
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');