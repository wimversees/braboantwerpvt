<div class="card card-news">
    <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" class="card-link">
        <?php if(has_post_thumbnail()){ ?>
            <div class="card-heading">
                <div class="card-image">
                    <img data-src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'block-image'); ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>"/>
                </div>
            </div>
        <?php } ?>
        <div class="card-body">
            <p class="card-date"><?php echo get_the_date(c('date-format-long')); ?></p>
            <h3 class="card-title"><?php the_title(); ?></h3>                
        </div>
        <?php if(!has_post_thumbnail()){ ?>
            <div class="card-body">
                <?php echo excerpt(20); ?>
            </div>
        <?php } ?>
    </a>
</div>