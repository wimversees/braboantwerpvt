<?php get_header();?>

<div class="container">
    <div class="row">
        <div class="col-md-9">
            <h1><?php the_title(); ?></h1>
            <?php while ( have_posts() ) : the_post(); ?>
                <?php the_content(); ?>
            <?php endwhile; ?>
        </div>
        <div class="col-md-3">
            <?php get_sidebar();?> 
        </div>
    </div>
</div>

<?php get_footer();?>