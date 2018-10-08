<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "SportsClub",
  "name": "<?php echo c('dragons-name') ?>",
  "image": "<?php echo get_stylesheet_directory_uri(); ?>/design/img/dragons-logo.svg",
  "@id": "",
  "url": "<?php echo bloginfo('url') ?>",
  "telephone": "<?php echo c('dragons-telephone') ?>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<?php echo c('dragons-street') ?>",
    "addressLocality": "<?php echo c('dragons-city') ?>",
    "postalCode": "<?php echo c('dragons-postalcode') ?>",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.284209,
    "longitude": 4.488654
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:00",
    "closes": "15:00"
  },
  "sameAs": [
    "<?php echo c('facebook-link') ?>",
    "<?php echo c('twitter-link') ?>",
    "<?php echo c('instagram-link') ?>",
    "<?php echo c('youtube-link') ?>",
    "<?php echo c('flickr-link') ?>"
  ]
}
</script>