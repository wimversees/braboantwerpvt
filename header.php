<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title><?php page_title(); ?></title>

		<meta name="keywords" content="<?php page_title(); ?>">
		<meta name="description" content="<?php page_description(); ?>">
		<meta name="author" content="WIVER Webdesign & Display Advertising - www.wiver.be">
		
		<link rel="apple-touch-icon" sizes="180x180" href="<?php getFrontEndFile('/design/img/favicon/apple-touch-icon.png'); ?>">
        <link rel="icon" type="image/png" sizes="32x32" href="<?php getFrontEndFile('/design/img/favicon/favicon-32x32.png'); ?>">
        <link rel="icon" type="image/png" sizes="16x16" href="<?php getFrontEndFile('/design/img/favicon/favicon-16x16.png'); ?>">
        <link rel="manifest" href="<?php getFrontEndFile('/design/img/favicon/site.webmanifest'); ?>">
        <link rel="mask-icon" href="<?php getFrontEndFile('/design/img/favicon/safari-pinned-tab.svg'); ?>" color="#000000">
        <link rel="shortcut icon" href="<?php getFrontEndFile('/design/img/favicon/favicon.ico'); ?>">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-config" content="<?php getFrontEndFile('/design/img/favicon/browserconfig.xml'); ?>">
		<meta name="theme-color" content="#ffffff">
		
		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

		<link href="<?php getFrontEndFile('/design/css/main.css'); ?>" rel="stylesheet">

		<?php includecached('parts/header/header-structured-data-info.php'); ?>

		<meta property="og:title" content="<?php page_title(); ?>" />
		<meta property="og:image" content="<?php echo get_og_image(); ?>" />
		<meta property="og:url" content="<?php echo " http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI] "; ?>"/>
		<meta property="og:site_name" content="<?php bloginfo('name'); ?>, proudly powered by www.wiver.be" />
		<meta property="og:description" content="<?php echo get_og_description(); ?>" />

		<meta name="wiver-version" content="<?php echo c('version'); ?>">
    
	</head>
	<body>
		<header>			
			<?php include 'parts/header/header-navigation.php'; ?>
		</header>
        
		<?php includecached('parts/header/header-breadcrumb.php'); ?>