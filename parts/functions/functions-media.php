<?php

// Register custom image sizes
add_filter('jpeg_quality', function ($arg) {return 85;});
add_filter('wp_editor_set_quality', function ($arg) {return 85;});
add_image_size('gallery-thumbnail', 350, 250, true);
add_image_size('gallery-full', 1400, 950, false);
// add_image_size('block-image', 255, 165, true);

/**
 * This function enables svg as possible uploadable images
 *
 * @param [type] $mimes
 * @return void
 */
function cc_mime_types($mimes)
{
    $mimes['svg']  = 'image/svg+xml';
    $mimes['webp'] = 'image/webp';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

/**
 * This function enhanced the display of svg images in the wordpress backend
 *
 * @return void
 */
function fix_svg_thumb_display()
{
    echo
        '<style>
		#postimagediv .inside img{
			width: 100% !important;
			height: auto !important;
		}
	  	td.media-icon img[src$=\'.svg\'], img[src$=\'.svg\'].attachment-post-thumbnail {
			width: 100% !important;
			height: auto !important;
	  	}
	</style>';
}
add_action('admin_head', 'fix_svg_thumb_display');