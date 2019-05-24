<?php

include('parts/mail-includes.php');

mailHeader('We hebben uw bericht goed ontvangen.');

mailParagraph('Beste [firstname] [lastname]');
mailParagraph('We hebben uw bericht goed ontvangen en trachten u zo snel mogelijk te contacteren.');
mailParagraph('U bezorgde ons volgende info: <br/> 
                Voornaam: [firstname] <br/> 
                Naam: [lastname] <br/> 
                E-mail: [email] <br/> 
                Telefoon/GSM: [telephone] <br/> ');
mailParagraph('Vriendelijke groeten');
mailParagraph(bloginfo('name'));

mailFooter();
