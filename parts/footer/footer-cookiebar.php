<div id="cookies">
    <p><?php 
      $privacyPolicyLink = '<a href="' . get_permalink(gpid('page-privacy-policy')) . '" title="' . get_the_title(gpid('page-privacy-policy')) . '">' . get_the_title(gpid('page-privacy-policy')) . '</a>';
      $cookiePolicyLink = '<a href="' . get_permalink(gpid('page-cookie-policy')) . '" title="' . get_the_title(gpid('page-cookie-policy')) . '">' . get_the_title(gpid('page-cookie-policy')) . '</a>';
      echo sprintf(t('cookie-message', false), $cookiePolicyLink, $privacyPolicyLink); ?></p>
      <p><span class="cookie-accept btn btn-primary" title="<?php t('cookie-ok-title'); ?>" id="cookie-accept"><?php t('cookie-ok'); ?></span><a href="<?php echo get_permalink(gpid('page-cookie-policy')); ?>" title="<?php echo get_the_title(gpid('page-cookie-policy')); ?>"><?php t('cookie-more-info'); ?></a>
</p>
</div>
<script>
  document.getElementById("cookie-accept").onclick = function(e) {
      days = 182;
      myDate = new Date();
      myDate.setTime(myDate.getTime()+(days*24*60*60*1000));
      document.cookie = "<?php echo c('cookie-name'); ?> = comply_yes;path=/; expires = " + myDate.toGMTString();
      document.getElementById("cookies").style.display = 'none';
  }
</script>
