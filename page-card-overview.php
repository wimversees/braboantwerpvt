<?php 
// Template Name: Card Overview Page
?>

<?php get_header(); ?>

<div class="container">
    <div class="row">
        <div class="col-12">
            <?php includecached('parts/page/page-card-overview-content.php', get_the_ID()); ?>
        </div>
    </div>
</div>

<?php get_footer();?>