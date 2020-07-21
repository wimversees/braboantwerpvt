<?php
if (function_exists('icl_get_languages')) {
    $languages = icl_get_languages();
    if (1 < count($languages)) {
        foreach ($languages as $l) { ?>
<link rel="alternate" hreflang="<?php echo $l['code']; ?>" href="<?php echo $l['url']; ?>" />
<?php }
    }
}