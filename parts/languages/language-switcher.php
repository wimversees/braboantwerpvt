<?php
if (function_exists('icl_get_languages')) {
    $languages = icl_get_languages('skip_missing=1');
    if (1 < count($languages)) {
        ?>
<ul class="lang-switcher">
    <?php
foreach ($languages as $l) {
            if (!$l['active']) { ?>
    <li class="nav-item"><a class="nav-link" href="<?php echo $l['url']; ?>" title="<?php t('wpml-check-in');
                echo $l['translated_name']; ?>"><?php echo c('multilanguage-flags-enabled') ? getFrontEndFile('parts/languages/flags/' . $l['code'] . '.svg') : '';
                echo $l['code']; ?></a></li>
    <?php }
        } ?>
</ul>
<?php
}
}