<?php 
/**
 * Template Name: Sitemap Page
 */
 ?>
<?php get_header();?>
<div class="container">
    <h2><?php the_title(); ?></h2>
    <div class="row">
        <div class="col-12">
            <h3><?php t("sitemap_pages"); ?></h3>
            <ul>
                <?php wp_list_pages(array('title_li' => '', 'sort_column'  => 'post_title')); ?>
            </ul>
        </div>
        <div class="col-12">
            <h3><?php t("sitemap_news"); ?></h3>
            <ul>
                <?php $archive_query = new WP_Query('showposts=1000&cat=-8');  
                    while ($archive_query->have_posts()) : $archive_query->the_post(); ?>
                <li>
                    <a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>">
                        <?php the_title(); ?>
                    </a>
                </li>
                <?php endwhile; ?>
            </ul>
        </div>
    </div>
</div>
<?php get_footer();?>
