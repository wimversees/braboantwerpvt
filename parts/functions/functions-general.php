<?php

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
	$currentLanguage = 'default';
	if(!function_exists('getDictionary')){
		include(__DIR__ . '/../../data/translations_' . $currentLanguage . '.php');
	}
	$dict = getDictionary();
	$printString;
	if(array_key_exists($key, $dict)){
		$printString = $dict[$key];
	} else {
		$printString = '---' . $key . '---';
	}
	if($echo){
		echo $printString;
	} else {
		return $printString;
	}
}

/**
 * This function returns the id of the post/page/category/... that is requested via the key
 *
 * @param [type] $key
 * @return void
 */
function gpid($key){
	if(!function_exists('getPostId')){
		include(__DIR__ . '/../../data/postids.php');
	}
	$ids = getPostId();
	if(array_key_exists($key, $ids)){
		return $ids[$key];
	} else {
		echo '---' . $key . '---';
		return '---' . $key . '---';
	}
}

/**
 * This funciton returns the outcome of the config array that is requested via the key
 *
 * @param [type] $key
 * @return void
 */
function c($key){
	if(!function_exists('getConfig')){
		include(__DIR__ . '/../../data/config.php');
	}
	$ids = getConfig();
	if(array_key_exists($key, $ids)){
		return $ids[$key];
	} else {
		echo '---' . $key . '---';
		return '---' . $key . '---';
	}
}