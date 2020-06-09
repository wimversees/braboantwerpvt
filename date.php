<?php get_header(); ?>

<div class="container">
    <div class="row">
        <div class="<?php echo c('main-cssclasses'); ?>">
            <h1><?php the_title(); ?></h1>
            <?php while (have_posts()): the_post(); ?>
            <?php the_content(); ?>
            <?php endwhile; ?>
        </div>
        <div class="<?php echo c('sidebar-cssclasses'); ?>">
            <?php get_sidebar(); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>