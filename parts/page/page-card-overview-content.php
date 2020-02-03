<?php while ( have_posts() ) : the_post(); ?>
    <?php if(strlen(get_the_content()) > 0){ ?>
        <section class="mt-5 mb-5">
            <h1><?php the_title(); ?></h1>
            <div class="freetext-body">
                <?php the_content(); ?>
            </div>
        </section>
    <?php } ?>
    <section class="pt-5 pb-5">
        <?php if(strlen(get_the_content()) == 0){ ?>
            <h1 class="page-title"><?php the_title(); ?></h1>
        <?php } ?>
        <div class="row grid-row">
            <?php
            $args = array(
                'post_parent' => get_the_ID(),
                'post_type' => 'page',
                'posts_per_page' => -1
            );
            $subpages = new WP_Query($args);  
            if ( $subpages->have_posts() ) {
                while ( $subpages->have_posts() ) { 
                    $subpages->the_post(); ?> 
                        <div class="col-6 col-md-3">
                            <?php include(__DIR__ . '/../card/card-general.php'); ?>
                        </div> 
            <?php }
            } ?>
        </div>
    </section>
<?php endwhile; ?>