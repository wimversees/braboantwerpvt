<?php
$the_query = new WP_Query( array( 
    'post_type' => 'Partner',
    'posts_per_page' => 5,
    'no_found_rows' => 'true'
) );

// $the_diamond_query = new WP_Query( array( 
//     'post_type' => 'Partner',
//     'posts_per_page' => '1',
//     'no_found_rows' => 'true',
//     'tax_query' => array(
//         array(
//             'taxonomy' => 'partner-category',
//             'field' => 'slug',
//             'terms' => 'diamond'
//         )
//     )
// ) );

if($the_query->have_posts()) { ?>
    <div class="header-partners">
        <div class="container">
            <div class="row">
                <?php while ( $the_query->have_posts() ) : $the_query->the_post();
                    $img = get_post_meta(get_the_ID(), c('partner-svg'), true );
                    if(empty($img)){
                        $img = types_render_field('partner-png-fallback', array('size' => 'partner-image', "url" => true));
                    }
                    $url = get_post_meta(get_the_ID(), c('partner-url'), true );
                    if(substr( $url, 0, 4 ) !== "http"){
                        $url = 'http://' . $url;
                    }
                    ?>
                    <div class="col">
                        <div class="partner">
                            <a href="<?php echo $url ?>" target="_blank" rel="noopener">
                                <div class="partner-img">
                                    <img src="<?php echo $img ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>" />
                                </div>
                            </a>
                        </div>
                    </div>
                    <?php endwhile; ?>
            </div>
        </div>
    </div>
<?php } ?>