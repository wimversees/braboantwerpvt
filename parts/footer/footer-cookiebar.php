<?php if(!isset($_COOKIE["comply_cookie"])) { ?>
  <div id="cookies">
      <p>Door onze website te gebruiken, verklaart u zich akkoord met onze <a href="/cookie-policy">cookie policy</a> en <a href="/privacy-policy">privacy policy</a>.
      <span class="cookie-accept btn btn-primary" title="Begrepen" id="cookie-accept">OK</span></p>
  </div>
  <script>
    document.getElementById("cookie-accept").onclick = function(e) {
        days = 182;
        myDate = new Date();
        myDate.setTime(myDate.getTime()+(days*24*60*60*1000));
        document.cookie = "comply_cookie = comply_yes;path=/; expires = " + myDate.toGMTString();
        document.getElementById("cookies").style.display = 'none';
    }
  </script>
<?php } ?>
