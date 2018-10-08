<div class="card card-news">
    <div class="card-body card-body-center">
        <h3 class="card-title"><?php t('news-choose-category'); ?>:</h3>
        <div class="row">
            <?php $categories = get_categories( array(
                'orderby' => 'count',
                'order'   => 'desc',  
                'exclude' => array(1), // exclude uncategorized
                'number'  => 5
            ));            
            foreach ( $categories as $category ) { ?>
                <div class="col">
                    <a href="<?php echo esc_url(get_category_link( $category->term_id))?>" title="<?php t('news-all-news-from-category'); ?> <?php echo $category->name; ?>" class="btn btn-secondary btn-rectangle"><?php echo $category->name; ?></a>
                </div>
            <?php } ?>
        </div>
    </div>
</div>
