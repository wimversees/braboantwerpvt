<?php 

// theme supports
add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );

// Register Custom Navigation Walker
require_once('parts/wiver_navwalker.php');

// Register custom image sizes
// add_image_size('block-image', 255, 165, true);

// add featured image to custom post types
// add_post_type_support( 'board-member', 'thumbnail' );

// global action settings
function global_settings() {  
    // Add category metabox to page 
	// register_taxonomy_for_object_type('category', 'page'); 
}
add_action( 'init', 'global_settings' );

/*
* SECTION PAGE HEAD
*/	
// function to get title of the page
function page_title(){
	$default = get_bloginfo('name') . " - " . get_bloginfo('description');
	if(is_home() || is_front_page()){
		echo $default;
	} else if(is_404()){
		echo t('404-title') . " - " . $default;
	} else if(is_category()){
		single_cat_title();
		echo " - " . $default;
	} else if(is_post_type_archive()){
		post_type_archive_title();
		echo " - " . $default;
	} else {
		echo get_the_title() . " - " . $default;
	}
}

function page_description(){
	echo "";
}

/**
 * This function returns a url to retreive a given front-end file, depending on the hash of the version of the system  
 * and modification date of the file.
 *
 * @param [type] $path
 * @param boolean $echo
 * @return void
 */
function getFrontEndFile($path, $echo = true){
	$modificationTime = filemtime(__DIR__ . $path);
	$fullPath = get_stylesheet_directory_uri() . $path . "?v=" . hash(c('hashkey'), c('version') . $modificationTime);
	if($echo) echo $fullPath;
	else return $fullPath;
}

/* 
* SECTION CONFIG AND TRANSLATION
*/
// 
/**
 *  This function returns the translated version of a given key.
 *
 * @param [type] $key
 * @param boolean $echo
 * @return void
 */
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
	if(array_key_exists($key, $dict)){
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
	if(array_key_exists($key, $ids)){
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
	if(array_key_exists($key, $ids)){
		return $ids[$key];
	} else {
		echo "---" . $key . "---";
		return "---" . $key . "---";
	}
}

/*
* SECTION CUSTOM CACHING
*/
/**
 * This function returns the output of the given path file. The function will return a cached file when it exists. 
 * The cache key extention is used to create a diveration of the cache files.
 *
 * @param string $path needs to include __DIR__
 * @param string $cacheKeyExtention
 * @return void 
 */
function includecached($path, $cacheKeyExtention = ''){
	$cacheEnabled = c('cache-enabled') == 'enabled';
	// define cache key by used path
	$fullpath = __DIR__ . '/' . $path;
	$cacheKey = getCacheKeyByFileNameAndExtention($path, $cacheKeyExtention);
	$file = getCacheFileName($cacheKey);

	// use cached file
	if(is_file($file) && $cacheEnabled){
		include($file);
	} 
	// generate and use cached file
	else {
		ob_start(); // begin collecting output
		include $fullpath;
		$content = ob_get_clean(); // retrieve output, stop buffering
		if($cacheEnabled){
			file_put_contents($file, $content);
		}
		// print result
		echo $content;
	} 
}

/**
 * This function returns the output the result of a given function. The function will return a cached file when it exists. 
 * The given parameters will be used as the parameters of the given function, as well to define the deiveration of the cache file.
 *
 * @param [type] $functionName
 * @param array $parameters
 * @return void
 */
function includecachedfunction($functionName, $parameters = []){
	$cacheEnabled = c('cache-enabled') == 'enabled';
	// define cache key by used path
	$cacheKey = getCacheKeyByFileNameAndExtention($functionName, implode('----', $parameters));
	$file = getCacheFileName($cacheKey);
	
	// use cached file
	if(is_file($file) && $cacheEnabled){
		include($file);
	} 
	// generate and use cached file
	else {
		ob_start(); // begin collecting output
		call_user_func_array($functionName, $parameters);
		$content = ob_get_clean(); // retrieve output, stop buffering
		if($cacheEnabled){
			file_put_contents($file, $content);
		}
		// print result
		echo $content;
	} 
}

function getCacheKeyByFileNameAndExtention($filename, $extention = '', $enableHashedCache = false){
	$baseFileName = str_replace('/', '--', str_replace('.php', '', $extention . '---' . $filename));
	if($enableHashedCache){
		return hash(c('hashkey'), $baseFileName) . '.php';
	}
	return urlencode($baseFileName) . '.php';
}
function getCacheFileName($cacheKey){
	return __DIR__ . '/cache/' . $cacheKey;
}
/**
 * This function clears the cache folder.
 *
 * @return void
 */
function clearCustomCache(){
	$files = glob(__DIR__ . '/cache/*'); // get all file names
	foreach($files as $file){ // iterate files
	if(is_file($file))
		unlink($file); // delete file
	}
}
/**
 * This function contains the actions that need to be processed after publishing or updating a post.
 *
 * @param [type] $new_status
 * @param [type] $old_status
 * @param [type] $post
 * @return void
 */
function actions_transition_post_status($new_status, $old_status, $post )
{
	// clear cache
    if ('publish' === $new_status or 'publish' === $old_status){
		clearCustomCache();
	}
		
    //if ( 'post' !== $post->post_type )
    //    return; // restrict the filter to a specific post type
    // do something awesome
}
add_action( 'transition_post_status', 'actions_transition_post_status', 10, 3 );

/**
 * This function contains the actions that need to be processed after publishing or updating a post.
 *
 * @param [type] $new_status
 * @param [type] $old_status
 * @param [type] $post
 * @return void
 */
function actions_post_updated($post_ID, $post_after, $post_before)
{
	clearCustomCache();
}
add_action( 'post_updated', 'actions_post_updated', 10, 3 );

/*
* SECTION CUSTOM LENGTH EXCERPT
*/
function excerpt($limit) {
    $excerpt = explode(' ', get_the_excerpt(), $limit);
    if (count($excerpt)>=$limit) {
		array_pop($excerpt);
		$excerpt = implode(" ",$excerpt).'...';
    } else {
		$excerpt = implode(" ",$excerpt);
    } 
    $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
    return $excerpt;
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
	return bloginfo('description');
}