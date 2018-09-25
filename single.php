<?php get_header();?>

<div class="container">
	<div class="row">
		<div class="col-md-9">
			<?php while ( have_posts() ) : the_post(); ?>
				<h1><?php the_title(); ?></h1>
				<p><?php echo get_the_date(c('date-format-long')); ?></p>
				<?php include 'parts/news-category-list-for-single-post.php'; ?>
				<?php if(has_post_thumbnail()){ ?>
					<div class="news-media bg-white">
						<img data-src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'news-detail'); ?>" alt="<?php the_title(); ?>" title="<?php the_title(); ?>"/>
					</div>
				<?php } ?>
				<?php the_content(); ?>
			<?php endwhile; ?>
		</div>
		<div class="col-md-3">
			<?php get_sidebar();?> 
		</div>
	</div>
</div>

<?php get_footer();?>
