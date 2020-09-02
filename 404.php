<?php
/**
 * 404 page (Not Found).
 */

http_response_code(404);

get_header();

includecached('parts/page/page-404.php');

get_footer();