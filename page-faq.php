<?php
// Template Name: FAQ Page ?>

<?php get_header(); ?>

<div class="container">
    <div class="row">
        <div class="col-12">

            <?php
$args = array(
    'numberposts' => -1,
    'post_type'   => FaqType::Type,
    'orderby'     => 'title',
    'order'       => 'ASC',
);
$faqs = get_posts($args);

if (count($faqs) > 0) { ?>
            <div id="acc" class="faq">
                <?php
global $post;
    $index = 0;
    foreach ($faqs as $post):
        setup_postdata($post);
        $index++;
        $heading    = 'h' . $index;
        $collapseId = 'c' . $index; ?>
                <div class="card">
                    <div class="card-header" id="<?php echo $heading; ?>">
                        <h2 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#<?php echo $collapseId; ?>"
                                aria-expanded="<?php echo $index == 1 ? 'true' : 'false'; ?>"
                                aria-controls="<?php echo $collapseId; ?>"><span>?</span><?php the_title(); ?></button>
                        </h2>
                    </div>

                    <div id="<?php echo $collapseId; ?>" class="collapse <?php echo $index == 1 ? 'show' : ''; ?>"
                        aria-labelledby="<?php echo $heading; ?>" data-parent="#acc">
                        <div class="card-body">
                            <?php the_content(); ?>
                        </div>
                    </div>
                </div>
                <?php
endforeach;
    wp_reset_postdata();
    ?>
            </div>
            <?php } ?>

        </div>
    </div>
</div>

<?php get_footer(); ?>