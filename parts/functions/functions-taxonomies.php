<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

add_action('save_post', 'assign_parent_terms', 10, 2);

function assign_parent_terms($post_id, $post)
{
    if (!in_array($post->post_type, c('taxonomy-save-parent-taxonomies-post-types'))) {
        return $post_id;
    }

    // get all assigned terms
    foreach (c('taxonomy-save-parent-taxonomies') as $taxonomy) {
        $terms = wp_get_post_terms($post_id, $taxonomy);
        foreach ($terms as $term) {
            while (is_tax($term) && $term->parent != 0 && !has_term($term->parent, $taxonomy, $post)) {
                // move upward until we get to 0 level terms
                wp_set_post_terms($post_id, array($term->parent), $taxonomy, true);
                $term = get_term($term->parent, $taxonomy);
            }
        }
    }
}