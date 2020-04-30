<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
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
function includecached($path, $cacheKeyExtention = '')
{
    $cacheEnabled = c('cache-enabled') == 'enabled';
    // define cache key by used path
    $fullpath = __DIR__ . '/../../' . $path;
    $cacheKey = getCacheKeyByFileNameAndExtention($path, $cacheKeyExtention);
    $file     = getCacheFileName($cacheKey);

    // use cached file
    if (is_file($file) && $cacheEnabled) {
        include $file;
    }
    // generate and use cached file
    else {
        ob_start(); // begin collecting output
        include $fullpath;
        $content = ob_get_clean(); // retrieve output, stop buffering
        if ($cacheEnabled) {
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
function includecachedfunction($functionName, $parameters = [])
{
    $cacheEnabled = c('cache-enabled') == 'enabled';
    // define cache key by used path
    $cacheKey = getCacheKeyByFileNameAndExtention($functionName, implode('----', $parameters));
    $file     = getCacheFileName($cacheKey);

    // use cached file
    if (is_file($file) && $cacheEnabled) {
        include $file;
    }
    // generate and use cached file
    else {
        ob_start(); // begin collecting output
        call_user_func_array($functionName, $parameters);
        $content = ob_get_clean(); // retrieve output, stop buffering
        if ($cacheEnabled) {
            file_put_contents($file, $content);
        }
        // print result
        echo $content;
    }
}

/**
 * This function returns the file key with extentions and the .php extention
 *
 * @param [type] $filename
 * @param string $extention
 * @param boolean $enableHashedCache
 * @return void
 */
function getCacheKeyByFileNameAndExtention($filename, $extention = '', $enableHashedCache = false)
{
    $language     = GetLocale();
    $baseFileName = str_replace('/', '--', str_replace('.php', '', $extention . '---' . $filename . '_' . $language));
    if ($enableHashedCache) {
        return hash(c('hashkey'), $baseFileName) . '.php';
    }
    return urlencode($baseFileName) . '.php';
}

/**
 * This function returns the full path of a cache file, included the cache folder
 *
 * @param [type] $cacheKey
 * @return void
 */
function getCacheFileName($cacheKey)
{
    $cacheDirectory = __DIR__ . '/../../cache/';
    if (!file_exists($cacheDirectory)) {
        mkdir($cacheDirectory);
    }
    return $cacheDirectory . $cacheKey;
}

/**
 * This function clears the cache folder.
 *
 * @return void
 */
function clearCustomCache()
{
    $files = glob(__DIR__ . '/../../cache/*'); // get all file names
    foreach ($files as $file) { // iterate files
        if (is_file($file)) {
            unlink($file);
        }
        // delete file
    }
}

/**
 * This function returns a url to retreive a given front-end file, depending on the hash of the version of the system
 * and modification date of the file.
 *
 * @param [type] $path
 * @param boolean $echo
 * @return void
 */
function getFrontEndFile($path, $echo = true)
{
    // skip caching for local frontend files
    if (IsLocalEnvironment()) {
        $fullPath = get_stylesheet_directory_uri() . $path;
        if ($echo) {
            echo $fullPath;
            return;
        } else {
            return $fullPath;
        }
    }

    $fileName         = __DIR__ . '/../../' . $path;
    $modificationTime = file_exists($fileName) ? filemtime($fileName) : '';
    $fullPath         = get_stylesheet_directory_uri() . $path . '?v=' . hash(c('hashkey'), c('version') . $modificationTime);
    if ($echo) {
        echo $fullPath;
    } else {
        return $fullPath;
    }

}