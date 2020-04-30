<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * This function contains the actions that need to be processed after publishing or updating a post.
 *
 * @param [type] $new_status
 * @param [type] $old_status
 * @param [type] $post
 * @return void
 */
function actions_transition_post_status($new_status, $old_status, $post)
{
    // clear cache
    if ('publish' === $new_status or 'publish' === $old_status) {
        if (function_exists('clearCustomCache')) {
            clearCustomCache();
        }
    }

    //if ( 'post' !== $post->post_type )
    //    return; // restrict the filter to a specific post type
    // do something awesome
}
add_action('transition_post_status', 'actions_transition_post_status', 10, 3);

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
    if (function_exists('clearCustomCache')) {
        clearCustomCache();
    }
}
add_action('post_updated', 'actions_post_updated', 10, 3);