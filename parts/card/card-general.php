<div class="card">
    <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" class="card-link">
        <?php if (has_post_thumbnail()) { ?>
        <div class="card-heading">
            <div class="card-image">
                <?php $size        = isset($size) && strlen($size) > 0 ? $size : MediaSizes::Card; ?>
                <?php $sizePreload = isset($sizePreload) && strlen($sizePreload) > 0 ? $sizePreload : MediaSizes::CardPreload; ?>
                <img data-src="<?php echo get_the_post_thumbnail_url(get_the_ID(), $size); ?>"
                    src="<?php echo get_the_post_thumbnail_url(get_the_ID(), $sizePreload); ?>" alt="<?php the_title(); ?>"
                    title="<?php the_title(); ?>" />
            </div>
        </div>
        <?php } ?>
        <div class="card-body">
            <h3 class="card-title"><?php the_title(); ?></h3>
        </div>
    </a>
</div>