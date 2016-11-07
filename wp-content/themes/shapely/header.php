<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Shapely
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <link href='http://fonts.googleapis.com/css?family=Oleo+Script' rel='stylesheet' type='text/css'>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<!--[if IE]>
   <div style='position:absolute;top:0px;left:0px;width:100%;height:100%;background:white;padding-top:50%;text-align:center;'>
          This site is currently disabled for IE users
   </div>
<![endif]-->

<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'shapely' ); ?></a>
    <header id="masthead" class="site-header" role="banner">
        <div class="nav-container">
            <nav id="site-navigation" class="main-navigation" role="navigation">
                <div class="container nav-bar">
                        <div class="row">
                            <div class="module left site-title-container">
                                <a href=<?= home_url() ?>>
                                <img src=
                                <?= get_template_directory_uri(). '/inc/img/logo.png' ?>
                                class="logo"
                                >
                            </div>
                            <a href="#">
                            <div class="module widget-handle mobile-toggle right visible-sm visible-xs">
                                <i class="fa fa-bars"></i>
                            </div>
                            </a>
                            <div class="module-group right">
                                <div class="module left">
                                    <?php shapely_header_menu() ?>
                                </div>
                                <!--end of menu module-->
                                <div class="module widget-handle search-widget-handle left hidden-xs hidden-sm">
                                    <div class="search">
                                        <i class="fa fa-search"></i>
                                        <span class="title"><?php _e("Site Search", 'shapely'); ?></span>
                                    </div>
                                    <div class="function"><?php
                                        get_search_form(); ?>
                                    </div>
                                </div>
                            </div>
                            <!--end of module group-->
                        </div>
                </div>
            </nav><!-- #site-navigation -->
        </div>
    </header><!-- #masthead -->
    
    <div id="content" class="main-container">
        <?php ( is_page_template('template-home.php') ) ? '' : shapely_top_callout(); ?>
        <section class="content-area <?php echo ( get_theme_mod('top_callout', true ) ) ? '' : ' pt0 ' ?>">
          <div id="main" class="<?php echo ( !is_page_template( 'template-home.php' )) ? 'container': ''; ?>" role="main">
                <div class="row">
