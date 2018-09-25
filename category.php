<?php get_header();?>

<div class="container">
    <div class="row">
        <div class="col-md-9">
                <h1><?php t('news-categorie'); ?><?php echo single_cat_title(); ?></h1>
                <?php 
                // all posts
                while ( have_posts() ) : the_post(); ?>
                    <div class="col-6 col-md-4">
                        <?php include 'parts/news-latest-news-single.php'; ?>
                    </div>
                <?php 
                endwhile; 
                wp_reset_postdata();?>
        </div>
        <div class="col-md-3">
            <?php get_sidebar();?> 
        </div>
    </div>
</div>

<?php get_footer();?>