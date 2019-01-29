<?php

include('parts/mail-includes.php');

mailHeader('We received your job application.');

mailParagraph('Dear [firstname] [lastname]');
mailParagraph('We received your job application and we will contact you in the nearby future.');
mailParagraph('Your provided info: <br/> 
                Firstname: [firstname] <br/> 
                Lastname: [lastname] <br/> 
                E-mail: [email] <br/> 
                Telephone: [telephone] <br/> 
                Birthday: [birthday] <br/> 
                Port book number: [portbooknumber]');
mailParagraph('Thanks for the application.');
mailParagraph('Kind regards');
mailParagraph(bloginfo('name'));

mailFooter();
