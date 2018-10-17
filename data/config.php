<?php 

function getConfig(){
	return array(
		// general settings
		'cache-enabled'							=> "enabled",
		'version'								=> "0.9.1",
		'hashkey'								=> "ripemd160",
		
		'default-og-image'			=> '/img/default-og-image.jpg',
		'default-og-description'	=> 'ETF Congress Barcelona 2018',
		'original_file_extension'	=> '_original',
		'allowed_file_extensions'	=> '.doc,.docx,.pdf',
		'allowed_media_extensions'	=> '.jpg,.jpeg',
		'final_file_extension'		=> '_final',
		'file_languages'			=> 'en|fr|de|es|it',
		'mail_name'					=> 'ETF Congress 2017',
		'mail_send_address'			=> 'noreply@etf-2017congress.org',
	);
}

?>