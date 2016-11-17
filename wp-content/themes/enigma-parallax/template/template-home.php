<?php
    /**
    * Template Name: Front Page
    */
?>  

<?php 

if (is_front_page()) :

	get_header();
		ShowTemplate([
			'home-slideshow',
			'home-services',
			'home-team',
			'home-resume',
			'home-portfolio',
			'home-contact'
		]);

	get_footer(); 
endif;
?>
