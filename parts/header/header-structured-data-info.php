<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "<?php echo c('company-micro-data-type') ?>",
  "name": "<?php echo c('company-name') ?>",
  "image": "<?php echo get_stylesheet_directory_uri(); ?>/design/img/company-logo.svg",
  "@id": "",
  "url": "<?php echo bloginfo('url') ?>",
  "telephone": "<?php echo c('company-telephone') ?>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<?php echo c('company-street') ?>",
    "addressLocality": "<?php echo c('company-city') ?>",
    "postalCode": "<?php echo c('company-postalcode') ?>",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": <?php echo c('company-latitude') ?>,
    "longitude": <?php echo c('company-longitude') ?>
  },
  "sameAs": [
    <?php if(strlen(c('facebook-link')) > 0) { ?>"<?php echo c('facebook-link') ?>",<?php } ?>
    <?php if(strlen(c('twitter-link')) > 0) { ?>"<?php echo c('twitter-link') ?>",<?php } ?>
    <?php if(strlen(c('instagram-link')) > 0) { ?>"<?php echo c('instagram-link') ?>",<?php } ?>
    <?php if(strlen(c('youtube-link')) > 0) { ?>"<?php echo c('youtube-link') ?>",<?php } ?>
    <?php if(strlen(c('flickr-link')) > 0) { ?>"<?php echo c('flickr-link') ?>",<?php } ?>
  ]
}
</script>