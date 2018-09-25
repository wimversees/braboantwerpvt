<?php 

// theme supports
add_theme_support( 'menus' );

// Register Custom Navigation Walker
require_once('parts/wiver_navwalker.php');

// add featured images
add_image_size( 'news-thumb', 442, 250, true, array( 'left', 'top' ));
function post_thumbnails() {
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'post_thumbnails' );

// add svg support
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
  }
add_filter('upload_mimes', 'cc_mime_types');

/*
* SECTION PAGE HEAD
*/	
// function to get title of the page
function page_title(){
	$default = get_bloginfo('name');
	if(is_home() || is_front_page()){
		echo $default;
	} else if(is_404()){
		echo t('404_title') . " - " . $default;
	} else if(is_post_type_archive()){
		post_type_archive_title();
		echo " - " . $default;
	} else {
		echo get_the_title() . " - " . $default;
	}
}

/* 
* SECTION CONFIG AND TRANSLATION
*/
// function to translate key
function t($key, $echo = true){
	parse_str($_SERVER['QUERY_STRING']);
	if(strlen($qskey) > 0){		
		if($echo){
			echo $key;
			return;
		} else {
			return $key;
		}
	}
	$currentLanguage = "default";
	if(!function_exists('getDictionary')){
		include("data/translations_" . $currentLanguage . ".php");
	}
	$dict = getDictionary();
	$printString;
	if($dict[$key] && $dict[$key] != ''){
		$printString = $dict[$key];
	} else {
		$printString = "---" . $key . "---";
	}
	if($echo){
		echo $printString;
	} else {
		return $printString;
	}
}

function gpid($key){
	if(!function_exists('getPostId')){
		include("data/postids.php");
	}
	$ids = getPostId();
	if($ids[$key] && $ids[$key] != ''){
		return $ids[$key];
	} else {
		echo "---" . $key . "---";
		return "---" . $key . "---";
	}
}

function c($key){
	if(!function_exists('getConfig')){
		include("data/config.php");
	}
	$ids = getConfig();
	if($ids[$key] && $ids[$key] != ''){
		return $ids[$key];
	} else {
		echo "---" . $key . "---";
		return "---" . $key . "---";
	}
}

/*
* SECTION CUSTOM LENGTH EXCERPT
*/
function excerpt($limit, $echo = true) {
    $excerpt = explode(' ', get_the_excerpt(), $limit);
    if (count($excerpt)>=$limit) {
		array_pop($excerpt);
		$excerpt = implode(" ",$excerpt).'...';
    } else {
		$excerpt = implode(" ",$excerpt);
    } 
    $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
    if($echo) {
		echo $excerpt;
	} else {
		return $excerpt;
	}
}

/*
* SECTION OPEN GRAPH
*/
//this function generates the og:image url
function get_og_image(){
	if(!is_home() || !is_front_page()){
		// general thumbnail defined
		$currentThumb = get_the_post_thumbnail_url();
		if(strlen($currentThumb) > 0) return $currentThumb;
	}
	// default image
	return get_stylesheet_directory_uri() . c('default-og-image');
}

//this function generates the og:desciption text
function get_og_description(){
	if(!is_home() || !is_front_page()){
		$postId = get_the_ID();
		
		$content_post = get_post($postId);
		$content = str_replace("&nbsp;", " ", substr(wp_strip_all_tags($content_post->post_content, true), 0, 225));
		if(strlen($content) > 0){
			return $content . "...";
		}
	}
	return c('default-og-description');
}
?>
