<?php

add_filter('post_gallery', 'customFormatGallery',10,2);
add_filter( 'use_default_gallery_style', '__return_false' );

function customFormatGallery($string,$attr){     
    $posts = get_posts(array('post__in' => explode(',', $attr['ids']),'post_type' => 'attachment', 'orderby' => 'post__in', 'numberposts' => -1));
    // create carousel of images
    if (isset($attr['carousel'])) {
        $carouselId = "carousel-" . rand(0, 999999999);
        ?>
            <div id="<?php echo $carouselId; ?>" class="carousel slide carousel-fade content-carousel" data-ride="carousel" data-interval="2000">
                <ol class="carousel-indicators">
                    <?php 
                    $counterNavigation = 0;
                    foreach($posts as $imagePost){ ?>
                        <li data-target="#<?php echo $carouselId; ?>" data-slide-to="<?php echo $counterNavigation; ?>" class="<?php echo $counterNavigation == 0 ? "active" : ""; ?>"></li>
                    <?php 
                        $counterNavigation++;
                    } ?>
                </ol>
                <div class="carousel-inner">
                    <?php 
                    $counter = 0;
                    foreach($posts as $imagePost){ ?>
                        <div class="carousel-item<?php echo $counter == 0 ? " active" : ""; ?>" style="background-image: url('<?php echo wp_get_attachment_image_src($imagePost->ID, 'carousel-image')[0]; ?>');">
                        </div>
                    <?php 
                        $counter++;
                    } ?>
                </div>
            </div>
        <?php
    } 
    // use default gallery
    else {
    ?>
        <div class="content-gallery">
            <?php foreach($posts as $imagePost){ ?>
                <img data-src="<?php echo wp_get_attachment_image_src($imagePost->ID, 'small')[0]; ?>" alt="<?php echo $imagePost->post_title; ?>" title="<?php the_title(); ?>" />
            <?php } ?>
        </div>
    <?php
    }
    return "";
}
