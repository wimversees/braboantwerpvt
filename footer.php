<footer>
            <div class="container pt-3">
                <div class="row">
                    <div class="col-12 col-md-3 d-flex justify-content-center pb-2">
                        <img class="footer-brand-img" src="<?php getFrontEndFile('/design/img/logo.svg'); ?>" alt="<?php echo bloginfo('name'); ?>"/>
                    </div>
                    <div class="col-6 col-md-3 d-flex justify-content-center">
                        <?php  
                            wp_nav_menu( array(
                                'menu' => 'footer-left',
                                'depth' => 2,
                                'container' => false,
                                'menu_class' => 'footer-nav',
                                // Process nav menu using our custom nav walker
                                'walker' => new WP_Bootstrap_Navwalker())
                            );
                        ?>
                    </div>
                    <div class="col-6 col-md-3 d-flex justify-content-center pb-2">
                        <?php  
                            wp_nav_menu( array(
                                'menu' => 'footer-right',
                                'depth' => 2,
                                'container' => false,
                                'menu_class' => 'footer-nav',
                                // Process nav menu using our custom nav walker
                                'walker' => new WP_Bootstrap_Navwalker())
                            );
                        ?>
                    </div>
                    <div class="col-12 col-md-3 d-flex justify-content-center pb-2">
                        <div class="footer-company">
                            <h3><?php echo c('company-name'); ?></h3>
                            <p><?php echo c('company-street'); ?>
                                <br><?php echo c('company-postalcode'); ?> <?php echo c('company-city'); ?></p>
                            <p>
                                <a href="tel:<?php echo c('company-telephone-link'); ?>"><?php echo c('company-telephone'); ?></a>
                            </p>
                        </div>
                        <div class="footer-social">
                            <h4><?php t('footer-follow-us'); ?>:</h4>
                            <ul class="footer-nav">
                                <?php include 'parts/social/social-media-links.php'; ?>  
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copyright bg-dark pt-1">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-7">
                            <p class="footer-copyright-text"><?php t('footer-copyright'); ?> <?php echo date('Y'); ?> <a href="<?php echo bloginfo('url'); ?>" title="<?php echo bloginfo('name'); ?>"><?php echo bloginfo('name'); ?></a>. <?php t('footer-all-rights-reserved'); ?> <a href="https://www.wiver.be" target="_blank" title="Wiver Webdesign & Display Advertising" rel="noreferrer">W"IVER</a></p>
                        </div>
                        <div class="col-12 col-md-5 ml-auto justify-content-center">
                            <ul class="footer-nav">
                                <li class="nav-item">
                                    <a href="<?php echo get_permalink(gpid('page-sitemap')); ?>" title="<?php echo get_the_title(gpid('page-sitemap')); ?>" class="nav-link"><?php echo get_the_title(gpid('page-sitemap')); ?></a>
                                </li>
                                <li class="nav-item">
                                    <a href="<?php echo get_permalink(gpid('page-privacy-policy')); ?>" title="<?php echo get_the_title(gpid('page-privacy-policy')); ?>" class="nav-link"><?php echo get_the_title(gpid('page-privacy-policy')); ?></a>
                                </li>
                                <li class="nav-item">
                                    <a href="<?php echo get_permalink(gpid('page-cookie-policy')); ?>" title="<?php echo get_the_title(gpid('page-cookie-policy')); ?>" class="nav-link"><?php echo get_the_title(gpid('page-cookie-policy')); ?></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        
        <script src="<?php getFrontEndFile(IsProEnvironment() ? '/design/js/lib.js' : '/design/js/lib-dev.js'); ?>" type="text/javascript"></script>
        <script src="<?php getFrontEndFile(IsProEnvironment() ? '/design/js/applib.js' : '/design/js/applib-dev.js'); ?>" type="text/javascript"></script>

		<?php 
			global $template;
			if (in_array($template, c('enable-wp-head-foot-slugs')) || is_user_logged_in()) 
				wp_footer();
		?>
        
        <?php if(!isset($_COOKIE[c('cookie-name')])) { 
            includecached('parts/footer/footer-cookiebar.php'); 
        }  ?>
        <?php if(IsProEnvironment()) includecached('parts/footer/footer-google-analytics.php'); ?>
    </body>
</html>
