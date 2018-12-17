<?php if(strlen(c('google-analytics-key')) > 0){ ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo c('google-analytics-key'); ?>"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '<?php echo c('google-analytics-key'); ?>');
    </script>
<?php } ?>