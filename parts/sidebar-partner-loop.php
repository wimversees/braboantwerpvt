<?php
$the_query = new WP_Query( array( 
    'post_type' => 'Partner'
) );

if($the_query->have_posts()) { ?>
    <div class="partner-slider" data-component="Lube.Slider" data-autoplay="3000" data-animation-duration="1000">
        <div class="glide__track" data-glide-el="track">
            <div class="glide__slides">
                <?php
                while ( $the_query->have_posts() ) :
                    $the_query->the_post();
                    $img = get_post_meta(get_the_ID(), c('partner-svg'), true );
                    if(empty($img)){
                        $img = types_render_field('partner-png-fallback', array('size' => 'partner-image', "url" => true));
                    }
                    $url = get_post_meta(get_the_ID(), c('partner-url'), true );
                    if(substr( $url, 0, 4 ) !== "http"){
                        $url = 'http://' . $url;
                    }
                    ?>
                        <div class="partner glide__slide">
                            <a href="<?php echo $url ?>" rel="noopener" target="_blank">
                                <div class="partner-img">
                                    <img src="<?php echo $img ?>" alt="<?php echo the_title() ?>" title="<?php echo the_title() ?>">
                                </div>
                            </a>
                        </div>
                    <?php
                endwhile; ?>
            </div>
        </div>
    </div>
<?php } ?>