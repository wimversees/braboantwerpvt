<div class="header-image">
    <?php 
    $id = get_the_ID();
    $images = array();
    $altText = get_the_title(get_the_ID()); 

    // set header image if the post has a featured image and it doesn't need to be ignored
    if(is_single()){
        if(get_post_meta($id, c('post-do-not-use-featured-image-as-header-image'), true) != "1"){
            $featuredImageUrl = get_the_post_thumbnail_url(get_the_ID(), 'header-image');
            if(strlen($featuredImageUrl) > 0){ 
                $images[] = $featuredImageUrl; 
            };
        }
    } 
    
    // fallback, set header image for pages
    if(count($images) == 0){
        // get images of current page
        $imagesOfCurrentPage = get_post_meta($id, c('page-header-image'));
        // check if current page has images
        if(is_array($imagesOfCurrentPage) && (count($imagesOfCurrentPage) == 0 || strlen($imagesOfCurrentPage[0]) == 0)){
            $parentId = wp_get_post_parent_id($id);
            // get parent images recursively
            while((count($images) == 0 || strlen($images[0]) == 0) && $parentId > 0){
                $images = get_post_meta($parentId, c('page-header-image'));
                $parentId = wp_get_post_parent_id($parentId);
            } 
        }
        // go to defaulf of homepage				
        if(count($images) == 0){
            $images = get_post_meta(gpid('page-home'), c('page-header-image'));
            $altText = get_bloginfo('name');
        }
    } 

    // get random image from set of images (this will be the featured image for posts)
    $image = $images[rand(0, count($images) - 1)];
    ?>
    <img src="<?php echo $image; ?>" title="<?php echo $altText; ?>" alt="<?php echo $altText; ?>"/>
</div>