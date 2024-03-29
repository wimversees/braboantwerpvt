<?php if (strlen(c('twitter-link')) > 0) { ?>
<li class="nav-item">
    <a class="nav-link brand-icon" target="_blank" href="<?php echo c('twitter-link'); ?>" rel="noopener"
        title="<?php echo sprintf(t('social-follow-on-twitter', false), get_bloginfo('name')); ?>">
        <span><?php echo sprintf(t('social-follow-on-twitter', false), get_bloginfo('name')); ?></span>
        <svg width="20" height="20" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1">
            <path
                d="M19,4.74 C18.339,5.029 17.626,5.229 16.881,5.32 C17.644,4.86 18.227,4.139 18.503,3.28 C17.79,3.7 17.001,4.009 16.159,4.17 C15.485,3.45 14.526,3 13.464,3 C11.423,3 9.771,4.66 9.771,6.7 C9.771,6.99 9.804,7.269 9.868,7.539 C6.795,7.38 4.076,5.919 2.254,3.679 C1.936,4.219 1.754,4.86 1.754,5.539 C1.754,6.82 2.405,7.95 3.397,8.61 C2.79,8.589 2.22,8.429 1.723,8.149 L1.723,8.189 C1.723,9.978 2.997,11.478 4.686,11.82 C4.376,11.899 4.049,11.939 3.713,11.939 C3.475,11.939 3.245,11.919 3.018,11.88 C3.49,13.349 4.852,14.419 6.469,14.449 C5.205,15.429 3.612,16.019 1.882,16.019 C1.583,16.019 1.29,16.009 1,15.969 C2.635,17.019 4.576,17.629 6.662,17.629 C13.454,17.629 17.17,12 17.17,7.129 C17.17,6.969 17.166,6.809 17.157,6.649 C17.879,6.129 18.504,5.478 19,4.74">
            </path>
        </svg>
    </a>
</li>
<?php } ?>
<?php if (strlen(c('instagram-link')) > 0) { ?>
<li class="nav-item">
    <a class="nav-link brand-icon" target="_blank" href="<?php echo c('instagram-link'); ?>" rel="noopener"
        title="<?php echo sprintf(t('social-follow-on-instagram', false), get_bloginfo('name')); ?>">
        <span><?php echo sprintf(t('social-follow-on-instagram', false), get_bloginfo('name')); ?></span>
        <svg width="20" height="20" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1">
            <path
                d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z">
            </path>
            <circle cx="14.87" cy="5.26" r="1.09"></circle>
            <path
                d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z M10.08,13c-1.66,0-3-1.34-3-2.99c0-1.65,1.34-2.99,3-2.99s3,1.34,3,2.99 C13.08,11.66,11.74,13,10.08,13L10.08,13L10.08,13z">
            </path>
        </svg>
    </a>
</li>
<?php } ?>
<?php if (strlen(c('linkedin-link')) > 0) { ?>
<li class="nav-item">
    <a class="nav-link brand-icon" target="_blank" href="<?php echo c('linkedin-link'); ?>" rel="noopener"
        title="<?php echo sprintf(t('social-follow-on-linkedin', false), get_bloginfo('name')); ?>">
        <span><?php echo sprintf(t('social-follow-on-linkedin', false), get_bloginfo('name')); ?></span>
        <svg width="20" height="20" viewbox="-2 -2 27 27" xmlns="http://www.w3.org/2000/svg" ratio="1">
            <path xmlns="http://www.w3.org/2000/svg"
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    </a>
</li>
<?php } ?>
<?php if (strlen(c('youtube-link')) > 0) { ?>
<li class="nav-item">
    <a class="nav-link brand-icon" target="_blank" href="<?php echo c('youtube-link'); ?>" rel="noopener"
        title="<?php echo sprintf(t('social-follow-on-youtube', false), get_bloginfo('name')); ?>">
        <span><?php echo sprintf(t('social-follow-on-youtube', false), get_bloginfo('name')); ?></span>
        <svg width="20" height="20" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1">
            <path
                d="M15,4.1c1,0.1,2.3,0,3,0.8c0.8,0.8,0.9,2.1,0.9,3.1C19,9.2,19,10.9,19,12c-0.1,1.1,0,2.4-0.5,3.4c-0.5,1.1-1.4,1.5-2.5,1.6 c-1.2,0.1-8.6,0.1-11,0c-1.1-0.1-2.4-0.1-3.2-1c-0.7-0.8-0.7-2-0.8-3C1,11.8,1,10.1,1,8.9c0-1.1,0-2.4,0.5-3.4C2,4.5,3,4.3,4.1,4.2 C5.3,4.1,12.6,4,15,4.1z M8,7.5v6l5.5-3L8,7.5z">
            </path>
        </svg>
    </a>
</li>
<?php } ?>
<?php if (strlen(c('facebook-link')) > 0) { ?>
<li class="nav-item">
    <a class="nav-link brand-icon" target="_blank" href="<?php echo c('facebook-link'); ?>" rel="noopener"
        title="<?php echo sprintf(t('social-follow-on-facebook', false), get_bloginfo('name')); ?>">
        <span><?php echo sprintf(t('social-follow-on-facebook', false), get_bloginfo('name')); ?></span>
        <svg width="20" height="20" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ratio="1">
            <path d="M11,10h2.6l0.4-3H11V5.3c0-0.9,0.2-1.5,1.5-1.5H14V1.1c-0.3,0-1-0.1-2.1-0.1C9.6,1,8,2.4,8,5v2H5.5v3H8v8h3V10z"></path>
        </svg>
    </a>
</li>
<?php } ?>
<?php if (strlen(c('flickr-link')) > 0) { ?>
<li class="nav-item">
    <a class="nav-link brand-icon" target="_blank" href="<?php echo c('flickr-link'); ?>" rel="noopener"
        title="<?php echo sprintf(t('social-follow-on-flickr', false), get_bloginfo('name')); ?>">
        <span><?php echo sprintf(t('social-follow-on-flickr', false), get_bloginfo('name')); ?></span>
        <svg width="20px" height="10px" viewBox="0 0 24 12" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <path
                d="M12,6.0010531 C12,9.31406922 9.31334697,12 5.99974318,12 C2.68613939,12 0,9.31401785 0,6.0010531 C0,2.68541707 2.68613939,0 5.99974318,0 C9.31334697,0 12,2.68598215 12,6.0010531 Z"
                id="Shape"></path>
            <path
                d="M23.020837,5.99944428 C23.020837,8.76821259 20.7681661,11.0201071 17.9997979,11.0201071 C15.2314298,11.0201071 12.9797692,8.76765687 12.9797692,5.99944428 C12.9797692,3.23123169 15.2319349,0.979286653 17.9997979,0.979286653 C20.767661,0.979286653 23.020837,3.23123169 23.020837,5.99944428 Z M17.9997474,1.43587498e-15 C14.6913343,1.43587498e-15 12,2.69111852 12,5.9994948 C12,9.30832576 14.6913343,12 17.9997474,12 C21.3076554,12 24,9.30883096 24,5.9994948 C24,2.69116904 21.3070997,0 17.9997474,1.43587498e-15 Z"
                id="Shape"></path>
        </svg>
    </a>
</li>
<?php } ?>