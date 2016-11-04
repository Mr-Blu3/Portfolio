<?php
/*
Plugin Name: Seos Form Plugin
Plugin URI: http://seosthemes.com/seos-contact-form/
Description: Simple WordPress Contact Form. Seos Contact Form is easy to use with all the basic fields – Name, Phone Number, Email, Subject, Message. Seos Contact Form allows you to select the required fields, Custom text – Contact Form Title, Custom text – Required, Custom text – Your message is send, Custom text – Your message is not senа Admin Email, Shortcode – Include form in your website.
Version: 1.04
Contributors: seosbg
Author: seosbg
Author URI: http://seosthemes.com/
*/

function seos_form_html() {
 $seos_required = esc_attr( get_option('seos_required')) ;
 $required1 = esc_attr( get_option('required1'));
 $required2 = esc_attr( get_option('required2'));
 $required3 = esc_attr( get_option('required3'));
 $required4 = esc_attr( get_option('required4'));
 $required5 = esc_attr( get_option('required5'));
 $rand = (isset($_POST['rand']) ? $_POST['rand'] : null); 
 $text = (isset($_POST['text']) ? $_POST['text'] : null); 	
 $numb = 10;
 $sum = ($numb + $rand);
 $error = "";

 function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}

	if( get_option('seos_form_title')){echo "<h1>" . get_option('seos_form_title') . "</h1>"; }
		else{
	echo "<h1>Contact form</h1>";
	}
	
?> <div id="send"></div> <?php

	echo '<form action="' . esc_url( $_SERVER['REQUEST_URI'] ) . '" method="post">';

if( get_option('seos_form_name') != ""){	

	echo '<p>';
	echo  '' . esc_attr( get_option('seos_form_name') ) . ' ' . '<br/>'; 
	echo '<input type="text" name="seos-name" value="' . ( test_input(isset( $_POST["seos-name"] )) ? esc_attr( $_POST["seos-name"] ) : '' ) . '" size="50" />';
	if(empty($_POST["seos-name"]) and $required1 != "") { $error = true;}
	if( $required1) {echo ' ' . $seos_required;}
	echo '</p>';
}	

if( get_option('seos_form_phone') != ""){	
	echo '<p>';
	echo  '' . esc_attr( get_option('seos_form_phone') )  . ' ' . '<br/>'; 
	echo '<input type="text" name="seos-phone" pattern="[0-9 ]+" value="' . (test_input( isset( $_POST["seos-phone"] )) ? esc_attr( $_POST["seos-phone"] ) : '' ) . '" size="50" />';
	if(empty($_POST["seos-phone"]) and $required2 != "") { $error = true;}
	if($required2) {echo ' ' . $seos_required;}
	echo '</p>';
}
	
if( get_option('seos_form_email') != ""){	
	echo '<p>';
	echo '' . esc_attr( get_option('seos_form_email') )  . ' ' . '<br/>'; 
	echo '<input type="email" name="seos-email" value="' . (test_input( isset( $_POST["seos-email"] )) ? esc_attr( $_POST["seos-email"] ) : '' ) . '" size="50" />';
	if(empty($_POST["seos-email"]) and $required3 != "") { $error = true;}
	if($required3) {echo ' ' . $seos_required;}
	echo '</p>';
}	

if( get_option('seos_form_subject') != ""){		
	echo '<p>';
	echo '' . esc_attr( get_option('seos_form_subject') ) . ' ' . '<br/>'; 
	echo '<input type="text" name="seos-subject" value="' . (test_input( isset( $_POST["seos-subject"] )) ? esc_attr( $_POST["seos-subject"] ) : '' ) . '" size="50" />';
	if(empty($_POST["seos-subject"]) and $required4 != "") { $error = true;}
	if($required4) {echo ' ' . $seos_required;}
	echo '</p>';
}	

