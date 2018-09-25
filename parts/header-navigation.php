<nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
        <a class="navbar-brand" href="<?php echo bloginfo('url'); ?>">
            <img class="navbar-brand-img" src="<?php echo get_stylesheet_directory_uri(); ?>/design/img/logo.svg"/>
        </a>
        <button class="navbar-toggler brand-icon" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <svg width="30" height="30" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1">
                <rect y="9" width="20" height="2"></rect>
                <rect y="3" width="20" height="2"></rect>
                <rect y="15" width="20" height="2"></rect>
            </svg>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

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
                <?php include 'social-media-links.php'; ?>                
            </ul>
        </div>
        <button class="navbar-search brand-icon" type="button" aria-expanded="false" aria-label="Toggle search">
            <svg width="30" height="30" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1">
                <circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"></circle>
                <path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"></path>
            </svg>
        </button>
    </div>
</nav>