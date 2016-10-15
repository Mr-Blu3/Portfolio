<?php
/**
 * Baskonfiguration för WordPress.
 *
 * Denna fil används av wp-config.php-genereringsskript under installationen.
 * Du behöver inte använda webbplatsen, du kan kopiera denna fil direkt till
 * "wp-config.php" och fylla i värdena.
 *
 * Denna fil innehåller följande konfigurationer:
 *
 * * Inställningar för MySQL
 * * Säkerhetsnycklar
 * * Tabellprefix för databas
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL-inställningar - MySQL-uppgifter får du från ditt webbhotell ** //
/** Namnet på databasen du vill använda för WordPress */
define('DB_NAME', 'mini_portfolio');

/** MySQL-databasens användarnamn */
define('DB_USER', 'root');

/** MySQL-databasens lösenord */
define('DB_PASSWORD', 'PoppeJS66?');

/** MySQL-server */
define('DB_HOST', 'localhost');

/** Teckenkodning för tabellerna i databasen. */
define('DB_CHARSET', 'utf8mb4');

/** Kollationeringstyp för databasen. Ändra inte om du är osäker. */
define('DB_COLLATE', '');

/**#@+
 * Unika autentiseringsnycklar och salter.
 *
 * Ändra dessa till unika fraser!
 * Du kan generera nycklar med {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * Du kan när som helst ändra dessa nycklar för att göra aktiva cookies obrukbara, vilket tvingar alla användare att logga in på nytt.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'pHg5}{4p7$_h0lz;c?%UsjDCPDFoc_V#0E}v)P8+Z@1<x9P,j+`*UDkGtuwH4~Rn');
define('SECURE_AUTH_KEY',  ']SlS,dlx5Fr>X70Q_UXxUHW9LRi7Efl1v3NM]y+~p+9^Wf[7l@ N_$iaWXT4<w3`');
define('LOGGED_IN_KEY',    '1+HRE,S#2t.1Ih2m:%S;o}g!8sa}ccEG$T8#bduAquRuqc:e%0prqJ3H._Jn{#C$');
define('NONCE_KEY',        '^9Fg8,n2okK@^%rU^Vo<W2Z34]W`U0pDkns!)T8lMaLHJ_x`*F?kPERjE[oP>HZ:');
define('AUTH_SALT',        'mE`1ZVR@$s]CH7a>rDGsSY`L1$0Ha&$unDc)9$_TbEy=`o{ApoAQY>O;..j%s?Z+');
define('SECURE_AUTH_SALT', '8sVZ5(^:}G#!9V yF1tq.;f>`^V)fWiAYI^)iTL,@QaN^hD7SP<!#KDT_TpUk&!K');
define('LOGGED_IN_SALT',   '<awP>>b>v_wD:3nN9;VQCersT*YIu)/AKYb(/Zr-&VdS4Sn_|3b8bZ!G~61XKt&Z');
define('NONCE_SALT',       'G2gD^2ujG-K]!np<59j>|TTNv_9|rQ1@}X8tD*P VYE)fTHXgcY$~WG9%h&lUwV1');

/**#@-*/

/**
 * Tabellprefix för WordPress Databasen.
 *
 * Du kan ha flera installationer i samma databas om du ger varje installation ett unikt
 * prefix. Endast siffror, bokstäver och understreck!
 */
$table_prefix  = 'wp_';

/** 
 * För utvecklare: WordPress felsökningsläge. 
 * 
 * Ändra detta till true för att aktivera meddelanden under utveckling. 
 * Det är rekommderat att man som tilläggsskapare och temaskapare använder WP_DEBUG 
 * i sin utvecklingsmiljö. 
 *
 * För information om andra konstanter som kan användas för felsökning, 
 * se dokumentationen. 
 * 
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */ 
define('WP_DEBUG', false);

/* Det var allt, sluta redigera här! Blogga på. */

/** Absoluta sökväg till WordPress-katalogen. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Anger WordPress-värden och inkluderade filer. */
require_once(ABSPATH . 'wp-settings.php');