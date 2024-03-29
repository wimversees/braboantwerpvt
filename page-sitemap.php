<?php
/**
 * Template Name: Sitemap Page
 */
?>
<?php get_header(); ?>

<div class="container">
    <div class="row">
        <div class="<?php echo c('main-cssclasses'); ?>">
            <h1><?php the_title(); ?></h1>
            <h2><?php t("sitemap-pages"); ?></h2>
            <ul>
                <?php wp_list_pages(array('title_li' => '', 'sort_column' => 'post_title')); ?>

                <?php foreach (c('sitemap-post-types') as $postType) {
    if ($postType != "page" && $postType != "post") {
        $args = array(
            'posts_per_page' => -1,
            'post_status'    => 'publish', // add explicit publish state to fix draft statusses because sitemap is generated when a user is logged in
             'post_type'      => $postType,
            'orderby'        => 'modified',
            'order'          => 'DESC',
        );
        $results = new WP_Query($args);

        foreach ($results->posts as $post) {
            setup_postdata($post);
            ?>
                <li>
                    <a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
                </li>
                <?php }
    }
} ?>
            </ul>
            <?php $archive_query = new WP_Query('showposts=1000');
if ($archive_query->have_posts()) { ?>
            <h2><?php t("sitemap-news"); ?></h2>
            <ul>
                <?php while ($archive_query->have_posts()): $archive_query->the_post(); ?>
                <li>
                    <a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
                        <?php echo get_the_date('j M Y H:i'); ?> - <?php the_title(); ?>
                    </a>
                </li>
                <?php endwhile; ?>
            </ul>
            <?php } ?>
        </div>
        <div class="<?php echo c('sidebar-cssclasses'); ?>">
            <?php get_sidebar(); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>