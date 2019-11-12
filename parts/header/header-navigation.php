<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="<?php echo bloginfo('url'); ?>" title="<?php echo bloginfo('name'); ?>">
            <img class="navbar-brand-img" src="<?php echo get_stylesheet_directory_uri(); ?>/design/img/logo.svg" alt="<?php echo bloginfo('name'); ?>"/>
        </a>
        <button class="navbar-toggler brand-icon" type="button" data-toggle="collapse" data-target="#m" aria-controls="m" aria-expanded="false" aria-label="Toggle navigation">
            <svg width="30" height="30" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1">
                <rect y="9" width="20" height="2"></rect>
                <rect y="3" width="20" height="2"></rect>
                <rect y="15" width="20" height="2"></rect>
            </svg>
        </button>

        <div class="collapse navbar-collapse" id="m" itemscope itemtype="http://www.schema.org/SiteNavigationElement">

            <?php  
				wp_nav_menu( array(
					'menu' => 'head-menu',
					'depth' => 2,
					'container' => false,
					'menu_class' => 'navbar-nav ml-auto',
					// Process nav menu using our custom nav walker
					'walker' => new WP_Bootstrap_Navwalker())
				);
			?>

            <ul class="navbar-nav d-none d-lg-flex">
                <?php include __DIR__ . '/../social/social-media-links.php'; ?>                
            </ul>
        </div>
    </div>
</nav>