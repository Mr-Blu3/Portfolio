<?php
/**
 * The sidebar containing the main widget area.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Shapely
 */ ?>
    
<?php
if ( ! is_active_sidebar( 'sidebar-1' ) || ( function_exists('shapely_show_sidebar') && !shapely_show_sidebar() ) ) {
	return;
}
?>
