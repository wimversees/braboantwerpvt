<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

remove_shortcode('gallery', 'gallery_shortcode');
add_shortcode('gallery', 'customFormatGallery');
add_filter('use_default_gallery_style', '__return_false');

function customFormatGallery($string, $attr)
{
    $output = "";
    $posts  = get_posts(array('post__in' => explode(',', $attr['ids']), 'post_type' => 'attachment', 'orderby' => 'post__in', 'numberposts' => -1));
    // create carousel of images
    if (isset($attr['carousel'])) {
        $carouselId = "carousel-" . rand(0, 999999999);
        $output .= '<div id="' . $carouselId . '" class="carousel slide carousel-fade content-carousel" data-ride="carousel" data-interval="2000">' .
            '<ol class="carousel-indicators">';
        $counterNavigation = 0;
        foreach ($posts as $imagePost) {
            $output .= '<li data-target="#' . $carouselId . '" data-slide-to="' . $counterNavigation . '" class="' . ($counterNavigation == 0 ? "active" : "") . '"></li>';
            $counterNavigation++;
        }
        $output .= '</ol>';
        $output .= '<div class="carousel-inner">';
        $counter = 0;
        foreach ($posts as $imagePost) {
            $output .= '<div class="carousel-item' . ($counter == 0 ? " active" : "") . '" data-bgsrc="' . wp_get_attachment_image_src($imagePost->ID, MediaSizes::Carousel)[0] . '" style="background-image: url(' . wp_get_attachment_image_src($imagePost->ID, MediaSizes::CarouselPreload)[0] . ');">';
            $output .= '</div>';
            $counter++;
        }
        $output .= '</div>';
        $output .= '</div>';
    }
    // use default gallery
    else {
        $output .= '<div class="content-gallery row">';
        foreach ($posts as $imagePost) {
            $output .= '<div class="col-6 col-sm-4 col-md-3">';
            $output .= '<a href="' . wp_get_attachment_image_src($imagePost->ID, MediaSizes::GalleryFull)[0] . '" title="' . get_the_title($imagePost->ID) . '">';
            $output .= '<img data-src="' . wp_get_attachment_image_src($imagePost->ID, MediaSizes::GalleryThumbnail)[0] . '" src="' . wp_get_attachment_image_src($imagePost->ID, MediaSizes::GalleryThumbnailPreload)[0] . '" alt="' . $imagePost->post_title . '" title="' . get_the_title($imagePost->ID) . '" />';
            $output .= '</a>';
            $output .= '</div>';
        }
        $output .= '</div>';
    }
    return $output;
}