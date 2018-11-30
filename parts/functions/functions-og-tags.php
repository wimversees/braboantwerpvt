<?php
/*
* SECTION OPEN GRAPH
*/

/**
 * This function returns the og:image url
 *
 * @return void
 */
function get_og_image(){
	if(!is_home() || !is_front_page()){
		// general thumbnail defined
		$currentThumb = get_the_post_thumbnail_url();
		if(strlen($currentThumb) > 0) return $currentThumb;
	}
	// default image
	return get_stylesheet_directory_uri() . c('default-og-image');
}

/**
 * This function returns the og:description value
 *
 * @return void
 */
function get_og_description(){
	if(!is_home() || !is_front_page()){
		$postId = get_the_ID();
		
		$content_post = get_post($postId);
		$content = str_replace('&nbsp;', ' ', substr(wp_strip_all_tags($content_post->post_content, true), 0, 225));
		if(strlen($content) > 0){
			return $content . '...';
		}
	}
	return bloginfo('description');
}