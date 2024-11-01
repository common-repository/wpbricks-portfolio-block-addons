<?php
/**
 * Plugin Name: WPBricks Portfolio Block Addons
 * Version: 1.4
 * Author: theDotstore
 * Author URI: https://profiles.wordpress.org/dots
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: wpbricks-portfolio-block-addons
 * Description: Create an effective and dynamic portfolio block with different category filter it.
 * @link: https://www.thedotstore.com/
 * @since: 1.0
 */


defined( 'ABSPATH' ) || exit;

if ( ! defined( 'WPBRICKS_PORTFOLIO_VERSION' ) ) {
	define( 'WPBRICKS_PORTFOLIO_VERSION', '1.4' ); // Plugin version
}
if ( ! defined( 'WPBRICKS_PORTFOLIO_PLUGIN_PATH' ) ) {
	define( 'WPBRICKS_PORTFOLIO_PLUGIN_PATH', plugin_dir_url( __FILE__ ) ); // Plugin version
}

/**
 * Enqueue the block's assets for the editor.
 *
 * @since 1.0.0
 */

register_activation_hook( __FILE__, 'wpbricks_portfolio_block_activation_hook');
/**
 * Call the function when plugin activate.
 *
 * @since 1.0
 */
function wpbricks_portfolio_block_activation_hook() {
	if ( in_array( 'wpbricks/wpbricks.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
		if ( is_plugin_installed( 'wpbricks' ) && ! is_plugin_active( 'wpbricks/wpbricks.php' ) ) {
			$initial_check = 'installed';
		} else if ( is_plugin_installed( 'wpbricks' ) && is_plugin_active( 'wpbricks/wpbricks.php' ) ) {
			$initial_check = 'yes';
		}
	} else {
		$initial_check = 'no';
	}
	update_option( 'wpbricks_portfolio_initial_check', $initial_check );
	update_option( 'wpbricks_portfolio_initial_notice', 'yes' );
}

add_action( 'admin_notices', 'wpbricks_portfolio_block_register_notices' );
/**
 * Register notice when active plugin.
 *
 * @since 1.0
 */
function wpbricks_portfolio_block_register_notices() {
	$initial_check = get_option( 'wpbricks_portfolio_initial_notice' );
	if ( ( 'no' != $initial_check ) ) {?>
	    <div id="wpbricks-portfolio-message" class="notice is-dismissible notice-info wpbricks-portfolio-message-cls"
	         data-repeat-notice-after="">
	        <div class="notice-container">
	            <div class="notice-image">
	                <img src="<?php echo esc_url( WPBRICKS_PORTFOLIO_PLUGIN_PATH. "assets/Bricks_Logo_icon.svg" ); ?>"
	                     class="custom-logo"
	                     alt="Portfolio Addon for WPBricks">
	            </div>
	            <div class="notice-content">
					<?php
					if ( ( 'no' === $initial_check ) || ( 'installed' === $initial_check ) ) {
						?>
	                    <h2 class="notice-heading">
							<?php esc_html_e( 'Portfolio Block Addons plugin required WPBricks Manager plugin', 'wpbricks-portfolio-block-addons' ); ?>
	                    </h2>
						<?php
					} else {
						?>
	                    <h2 class="notice-heading">
							<?php esc_html_e( 'Thank you for installing WPBricks Portfolio Block Addons!', 'wpbricks-portfolio-block-addons' ); ?>
	                    </h2>
						<?php
					}
					?>
					<p>
	                <?php
						echo  sprintf(
							wp_kses(
								__( 'Portfolio Addons perfectly work with the <a href="https://wordpress.org/themes/wpbricks/" target="_blank">WPBricks theme</a> and <a href="https://wordpress.org/plugins/wpbricks/" target="_blank">WPBricks Manager Plugin</a>. It provides 100+ readymade Custom Gutenberg blocks design options to build awesome websites with just a few clicks.', 'wpbricks-portfolio-block-addons' ),
								array(
								    'a' => array(
								        'href' => array(),
								        'target' => array()
								    ),
								)
							)
						) ;
					?>
					</p>
	                <div class="wpbricks-portfolio-review-notice-container">
						<?php
						if ( 'no' === $initial_check ) {
							?>
	                        <a class="wpbricks-portfolio-install-recommended-plugin button button-primary"
	                           href="javascript:void(0);" data-slug="wpbricks" data-init="/wpbricks/wpbricks.php">
								<?php esc_html_e( 'Install WPBricks Manager Plugin', 'wpbricks-portfolio-block-addons' ); ?>
	                        </a>
							<?php
						} else if ( 'installed' === $initial_check ) {
							?>
	                        <a class="wpbricks-portfolio-activate-recommended-plugin button button-primary"
	                           href="javascript:void(0);" data-slug="wpbricks" data-init="/wpbricks/wpbricks.php">
								<?php esc_html_e( 'Install WPBricks Manager Plugin', 'wpbricks-portfolio-block-addons' ); ?>
	                        </a>
							<?php
						} else {
							$url = add_query_arg(
								array(
									'page' => 'bricks-manager',
									'tab'  => 'addons_lib',
								),
								admin_url( 'index.php' )
							);
							?>
	                        <a class="button button-primary"
	                           href="<?php echo esc_url( $url ); ?>">
								<?php esc_html_e( 'WPBricks Addons', 'wpbricks-portfolio-block-addons' ); ?>
	                        </a>
							<?php
						}
						?>
	                </div>
	            </div>

	        </div>
	    </div>
		<?php
	}
}

function wpbricks_portfolio_block_backend_enqueue() {
	wp_enqueue_script(
		'wpbricks-portfolio-block-backend-script',
		plugins_url( 'js/block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' )
	);
}

add_action( 'enqueue_block_editor_assets', 'wpbricks_portfolio_block_backend_enqueue' );


add_action( 'admin_enqueue_scripts', 'wpbricks_portfolio_admin_enqueue' );
/**
 * Enquque block editor assets.
 *
 * @since 1.0
 */
function wpbricks_portfolio_admin_enqueue() {

	/*wp_enqueue_script(
		'wpbricks-portfolio-isotope-backend-script',
		plugins_url( 'js/isotope.min.js', __FILE__ ),
		array()
	);*/

	wp_enqueue_script(
		'wpbricks-portfolio-admin-script',
		plugins_url( 'js/wp-admin-custom.js', __FILE__ ),
		array('jquery', 'wp-util', 'updates'),
		'1.0.0',
		false
	);

	wp_enqueue_style(
		'wpbricks-portfolio-admin-style-css',
		plugins_url( 'css/wpbricks-portfolio-admin.css', __FILE__ ),
		array(),
		''
	);

	wp_localize_script(
		'wpbricks-portfolio-admin-script',
		'portfolioNotices',
		array(
			'ajaxUrl'                              => admin_url( 'admin-ajax.php' ),
			'wpbricks_portfolio_notice_nonce'      => wp_create_nonce( 'portfolioaddon-notices' ),
			'wpbricks_portfolio_recommand_nonce'   => wp_create_nonce( 'portfolioaddon-recommand' ),
			'WPBricksSitesLink'                    => admin_url( 'admin.php?page=bricks-manager&tab=addons_lib' ),
			'WPBricksSitesLinkTitle'               => __( 'WPBricks Addons', 'wpbricks-portfolio-block-addons' ),
			'WPBricksSitesLinkTitleRecommandation' => __( 'Try one of our WPBricks Addon', 'wpbricks-portfolio-block-addons' ),
			'recommendedPluiginInstallingText'     => __( 'Installing', 'wpbricks-portfolio-block-addons' ) . '&hellip;',
			'recommendedPluiginActivatingText'     => __( 'Activating', 'wpbricks-portfolio-block-addons' ) . '&hellip;',
		)
	);
}

add_action( 'wp_ajax_wpbricks_portfolio_notice_dismiss', 'wpbricks_portfolio_notice_dismiss' );
/**
 * Dismiss plugin notice click on close icon.
 *
 * @since 1.0
 */
function wpbricks_portfolio_notice_dismiss() {
	$nonce = filter_input( INPUT_POST, 'nonce', FILTER_SANITIZE_STRING );
	if ( false === wp_verify_nonce( $nonce, 'portfolioaddon-notices' ) ) {
		wp_send_json_error( esc_html_e( 'Some issue with nonce.', 'wpbricks-portfolio-block-addons' ) );
	}
	$check_update = update_option( 'wpbricks_portfolio_initial_notice', 'no' );
	if ( $check_update ) {
		wp_send_json_success();
	}
	wp_die();
}

add_action( 'wp_ajax_wpbricks_portfolio_recommedade_plugin', 'wpbricks_portfolio_recommedade_plugin' );
/**
 * Call th plugin action when plugin install, activate.
 *
 * @since 1.0
 */
function wpbricks_portfolio_recommedade_plugin() {
	$init = filter_input( INPUT_POST, 'init', FILTER_SANITIZE_STRING );
	if ( ! current_user_can( 'install_plugins' ) || ! isset( $init ) || ! $init ) {
		wp_send_json_error(
			array(
				'success' => false,
				'message' => __( 'No plugin specified', 'wpbricks-portfolio-block-addons' ),
			)
		);
	}
	$plugin_init = ( isset( $init ) ) ? esc_attr( $init ) : '';
	$activate    = activate_plugin( $plugin_init, '', false, true );
	if ( is_wp_error( $activate ) ) {
		wp_send_json_error(
			array(
				'success' => false,
				'message' => $activate->get_error_message(),
			)
		);
	}
	wp_send_json_success(
		array(
			'success' => true,
			'message' => __( 'Plugin Successfully Activated', 'wpbricks-portfolio-block-addons' ),
		)
	);
}
/**
 * Check plugin installed or not.
 *
 * @param $slug
 *
 * @return bool
 *
 * @since 1.0.0
 */
if ( ! function_exists( 'is_plugin_installed' ) ) {
	function is_plugin_installed( $slug ) {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$all_plugins = get_plugins();

		if ( ! empty( $all_plugins[ $slug ] ) ) {
			return true;
		} else {
			return false;
		}
	}
}

if ( in_array( 'wpbricks/wpbricks.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
	$initial_check = 'yes';
} else {
	if ( is_plugin_installed( 'wpbricks/wpbricks.php' ) && ! is_plugin_active( 'wpbricks/wpbricks.php' ) ) {
		$initial_check = 'installed';
	} else {
		$initial_check = 'no';
	}
}
update_option( 'wpbricks_portfolio_initial_check', $initial_check );
$initial_check = get_option( 'wpbricks_portfolio_initial_check' );
if ( 'yes' === $initial_check ) {
	include_once plugin_dir_path( __FILE__ ) . 'includes/wpbricks-portfolio-block-addons-init.php';
}

