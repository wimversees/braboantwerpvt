<?php

include('parts/mail-includes.php');

mailHeader('We hebben uw bericht goed ontvangen.');

mailParagraph('Beste ' );
mailParagraph('We hebben een bericht via de website ontvangen.');
mailParagraph('Volgende info werd bezorgd: <br/> 
                Voornaam: [firstname] <br/> 
                Naam: [lastname] <br/> 
                E-mail: [email] <br/> 
                Telefoon/GSM: [telephone] <br/> ');
mailParagraph('Vriendelijke groeten');
mailParagraph('WIVER');

mailFooter();
