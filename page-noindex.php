<?php
// Template Name: Noindex Page ?>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1><?php the_title(); ?></h1>
            <?php while (have_posts()): the_post(); ?>
            <?php the_content(); ?>
            <?php endwhile; ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>