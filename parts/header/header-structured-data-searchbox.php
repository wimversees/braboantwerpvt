<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "<?php bloginfo('url'); ?>",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "<?php echo c('search-page'); ?>{search_term_string}",
        "query-input": "required name=search_term_string"
    }
}
</script>