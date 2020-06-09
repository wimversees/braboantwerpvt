<?php get_header(); ?>

<div class="container">
    <div class="row">
        <div class="<?php echo c('main-cssclasses'); ?>">
            <h1>Author: <?php echo single_tag_title(); ?></h1>
            <?php
// all posts
while (have_posts()): the_post(); ?>
            <div class="col-6 col-md-4">
                <?php the_title(); ?>
            </div>
            <?php
endwhile;
wp_reset_postdata(); ?>
        </div>
        <div class="col-md-3">
            <?php get_sidebar(); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>