if( get_option('seos_form_message') != ""){		
	echo '<p>';
	echo '' . esc_attr( get_option('seos_form_message') )  . ' ' . '<br/>'; 
	echo '<textarea rows="10" cols="50" name="seos-message">' . (test_input( isset( $_POST["seos-message"] )) ? esc_attr( $_POST["seos-message"] ) : '' ) . '</textarea>';
	if(empty($_POST["seos-message"])and $required5 != "") { $error = true;}
	if($required5) {echo ' ' . $seos_required;}
	echo '</p>';
}	

	echo '<p>';
	echo '' . esc_attr( get_option('seos_form_antispam') )  . ' ' . '<br/>'; 
	echo  '<input class="noselect" type="text" name="rand" value="' . rand(1,10). '+10' . '" readonly="readonly" />' ;
	if ( get_option('seos_spam')){ echo  '<label>'. ' ' . esc_attr( get_option('seos_spam') ). ' ' . '</label>';}
	else {echo  '<label> Enter the SUM: </label>';}
	echo  '<input type="text" name="text" value="" />';
	if(isset($_POST['text']) && ($sum != $text) or empty($_POST['text']) ) { $error = true; echo ' ' . $seos_required;}
	echo '</p>';
	
	if ( get_option('seos_send_button')){ echo '<p><input type="submit" name="seos-submitted" value="' . esc_attr( get_option('seos_send_button')) . '"></p>';}
	else {echo '<p><input type="submit" name="seos-submitted" value="Send"></p>';}
	
	echo '</form>';
	
$to = $subject  = $message = $headers ="";

	if ( isset( $_POST['seos-submitted'] ) and $error == false) {

		$name    = sanitize_text_field( $_POST["seos-name"] );
		$email   = sanitize_email( $_POST["seos-email"] );
		$subject = sanitize_text_field( $_POST["seos-subject"] );
		$message = "Seos Contact Form" . "\n\n";
		$message .= 'From: ' . $name . "\n\n";
		$message .= 'Subject: ' . $subject . "\n\n";
		$message .= 'Message: ' . esc_textarea( $_POST["seos-message"] ) . "\n\n";
		$message .= 'Phone: ' . esc_textarea( $_POST["seos-phone"] );
		$to = get_option('seos_admin_email');
		$headers = "From: $name <$email>" . "\r\n";

	}
		if ( wp_mail( $to, $subject, $message, $headers) and $_POST['seos-submitted']) {
			echo '<div>';
			if (get_option('seos_send')) {?> <script>document.getElementById("send").innerHTML = '<?php echo '<h1 style=\"color: #FF0000;\">' . esc_attr( get_option('seos_send')) . '</h1>' ; ?>' ;</script> <?php
			echo '</div>';} else { 
			?>
				<script>document.getElementById("send").innerHTML = "<h1 style=\"color: #FF0000;\">Your message is send</h1>"; </script>
			<?php }	
		} 
		elseif 
		( !wp_mail( $to, $subject, $message, $headers) and  isset($_POST['seos-submitted'])) {
			echo '<div>';
			if (get_option('seos_not_send')) {?> <script>document.getElementById("send").innerHTML = '<?php echo '<h1 style=\"color: #FF0000;\">' . esc_attr( get_option('seos_not_send')) . '</h1>' ; ?>' ;</script> <?php
			echo '</div>';} else { 
			?>
				<script>document.getElementById("send").innerHTML = "<h1 style=\"color: #FF0000;\">Your message is not sent.</h1>"; </script> 
			<?php }
}
}

function seos_shortcode() {
	ob_start();
	seos_form_html();
	return ob_get_clean();
}

add_shortcode( 'seos_form', 'seos_shortcode' );


// ************* User Section **************


add_action('admin_menu', 'my_plugin_menu');

function my_plugin_menu() {
	add_menu_page('Seos Contact Form', 'Seos Contact Form', 'administrator', 'seos-form-plugin-settings', 'my_plugin_settings_page', plugins_url( 'seos-contact-form/images/icon.png' ));
}


