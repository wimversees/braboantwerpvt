<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

// quality for jpeg and other types
add_filter('jpeg_quality', function ($arg) {return 85;});
add_filter('wp_editor_set_quality', function ($arg) {return 85;});

// Register custom image sizes
abstract class MediaSizes
{
    const GalleryThumbnail        = 'gallery-thumbnail';
    const GalleryThumbnailPreload = 'gallery-thumbnail-preload';
    const GalleryFull             = 'gallery-full';
    const GalleryFullPreload      = 'gallery-full-preload';

    const Carousel        = 'carousel';
    const CarouselPreload = 'carousel-preload';

    const Card        = 'card';
    const CardPreload = 'card-preload';

    const SingleDetail        = 'single-detail';
    const SingleDetailPreload = 'single-detail-preload';
}

add_image_size(MediaSizes::GalleryThumbnail, 350, 250, true);
add_image_size(MediaSizes::GalleryThumbnailPreload, 35, 25, true);
add_image_size(MediaSizes::GalleryFull, 1400, 950, false);
add_image_size(MediaSizes::GalleryFullPreload, 140, 95, false);

add_image_size(MediaSizes::Carousel, 1400, 950, true);
add_image_size(MediaSizes::CarouselPreload, 140, 95, true);

add_image_size(MediaSizes::Card, 320, 200, true);
add_image_size(MediaSizes::CardPreload, 32, 20, true);

add_image_size(MediaSizes::SingleDetail, 320, 200, true);
add_image_size(MediaSizes::SingleDetailPreload, 32, 20, true);

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
