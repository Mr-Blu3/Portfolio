<!DOCTYPE html>
<!--[if lt IE 7]>
    <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
    <!--[if IE 7]>
    <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
    <!--[if IE 8]>
    <html class="no-js lt-ie9"> <![endif]-->
    <!--[if gt IE 8]><!-->
<html <?php language_attributes(); ?>><!--<![endif]-->
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <meta charset="<?php bloginfo('charset'); ?>" />	
	<?php $wl_theme_options = enigma_parallax_get_options(); ?>
	<link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" type="text/css" media="screen" />	
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div>
	<!-- Header Section -->
	<div class="top_fix">
	<div class="header_section affix-top transition">
		<div class="container" id="header">
			<!-- Logo & Contact Info -->
			<div class="row ">
				<div class="col-md-6 col-sm-12 wl_rtl" >					
					<div claSS="logo">						
					<a href="<?php echo esc_url(home_url( '/' )); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
					<?php if($wl_theme_options['upload_image_logo']){ ?>
						<img class="img-responsive" src="<?php echo esc_url($wl_theme_options['upload_image_logo']); ?>" style="height:<?php if($wl_theme_options['height']!='') { echo $wl_theme_options['height']; }  else { "80"; } ?>px; width:<?php if($wl_theme_options['width']!='') { echo $wl_theme_options['width']; }  else { "200"; } ?>px;" />
						<?php } else {
							echo get_bloginfo('name');
						} ?>
					</a>
					<p><?php bloginfo( 'description' ); ?></p>
					</div>
				</div>
				<?php if($wl_theme_options['header_social_media_in_enabled']=='1') { ?>
				<div class="col-md-6 col-sm-12">
				<?php if($wl_theme_options['email_id'] || $wl_theme_options['phone_no'] !='') { ?>
				<ul class="head-contact-info">
						<?php if($wl_theme_options['email_id'] !='') { ?><li><i class="fa fa-envelope"></i><a href="mailto:<?php echo $wl_theme_options['email_id']; ?>"><?php echo esc_attr($wl_theme_options['email_id']); ?></a></li><?php } ?>
						<?php if($wl_theme_options['phone_no'] !='') { ?><li><i class="fa fa-phone"></i><a href="tel:<?php echo $wl_theme_options['phone_no']; ?>"><?php echo esc_attr($wl_theme_options['phone_no']); ?></a></li><?php } ?>
				</ul>
				<?php } ?>	
				</div>
				<?php } ?>
			</div>
			<!-- /Logo & Contact Info -->
		</div>	
	</div>	
	<!-- /Header Section -->
	<!-- Navigation  menus -->
	<div class="navigation_menu transition"  data-spy="affix" data-offset-top="95" id="enigma_nav_top">
		<span id="header_shadow"></span>
		<div class="container navbar-container" >
			<nav class="navbar navbar-default " role="navigation">
				<div class="navbar-header">
					
				</div>
				<div id="menu" class="collapse navbar-collapse ">	
				<?php wp_nav_menu( array(
						'theme_location' => 'primary',
						'menu_class' => 'nav navbar-nav',
						'fallback_cb' => 'enigma_parallax_fallback_page_menu',
						'walker' => new enigma_parallax_nav_walker(),
						)
						);	?>				
				</div>	
			</nav>
		</div>
	</div>
	</div>