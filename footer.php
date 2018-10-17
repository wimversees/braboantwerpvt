        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-7 col-md-3">
                        <img class="footer-brand-img" src="<?php echo get_stylesheet_directory_uri(); ?>/design/img/dragons-logo.svg">
                    </div>
                    <div class="col-6 col-md-3">
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
                    <div class="col-6 col-md-3">
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
                    <div class="col-12 col-md-3">
                        <div class="footer-company">
                            <h3><?php echo c('dragons-name'); ?></h3>
                            <p><?php echo c('dragons-street'); ?>
                                <br><?php echo c('dragons-postalcode'); ?> <?php echo c('dragons-city'); ?></p>
                            <p>
                                <a href="tel:<?php echo c('dragons-telephone-full'); ?>"><?php echo c('dragons-telephone'); ?></a>
                            </p>
                        </div>
                        <div class="footer-social">
                            <h4><?php t('footer-follow-us'); ?>:</h4>
                            <ul class="footer-nav">
                                <?php include 'parts/social-media-links.php'; ?>  
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <p class="footer-copyright-text"><?php t('footer-copyright'); ?> <a href="<?php echo bloginfo('url'); ?>" title="<?php echo bloginfo('name'); ?>"><?php echo bloginfo('name'); ?></a>. <?php t('footer-all-rights-reserved'); ?></p>
                        </div>
                        <div class="col-12 col-md-6 ml-auto">
                            <ul class="footer-nav">
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
        
        <script src="<?php getFrontEndFile('/design/js/lib.js'); ?>" type="text/javascript"></script>
        <script src="<?php getFrontEndFile('/design/js/applib.js'); ?>" type="text/javascript"></script>
        <?php wp_footer(); ?>
    </body>
</html>
