<!DOCTYPE html>
<html lang="<?php echo get_html_locale(); ?>">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php page_title(); ?></title>

    <meta name="keywords" content="<?php page_keywords(); ?>">
    <meta name="description" content="<?php page_description(); ?>">
    <meta name="author" content="WIVER - www.wiver.be">
    <meta name="copyright" content="WIVER - www.wiver.be" />

    <?php if (strpos(basename(get_page_template()), 'noindex.php') !== false) { ?>
    <meta name="robots" content="noindex">
    <meta name="googlebot" content="noindex">
    <?php } elseif (IsProEnvironment()) { ?>
    <meta name="robots" content="index, follow">
    <?php } ?>

    <link rel="apple-touch-icon" sizes="180x180" href="<?php getFrontEndFile('/design/img/favicon/apple-touch-icon.png'); ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php getFrontEndFile('/design/img/favicon/favicon-32x32.png'); ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php getFrontEndFile('/design/img/favicon/favicon-16x16.png'); ?>">
    <link rel="manifest" href="<?php getFrontEndFile('/design/img/favicon/site.webmanifest'); ?>">
    <link rel="mask-icon" href="<?php getFrontEndFile('/design/img/favicon/safari-pinned-tab.svg'); ?>" color="#ffffff">
    <link rel="shortcut icon" href="<?php getFrontEndFile('/design/img/favicon/favicon.ico'); ?>">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-config" content="<?php getFrontEndFile('/design/img/favicon/browserconfig.xml'); ?>">
    <meta name="theme-color" content="#ffffff">

    <meta http-equiv="content-language" content="<?php echo get_og_locale(); ?>">
    <?php if (c('multilanguage-enabled')) {includecached('parts/header/header-alternate-links.php', get_the_ID());} ?>

    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
    <link rel="canonical" href="<?php echo "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>">

    <link href="<?php getFrontEndFile(IsProEnvironment() ? '/design/css/main.css' : '/design/css/main-dev.css'); ?>" rel="stylesheet">

    <?php if (!IsProEnvironment()) { ?>
    <meta name="robots" content="noindex,nofollow" />
    <meta name="isdev" content="<?php echo IsLocalEnvironment(); ?>">
    <meta name="istest" content="<?php echo IsTestEnvironment(); ?>">
    <meta name="ispro" content="<?php echo IsProEnvironment(); ?>">
    <?php } ?>

    <?php /* custom fonts */ ?>
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet">

    <?php includecached('parts/header/header-structured-data-info.php'); ?>
    <?php if (c('search-enabled')) {includecached('parts/header/header-structured-data-searchbox.php');} ?>

    <?php includecached('parts/header/header-og-tags.php', get_the_ID()); ?>

    <meta name="wiver-version" content="<?php echo c('version'); ?>">

    <?php if (useWpHeadWpFooter()) {wp_head();} ?>

</head>

<body>
    <?php if (IsTestEnvironment()) {ShowEnvironmentWarning();} ?>

    <?php if (!c('splash-enabled')) { ?>
    <header>
        <?php include 'parts/header/header-navigation.php'; ?>
    </header>
    <?php includecached('parts/header/header-breadcrumb.php', get_the_ID()); ?>
    <?php } ?>