<?php 

function getConfig(){
	return array(
		// general settings
		'cache-enabled'							=> "disabled",
		'version'								=> "0.0.1",
		'hashkey'								=> "ripemd160",

		// address configuration
		'company-micro-data-type'				=> 'LocalBusiness',
		'company-name'							=> '',
		'company-street'						=> '',
		'company-city'							=> '',
		'company-postalcode'					=> '',
		'company-country'						=> '', // notation: 'BE'
		'company-telephone'						=> '',
		'company-telephone-link'				=> '',
		'company-latitude'						=> 0.0000, // notation: 51.284209
		'company-longitude'						=> 0.0000, // notation: 51.284209
		
		// open graph settings
		'default-og-image'						=> '/img/default-og-image.jpg',

		// social media settings
		'facebook-link'							=> '',
		'twitter-link'							=> '',
		'instagram-link'						=> '',
		'linkedin-link'							=> '',
		'youtube-link'							=> '',
		'flickr-link'							=> '',
	);
}

?>