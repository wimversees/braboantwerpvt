<?php

$searchBoxStructuredData = array();

$searchBoxStructuredData["@context"]                       = "https://schema.org";
$searchBoxStructuredData["@type"]                          = "WebSite";
$searchBoxStructuredData["url"]                            = get_bloginfo('url');
$searchBoxStructuredData["potentialAction"]                = array();
$searchBoxStructuredData["potentialAction"]["@type"]       = "SearchAction";
$searchBoxStructuredData["potentialAction"]["target"]      = c('search-page') . "{search_term_string}";
$searchBoxStructuredData["potentialAction"]["query-input"] = "required name=search_term_string";

echo '<script type="application/ld+json">';
echo cleanupStructuredDataOutput(json_encode($searchBoxStructuredData));
echo '</script>';