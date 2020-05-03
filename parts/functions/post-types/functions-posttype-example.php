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
    $postType = c('example');

    register_post_type($postType,
        // CPT Options
        array(
            'labels'             => array(
                'name'          => __('examples'),
                'singular_name' => __($postType),
            ),
            'public'             => true, // default true, to use the post type on the FE of the website
             'has_archive'        => true,
            'rewrite'            => array('slug' => 'example'), // part of the url: blogurl/example/post_name
             'show_in_rest'       => true,
            'publicly_queryable' => true,
            'show_in_nav_menus'  => false, // default $public, make selectable in menu
        )
    );

    // set author functionality for post type
    $postTypeSupports = array(
        // 'author', // add author relation for post type
        // 'excerpt', // add excerpt for post type
        // 'thumbnail', // add featured image for post type
    );
    // add featured image for post type
    add_post_type_support($postType, $postTypeSupports);

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