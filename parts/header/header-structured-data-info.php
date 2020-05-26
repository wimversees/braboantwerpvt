<?php
$socialmedias = [];
if (strlen(c('facebook-link')) > 0) {
    $socialmedias[] = c('facebook-link');
}

if (strlen(c('twitter-link')) > 0) {
    $socialmedias[] = c('twitter-link');
}

if (strlen(c('instagram-link')) > 0) {
    $socialmedias[] = c('instagram-link');
}

if (strlen(c('youtube-link')) > 0) {
    $socialmedias[] = c('youtube-link');
}

if (strlen(c('flickr-link')) > 0) {
    $socialmedias[] = c('flickr-link');
}

$companyData = array();

$companyData["@context"]                   = "http://schema.org";
$companyData["@type"]                      = c('company-micro-data-type');
$companyData["name"]                       = c('company-name');
$companyData["image"]                      = getFrontEndFile('/design/img/logo.svg', false);
$companyData["@id"]                        = "";
$companyData["url"]                        = get_bloginfo('url');
$companyData["telephone"]                  = c('company-telephone');
$companyData["address"]                    = array();
$companyData["address"]["@type"]           = "PostalAddress";
$companyData["address"]["streetAddress"]   = c('company-street');
$companyData["address"]["addressLocality"] = c('company-city');
$companyData["address"]["postalCode"]      = c('company-postalcode');
$companyData["address"]["addressCountry"]  = c('company-country');
$companyData["pricerange"]                 = "€€";
$companyData["geo"]                        = array();
$companyData["geo"]["@type"]               = "GeoCoordinates";
$companyData["geo"]["latitude"]            = c('company-latitude');
$companyData["geo"]["longitude"]           = c('company-longitude');
$companyData["sameAs"]                     = $socialmedias;

echo '<script type="application/ld+json">';
echo cleanupStructuredDataOutput(json_encode($companyData));
echo '</script>';