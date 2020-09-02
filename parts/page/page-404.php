<div class="container">
    <div class="row">
        <div class="<?php echo c('main-cssclasses'); ?>">
            <h1><?php t('404-title'); ?></h1>
            <p><?php t('404-text'); ?></p>
            <h2><?php t('404-allpages'); ?></h2>
            <?php wp_page_menu(); ?>
        </div>
        <div class="<?php echo c('sidebar-cssclasses'); ?>">
            <?php get_sidebar(); ?>
        </div>
    </div>
</div>