function my_plugin_settings_page() {
?>

<div class="seos-form-wrap">
   
	<h1>Seos Contact Form</h1>
	
    <a href="http://seosthemes.com/seos-contact-form/"><button type="button" class="button button-primary">How to use - Seos Contact Form</button></a>
   
	<form method="post" action="options.php">
	
		<?php settings_fields( 'seos-form-plugin-settings-group' ); ?>
		<?php do_settings_sections( 'seos-form-plugin-settings-group' ); ?>
		
		 <table class="form-table">
		 
			<tr valign="top">
				<th scope="row">Custom text - Contact Form Title:</th>
				<td><input type="text" name="seos_form_title" value="<?php echo esc_attr( get_option('seos_form_title') ); ?>" /></td>
			</tr>

			<tr valign="top">
				<th scope="row">Custom text - Required:</th>
				<td><input type="text" name="seos_required" value="<?php echo esc_attr( get_option('seos_required') ); ?>" /></td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Custom text - Your message is send:</th>
				<td><input type="text" name="seos_send" value="<?php echo esc_attr( get_option('seos_send') ); ?>" /></td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Custom text - Your message is not sent:</th>
				<td><input type="text" name="seos_not_send" value="<?php echo esc_attr( get_option('seos_not_send') ); ?>" /></td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Admin Email: </th>
				<td><input type="text" name="seos_admin_email" value="<?php echo esc_attr( get_option('seos_admin_email') ); ?>" /></td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Custom text Antispam - Enter the SUM: </th>
				<td><input type="text" name="seos_spam" value="<?php echo esc_attr( get_option('seos_spam') ); ?>" /></td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Custom text - Send Button: </th>
				<td><input type="text" name="seos_send_button" value="<?php echo esc_attr( get_option('seos_send_button') ); ?>" /></td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Shortcode - Include form in your website: </th>
				<td> <?php echo "<textarea cols=\"9\" rows=\"1\" readonly>[seos_form]</textarea> "; ?></td>
			</tr>
			
		</table>
		
			<h3>Each field activates when you insert text.</h3>
		
		<table class="form-table">
		
			<tr valign="top">
				<th scope="row">Name - Custom text</th>
				<td>
				<input type="text" name="seos_form_name" value="<?php echo esc_attr( get_option('seos_form_name') ); ?>" />
				<?php $required1 = esc_attr( get_option('required1')); ?>
				<span>If checked the field is required. </span>
				<input type="checkbox" name="required1" value="1"<?php checked( 1 == $required1); ?> />
				</td>
			</tr>
			 
			<tr valign="top">
				<th scope="row">Phone Number - Custom text</th>
				<td>
				<input type="text" name="seos_form_phone" value="<?php echo esc_attr( get_option('seos_form_phone') ); ?>" />
				<?php $required2 = esc_attr( get_option('required2')); ?>
				<span>If checked the field is required. </span>
				<input type="checkbox" name="required2" value="2"<?php checked( 2 == $required2); ?> />
				</td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Email - Custom text</th>
				<td><input type="text" name="seos_form_email" value="<?php echo esc_attr( get_option('seos_form_email') ); ?>" />
				<?php $required3 = esc_attr( get_option('required3')); ?>
				<span>If checked the field is required. </span>
				<input type="checkbox" name="required3" value="1"<?php checked( 1 == $required3); ?> />
				</td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Subject - Custom text</th>
				<td><input type="text" name="seos_form_subject" value="<?php echo esc_attr( get_option('seos_form_subject') ); ?>" />
				<?php $required4 = esc_attr( get_option('required4')); ?>
				<span>If checked the field is required. </span>
				<input type="checkbox" name="required4" value="1"<?php checked( 1 == $required4); ?> />
				</td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Your Message - Custom text</th>
				<td><input type="text" name="seos_form_message" value="<?php echo esc_attr( get_option('seos_form_message') ); ?>" />
				<?php $required5 = esc_attr( get_option('required5')); ?>
				<span>If checked the field is required. </span>
				<input type="checkbox" name="required5" value="1"<?php checked( 1 == $required5); ?> />
				</td>
			</tr>
		</table>
		
		<?php submit_button(); ?>

	</form>

<!---------------------------- Input code ---------------------------->

<strong>Your form input code.</strong>
<?php

	if( get_option('seos_form_title')){echo "<h1>" . get_option('seos_form_title') . "</h1>"; }
		else{
	echo "<h1>Contact form</h1>";
	}
	
echo '<form action="' . esc_url( $_SERVER['REQUEST_URI'] ) . '" method="post">';

if( get_option('seos_form_name') != ""){	

	echo '<p>';
	echo  '' . esc_attr( get_option('seos_form_name') ) . ' ' . '<br/>'; 
	echo '<input type="text" name="seos-name" pattern="[a-zA-Z0-9 ]+" value="' . ( isset( $_POST["seos-name"] ) ? esc_attr( $_POST["seos-name"] ) : '' ) . '" size="50" readonly/>';
	echo '</p>';
	
}	

if( get_option('seos_form_phone') != ""){	
	echo '<p>';
	echo  '' . esc_attr( get_option('seos_form_phone') )  . ' ' . '<br/>'; 
	echo '<input type="text" name="seos-phone" pattern="[0-9 ]+" value="' . ( isset( $_POST["seos-phone"] ) ? esc_attr( $_POST["seos-phone"] ) : '' ) . '" size="50" readonly/>';
	echo '</p>';
}
	
if( get_option('seos_form_email') != ""){	
	echo '<p>';
	echo '' . esc_attr( get_option('seos_form_email') )  . ' ' . '<br/>'; 
	echo '<input type="email" name="seos-email" value="' . ( isset( $_POST["seos-email"] ) ? esc_attr( $_POST["seos-email"] ) : '' ) . '" size="50" readonly/>';
	echo '</p>';
}	

if( get_option('seos_form_subject') != ""){		
	echo '<p>';
	echo '' . esc_attr( get_option('seos_form_subject') ) . ' ' . '<br/>'; 
	echo '<input type="text" name="seos-subject" pattern="[a-zA-Z0-9 ]+" value="' . ( isset( $_POST["seos-subject"] ) ? esc_attr( $_POST["seos-subject"] ) : '' ) . '" size="50" readonly/>';
	echo '</p>';
}	

if( get_option('seos_form_message') != ""){		
	echo '<p>';
	echo '' . esc_attr( get_option('seos_form_message') )  . ' ' . '<br/>'; 
	echo '<textarea rows="10" cols="50" name="seos-message" readonly>' . ( isset( $_POST["seos-message"] ) ? esc_attr( $_POST["seos-message"] ) : '' ) . '</textarea>';
	echo '</p>';
}

	echo '<p>';
	echo '' . esc_attr( get_option('seos_form_antispam') )  . ' ' . '<br/>'; 
	echo  '<input class="noselect" type="text" name="rand" value="' . rand(1,10). '+10' . '" readonly="readonly" />' ;
    if ( get_option('seos_spam')){ echo  '<label>' . esc_attr( get_option('seos_spam') ). ' '. '</label>';} else
    {echo  '<label> Enter the SUM: </label>';}
    echo  '<input type="text" name="text" value="" readonly/>';
	echo '</p>';
	
	if ( get_option('seos_send_button')){ echo '<p><input type="submit" name="seos-submitted" value="' . esc_attr( get_option('seos_send_button')) . '"></p>';}
	else {echo '<p><input type="submit" name="seos-submitted" value="Send" readonly></p>';}
	echo '</form>';
	?>
</div>
<?php } ?>
<?php

add_action( 'admin_init', 'my_plugin_settings' );

function my_plugin_settings() {
	register_setting( 'seos-form-plugin-settings-group', 'seos_form_name' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_form_phone' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_form_email' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_form_message' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_form_subject' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_required' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_form_title' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_send' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_not_send' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_no_send' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_spam' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_send_button' );
	register_setting( 'seos-form-plugin-settings-group', 'required1' );
	register_setting( 'seos-form-plugin-settings-group', 'required2' );
	register_setting( 'seos-form-plugin-settings-group', 'required3' );
	register_setting( 'seos-form-plugin-settings-group', 'required4' );
	register_setting( 'seos-form-plugin-settings-group', 'required5' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_form_antispam' );
	register_setting( 'seos-form-plugin-settings-group', 'seos_admin_email' );
}

function seos_contact_form () {
echo "<style>

.seos-form-wrap th{
	font-size: 13px;
}

input:focus {
    background-color: yellow;
}

</style>
";
}
add_action('admin_head','seos_contact_form');