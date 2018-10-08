<section class="section-news-links bg-light pt-5 pb-5" 
         data-json-api="<?php echo get_stylesheet_directory_uri() . c("api-json-news"); ?>"
         data-json-category="<?php echo c("api-json-news-category"); ?>"
         data-json-offset-page="<?php echo c("api-json-news-offset-page"); ?>"
         data-json-page-size="<?php echo c("api-json-news-page-size"); ?>">
    <div class=" container">
        <h2 class="section-title"><?php t('news-latest-news'); ?></h2>
        <div class="row grid-row">
            <?php 
            // highlighted posts
            $highlightedArgs = array('posts_per_page' => 4, 
                                     'cat' => 12,
                                    'meta_query' => array(
                                        array(
                                            'key' => c('post-end-highlighting'),
                                            'value' => time(),
                                            'compare' => '>='
                                        )
                                    ) );
            $highlightedPosts = get_posts( $highlightedArgs );
            $idString = array();
            foreach ( $highlightedPosts as $post ) : setup_postdata( $post );
                $idString[] = get_the_ID(); ?>
                <div class="col-6 col-md-3">
                    <?php include 'news-latest-news-single.php'; ?>
                </div>
            <?php 
            endforeach; 
            wp_reset_postdata();?>
            <?php 
            // normal posts
            $otherArgs = array( 'posts_per_page' => 7 - count($highlightedPosts),
                                'exclude' => implode(',', $idString) );
            $otherPosts = get_posts( $otherArgs );
            foreach ( $otherPosts as $post ) : setup_postdata( $post );?>
                <div class="col-6 col-md-3">
                    <?php include 'news-latest-news-single.php'; ?>
                </div>
            <?php 
            endforeach; 
            wp_reset_postdata();?>
            <div class="col-6 col-md-3">
                <?php include 'card-news-most-used-categories.php'; ?>
            </div>
        </div>
        <div class="text-center mt-5">
            <a href="<?php echo get_the_permalink(gpid('page-news')); ?>" title="<?php t('news-more-news'); ?>" class="btn btn-secondary"><?php t('news-more-news'); ?></a>
        </div>
    </div>
</section>