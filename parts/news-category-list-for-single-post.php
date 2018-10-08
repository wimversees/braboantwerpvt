<?php
$categories = get_the_category();

if(!empty($categories)){ ?>
    <ul class="news-categories">
        <?php foreach( $categories as $category ) { ?>
            <li class="news-category">
                <a href="<?php echo esc_url(get_category_link( $category->term_id))?>" title="<?php t('news-all-news-from-category'); ?> <?php echo $category->name; ?>" class="btn btn-primary"><?php echo $category->name; ?></a>
            </li>
        <?php } ?>    
    </ul>
<?php } ?>
