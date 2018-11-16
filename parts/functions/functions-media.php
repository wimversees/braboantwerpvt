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

/**
 * This function enhanced the display of svg images in the wordpress backend
 *
 * @return void
 */
function fix_svg_thumb_display() {
	echo 
	'<style>
		#postimagediv .inside img{
			width: 100% !important; 
			height: auto !important;
		}
	  	td.media-icon img[src$=".svg"], img[src$=".svg"].attachment-post-thumbnail { 
			width: 100% !important; 
			height: auto !important; 
	  	}
	</style>';
}
add_action('admin_head', 'fix_svg_thumb_display');