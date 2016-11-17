<!-- portfolio section -->
<div id="portfolio"></div>

<?php $wl_theme_options = enigma_parallax_get_options(); ?>
<div class="enigma_project_section" >
<?php if($wl_theme_options['port_heading'] !='') { ?>
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<div class="enigma_heading_title scrollimation scale-in">
					<h3><?php echo esc_attr($wl_theme_options['port_heading']); ?></h3>		
				</div>
			</div>
		</div>
	</div>
<?php } ?>	
	<div class="container">
		<div class="row" >
			<div id="enigma_portfolio_section" class="enima_photo_gallery scrollimation scale-in	">
				<?php echo do_shortcode('[responsive-portfolio]'); ?>
			</div>
		</div>
						
	</div>
</div>
<!-- /portfolio section -->