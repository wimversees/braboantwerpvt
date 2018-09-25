<?php get_header();?>

<div class="container">
    <div class="row">
        <div class="col-md-9">
            <h1><?php t('news-latest-news'); ?></h1>
            <?php 
            // all posts
            $allPostsArgs = array('posts_per_page' => 16);
            $allPosts = get_posts( $allPostsArgs );
            foreach ( $allPosts as $post ) : setup_postdata( $post );?>
                <div class="col-6 col-md-4">
                    <?php include 'parts/news-latest-news-single.php'; ?>
                </div>
            <?php 
            endforeach; 
            wp_reset_postdata();?>
        </div>
        <div class="col-md-3">
            <?php get_sidebar();?> 
        </div>
    </div>
</div>

<?php get_footer();?>