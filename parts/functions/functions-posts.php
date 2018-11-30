<?php 

/**
 * This function echoes the title of the page, used for the browser tab title
 *
 * @return void
 */
function page_title(){
	$default = get_bloginfo('name') . ' - ' . get_bloginfo('description');
	if(is_home() || is_front_page()){
		echo $default;
	} else if(is_404()){
		echo t('404-title') . ' - ' . $default;
	} else if(is_category()){
		single_cat_title();
		echo ' - ' . $default;
	} else if(is_post_type_archive()){
		post_type_archive_title();
		echo ' - ' . $default;
	} else {
		echo get_the_title() . ' - ' . $default;
	}
}

/**
 * This page echoes the description of the page, used for the browser tab title.
 *
 * @return void
 */
function page_description(){
	echo excerpt(20);
}

/**
 * This function returns the excerpt with a custom length in words.
 *
 * @param int $limit
 * @return void
 */
function excerpt($limit) {
    $excerpt = explode(' ', get_the_excerpt(), $limit);
    if (count($excerpt)>=$limit) {
		array_pop($excerpt);
		$excerpt = implode(' ',$excerpt).'...';
    } else {
		$excerpt = implode(' ',$excerpt);
    } 
    $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
    return $excerpt;
}