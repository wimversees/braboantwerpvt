<?php 
  $socialmedias = [];
  if(strlen(c('facebook-link')) > 0) $socialmedias[] = c('facebook-link');
  if(strlen(c('twitter-link')) > 0) $socialmedias[] = c('twitter-link');
  if(strlen(c('instagram-link')) > 0) $socialmedias[] = c('instagram-link');
  if(strlen(c('youtube-link')) > 0) $socialmedias[] = c('youtube-link');
  if(strlen(c('flickr-link')) > 0) $socialmedias[] = c('flickr-link');
?>

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "<?php echo c('company-micro-data-type') ?>",
  "name": "<?php echo c('company-name') ?>",
  "image": "<?php getFrontEndFile('/design/img/logo.svg'); ?>",
  "@id": "",
  "url": "<?php echo bloginfo('url') ?>",
  "telephone": "<?php echo c('company-telephone') ?>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<?php echo c('company-street') ?>",
    "addressLocality": "<?php echo c('company-city') ?>",
    "postalCode": "<?php echo c('company-postalcode') ?>",
    "addressCountry": "<?php echo c('company-country') ?>",
  },"pricerange": "€€",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": <?php echo c('company-latitude') ?>,
    "longitude": <?php echo c('company-longitude') ?>
  } 
  <?php if(count($socialmedias) > 0){ ?>,"sameAs":[<?php for($i = 0; $i < count($socialmedias); $i++) { ?>"<?php echo $socialmedias[$i] ?>"<?php if($i < count($socialmedias) - 1) { echo ","; } ?><?php } ?>]<?php } ?>
}
</script>