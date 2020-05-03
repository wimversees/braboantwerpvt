<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

/**
 * Register Post Type example
 */
function create_posttype_example()
{
    $postType     = c('example');
    $singularName = "Example";
    $pluralName   = "Examples";

    $singularNameLower = strtolower($singularName);
    $pluralNameLower   = strtolower($pluralName);

    $labels = array(
        'name'                  => _x($pluralName, 'Post type general name', 'textdomain'),
        'singular_name'         => _x($singularName, 'Post type singular name', 'textdomain'),
        'menu_name'             => _x($pluralName, 'Admin Menu text', 'textdomain'),
        'name_admin_bar'        => _x($singularName, 'Add New on Toolbar', 'textdomain'),
        'add_new'               => __('Add New', 'textdomain'),
        'add_new_item'          => __('Add New ' . $singularName, 'textdomain'),
        'new_item'              => __('New ' . $singularName, 'textdomain'),
        'edit_item'             => __('Edit ' . $singularName, 'textdomain'),
        'view_item'             => __('View ' . $singularName, 'textdomain'),
        'all_items'             => __('All ' . $pluralName, 'textdomain'),
        'search_items'          => __('Search ' . $pluralName, 'textdomain'),
        'parent_item_colon'     => __('Parent ' . $pluralName . ':', 'textdomain'),
        'not_found'             => __('No ' . $pluralNameLower . ' found.', 'textdomain'),
        'not_found_in_trash'    => __('No ' . $pluralNameLower . ' found in Trash.', 'textdomain'),
        'archives'              => _x($singularName . ' archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'textdomain'),
        'insert_into_item'      => _x('Insert into ' . $singularName, 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'textdomain'),
        'uploaded_to_this_item' => _x('Uploaded to this ' . $singularName, 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'textdomain'),
        'filter_items_list'     => _x('Filter ' . $pluralNameLower . ' list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'textdomain'),
        'items_list_navigation' => _x($pluralName . ' list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'textdomain'),
        'items_list'            => _x($pluralName . ' list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'textdomain'),
    );

    $postTypeSupports = array(
        'title',
        'editor',
        'author',
        //'thumbnail',
        //'excerpt',
        //'comments'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => $postType),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => $postTypeSupports,
    );

    register_post_type($postType, $args);

    // Add category metabox to post type
    register_taxonomy_for_object_type('category', $postType);
}

/**
 * The actual register of the posttype
 */
add_action('init', 'create_posttype_example');

function example_metaboxes()
{
    $postType      = c('example');
    $postTypeViews = [$postType];
    foreach ($postTypeViews as $postTypeView) {
        add_meta_box(
            'example_metabox', // Unique ID
             'example Meta Box Title', // Box title
             'example_metabox_html', // Content callback, must be of type callable
            $postTypeView // Post type
        );
    }
}
add_action('add_meta_boxes', 'example_metaboxes');

function example_metabox_html($post)
{
    $value = get_post_meta($post->ID, c('example-field'), true);
    echo $value;
    ?>
<div class="row">
    <div class="col-6">
        <label for="<?php echo c('example-field'); ?>">Description for this field</label>
    </div>
    <div class="col-6">
        <select name="<?php echo c('example-field'); ?>" id="<?php echo c('example-field'); ?>" class="postbox">
            <option value="">Select something...</option>
            <option value="something" <?php selected($value, 'something'); ?>>Something</option>
            <option value="else" <?php selected($value, 'else'); ?>>Else</option>
        </select>
    </div>
    <div class="col-6">
        <?php
$valueOther = get_post_meta($post->ID, c('example-other-field'), true);
    echo $valueOther; ?>
        <label for="<?php echo c('example-other-field'); ?>">Description for other field</label>
    </div>
    <div class="col-6">
        <input name="<?php echo c('example-other-field'); ?>" id="<?php echo c('example-other-field'); ?>" value="<?php echo $valueOther; ?>" />
    </div>
</div>
<?php
}

function example_save_postdata($post_id)
{
    if (array_key_exists(c('example-field'), $_POST)) {
        update_post_meta(
            $post_id,
            c('example-field'),
            $_POST[c('example-field')]
        );
    }
    if (array_key_exists(c('example-other-field'), $_POST)) {
        update_post_meta(
            $post_id,
            c('example-other-field'),
            $_POST[c('example-other-field')]
        );
    }
}
add_action('save_post', 'example_save_postdata');