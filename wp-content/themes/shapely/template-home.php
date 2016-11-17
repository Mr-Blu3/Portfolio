<?php
    /**
    * Template Name: Front Page
    */
?>  

<?php get_header(); ?>
<div class="bg-header"><?php
    if ( !function_exists('dynamic_sidebar')  || !dynamic_sidebar( 'sidebar-home' ) ):  ?>  
        <div class="container p24 wp-caption-text"><h5><?php _e('This is the "Home Sidebar Section", add some widgets to it to change it.', 'shapely'); ?></h5>  
        </div>
    <?php endif; ?>
	<div class="vert-mid top-parallax-section">
		<div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 text-center">
			<h1>Utvecklare Pontus Pettersson</h1>
			<p class="mb32">Frontend Utvecklare/Grafisk Designer</p>
			<a class="btn btn-lg btn-white" href="#mina-projekt">Mina Projekt</a>
		</div>
    </div>
</div>

<div class="container">
	<div class="vert-mid top-parallax-section">		          
		<ul class="no-sidebar full-width">
			<li>
				<img src=<?= get_site_url().'/wp-content/uploads/2016/10/IMG_0203-300x225.jpg' ?>>
			</li>
			<li>
				<p>
					Jag har goda kunskaper inom e-handel så som omnichannel, hur m-handeln fungerar, olika e-handelsystem, digital marknadsföring, systemstöd,  tredjepartssystem och seo. Jag tror säkerligen mina kunskaper kan komma till nytta när jag börjar arbeta hos er (se gärna mitt bifogade cv).
				</p>
			</li>     
		</ul>
	</div>
</div>

<div class="bg-header">
	<div class="vert-mid top-parallax-section">
		<div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 text-center">
			<h1>Data/It</h1>
			<p class="mb32">Utbildningen på medieinstitutet (webbutveckling inom e-handel) har gett mig goda kunskaper om webbutveckling och responsiv webbutveckling samt mycket mer.
			</p>
			<a class="btn btn-lg btn-white" href=<?= get_site_url()."/om-mig/" ?>>Om mig</a>
		</div>
    </div>
</div>

<div class="bg-grey">
	<div class="c-black vert-mid top-parallax-section">
		<div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 text-center">
			<h1>Blogg under utveckling</h1>
			<a class="btn btn-lg btn-filled" href="#">Blogg</a>	
			<img class="cast-shadow" alt="Limitless Options" src="https://colorlib.com/flexible/wp-content/uploads/sites/12/2016/03/photo-1440557653082-e8e186733eeb-1.jpg">
		</div>
    </div>
</div>

<div id="mina-projekt" class="bg-black">
	<h1>Mina Projekt</h1>
	<p class="mb32">Av Pontus Pettersson</p>
	
	<?php echo do_shortcode('[responsive-portfolio]'); ?>
</div>


<?php get_footer(); ?>
