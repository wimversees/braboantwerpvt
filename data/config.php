<?php 

function getConfig(){
	return array(
		// general settings
		'cache-enabled'							=> "disabled",
		'version'								=> "0.0.1",
		'hashkey'								=> "ripemd160",

		// google analytics
		'google-analytics-key'					=> '', // notation: UA-131124377-1
		
		// address configuration
		'company-micro-data-type'				=> 'LocalBusiness',
		'company-name'							=> '',
		'company-street'						=> '',
		'company-city'							=> '',
		'company-postalcode'					=> '',
		'company-country'						=> 'BE', // notation: 'BE'
		'company-telephone'						=> '',
		'company-telephone-link'				=> '',
		'company-latitude'						=> 0.0000, // notation: 51.284209
		'company-longitude'						=> 0.0000, // notation: 4.284209
		
		// open graph settings
		'default-og-image'						=> '/design/img/default-og-image.jpg',
		
		// sitemap settings
		'sitemap-post-types'					=> array('page', 'post'),

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