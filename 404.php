<?php
/**
 * 404 page (Not Found).
 */

 http_response_code (404);

 get_header(); ?>

<div class="container">
	<div class="row">
		<div class="col-md-9">
			<h1><?php t('404-title'); ?></h1>
			<p><?php t('404-text'); ?></p>
			<h2><?php t('404-allpages'); ?></h2>
			<?php wp_page_menu(); ?>
		</div>
		<div class="col-md-3">
			<?php get_sidebar();?> 
		</div>
	</div>
</div>


<?php get_footer();
