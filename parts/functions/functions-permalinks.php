<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

add_filter('request', 'change_term_request_for_removed_taxonomies', 1, 1);
function change_term_request_for_removed_taxonomies($query)
{
    // don't execute for admin pages
    if (is_admin()) {
        return $query;
    }

    if ('remove-taxonomy-name-from-permalinks' == true) {
        $taxonomiesToRedirect = c('remove-taxonomy-from-permalinks-taxomies');
        //print_r($query);

        // Request for child terms differs, we should make an additional check
        if (array_key_exists('attachment', $query)):
            $include_children = true;
            $name             = $query['attachment'];
        elseif (array_key_exists('category_name', $query)):
            $include_children = false;
            $name             = $query['category_name'];
        elseif (array_key_exists('name', $query)):
            $include_children = false;
            $name             = $query['name'];
        endif;

        if (!isset($name)) {
            return $query;
        }

        foreach ($taxonomiesToRedirect as $taxonomyToRemove) {
            $tax_name = $taxonomyToRemove;
            $term     = get_term_by('slug', $name, $tax_name); // get the current term to make sure it exists

            if (isset($name) && $term && !is_wp_error($term)) {
                $urlCheck = $name;

                $parent = $term->parent;
                while ($parent) {
                    $parent_term = get_term($parent, $tax_name);
                    $name        = $parent_term->slug . '/' . $name;
                    $urlCheck    = $name;
                    $parent      = $parent_term->parent;
                }

                if ($include_children) {
                    unset($query['attachment']);
                } else {
                    unset($query['name']);
                }

                // add starting slash for url checks, to be sure the first taxonomy is not part of another one
                if (substr($urlCheck, 0, 1) != '/') {
                    $urlCheck = '/' . $urlCheck;
                }

                // check if the full path is in the url, otherwise throw 404
                if (strpos($_SERVER['REQUEST_URI'], $urlCheck) === false) {
                    $query['name'] = "404";
                }

                switch ($tax_name) {
                    case 'category':{
                            $query['category_name'] = $name; // for categories
                            break;
                        }
                    case 'post_tag':{
                            $query['tag'] = $name; // for post tags
                            break;
                        }
                    default:{
                            $query[$tax_name] = $name; // for another taxonomies
                            break;
                        }
                }
            }
        }
    }
    return $query;
}

/**
 * Remove the taxonomies from the url for permalinks
 */
add_filter('term_link', 'remove_term_from_permalink', 10, 3);
function remove_term_from_permalink($url, $term, $taxonomy)
{
    if ('remove-taxonomy-name-from-permalinks' == true) {
        $taxonomiesToRedirect = c('remove-taxonomy-from-permalinks-taxomies');
        foreach ($taxonomiesToRedirect as $taxonomyToRemove) {
            $taxonomy_name = $taxonomyToRemove;
            $taxonomy_slug = $taxonomyToRemove;
            $partToReplace = '/' . $taxonomy_slug . '/';

            if (!(strpos($url, $partToReplace) === false || $taxonomy != $taxonomy_name)) {
                $url = str_replace($partToReplace, '/', $url);
                break; // save to break here, if one of the taxonomies matches, the rest is not needed anymore
            }
        }
    }
    return $url;
}

/**
 * Redirect default urls to the urls without taxonomies in the url
 */
add_action('template_redirect', 'default_term_redirect');
function default_term_redirect()
{
    if ('remove-taxonomy-name-from-permalinks' == true) {
        $taxonomiesToRedirect = c('remove-taxonomy-from-permalinks-taxomies');
        foreach ($taxonomiesToRedirect as $taxonomyToRedirect) {
            $taxonomy_name = $taxonomyToRedirect;
            $taxonomy_slug = $taxonomyToRedirect;

            $partToReplace = '/' . $taxonomy_slug . '/';

            // exit the redirect function if taxonomy slug is not in URL
            if (strpos($_SERVER['REQUEST_URI'], $partToReplace) === false) {
                continue;
            }

            if ((is_category() && $taxonomy_name == 'category') || (is_tag() && $taxonomy_name == 'post_tag') || is_tax($taxonomy_name)) {
                wp_redirect(str_replace($partToReplace, '/', $_SERVER['REQUEST_URI']), 301);
                exit();
            }
        }
    }
}
