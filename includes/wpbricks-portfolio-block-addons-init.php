<?php
/**
 * Define all global constants.
 *
 */
defined( 'ABSPATH' ) || exit;
if ( ! defined( 'WPBRICKS_PORTFOLIO_POSTTYPE' ) ) {
	define( 'WPBRICKS_PORTFOLIO_POSTTYPE', 'wpbricks_portfolio' );
}
if ( ! defined( 'WPBRICKS_PORTFOLIO_CAT' ) ) {
	define( 'WPBRICKS_PORTFOLIO_CAT', 'wpbricks_portfolio_cat' );
}
add_action( 'rest_api_init', 'wpbricks_portfolio_term_api_endpoints_register' );
/**
 * Register endpoint for get all terms from Portfolio post type.
 *
 * @since 1.0
 */
function wpbricks_portfolio_term_api_endpoints_register() {
	register_rest_route( 'wp/v2', 'wpbricks-portfolio-cats', array(
			'methods'  => 'GET',
			'callback' => 'wpbricks_portfolio_get_categories',
			'permission_callback' => '__return_true',
		)
	);
	register_rest_route( 'wp/v2', 'wpbricks-portfolio-posts', array(
			'methods'  => 'GET',
			'callback' => 'wpbricks_portfolio_get_posts',
			'permission_callback' => '__return_true',
		)
	);
}
/**
 * Get list of all categories from Portfolio post type.
 *
 * @since 1.0
 */
function wpbricks_portfolio_get_categories() {
	$return = array();
	// get all terms.
	$terms = get_terms( array(
			'taxonomy'   => array( 'wpbricks_portfolio_cat' ),
			'hide_empty' => true,
			'orderby' => 'id',
            'order' => 'ASC',
		)
	);
	// arrange term according to taxonomy.
	if ( $terms ) {
		foreach ( $terms as $term ) {
			$return[] = [
				'id'   => $term->term_id,
				'name' => html_entity_decode( $term->name ),
				'slug' => $term->slug,
			];
		}
	}
	return new WP_REST_Response( $return, 200 );
}
/**
 * Get list of all posts from Portfolio post type.
 *
 * @since 1.0
 */
function wpbricks_portfolio_get_posts() {
	$term                        = stripslashes( filter_input( INPUT_GET, 'term', FILTER_SANITIZE_STRING ) );
	$term                        = html_entity_decode( $term );
	$term                        = trim( $term, '"' );
	$taxonomies                  = [ 'wpbricks_portfolio_cat' ];
	$terms                       = isset( $term ) && ! empty( $term ) ? json_decode( $term, true ) : [];
	$args                        = [
		'post_type'              => 'wpbricks_portfolio',
		'posts_per_page'         => 100,
		'post_status'            => 'publish',
		'no_found_rows'          => true,
		'update_post_meta_cache' => false,
	];
	$latest_posts_tax_query_args = [ 'relation' => 'OR' ];
	if ( $taxonomies ) {
		foreach ( $taxonomies as $taxonomy ) {
			if ( count( $terms[ $taxonomy ] ) > 0 ) {
				$latest_posts_tax_query_args[] = [
					'taxonomy' => $taxonomy,
					'field'    => 'slug',
					'terms'    => $terms[ $taxonomy ],
				];
			}
		}
	}
	$count_latest_posts_query_args = count( $latest_posts_tax_query_args );
	if ( $count_latest_posts_query_args > 0 ) {
		$args['tax_query'] = $latest_posts_tax_query_args;
	}
	$related_posts_query = new WP_Query( $args );
	$post_arr            = array();
	$cnt                 = 0;
	if ( $related_posts_query ) {
		if ( $related_posts_query->have_posts() ) {
			while ( $related_posts_query->have_posts() ) {
				$related_posts_query->the_post();
				$post_arr[ $cnt ]['ID']              = get_the_ID();
				$post_arr[ $cnt ]['postTitle']       = html_entity_decode( get_the_title() );
				$portfolio_answer                    = get_the_content( get_the_ID() );
				$post_arr[ $cnt ]['portfolioAnswer'] = $portfolio_answer;
				$cnt ++;
			}
		}
	}
	return new WP_REST_Response( $post_arr, 200 );
}
add_action( 'init', 'wpbricks_portfolio_register_plugin_post_type' );
/**
 * Register Portfolio post type and taxonomies.
 *
 * @since 1.0
 */
function wpbricks_portfolio_register_plugin_post_type() {
	$labels = array(
		'name'                  => __( 'WPBricks Portfolio', 'wpbricks-portfolio-block-addons' ),
		'singular_name'         => __( 'WPBricks Portfolio', 'wpbricks-portfolio-block-addons' ),
		'menu_name'             => __( 'WPBricks Portfolio', 'wpbricks-portfolio-block-addons' ),
		'name_admin_bar'        => __( 'WPBricks Portfolio', 'wpbricks-portfolio-block-addons' ),
		'add_new'               => __( 'Add New', 'wpbricks-portfolio-block-addons' ),
		'add_new_item'          => __( 'Add New Portfolio', 'wpbricks-portfolio-block-addons' ),
		'new_item'              => __( 'New Portfolio', 'wpbricks-portfolio-block-addons' ),
		'edit_item'             => __( 'Edit Portfolio', 'wpbricks-portfolio-block-addons' ),
		'view_item'             => __( 'View Portfolio', 'wpbricks-portfolio-block-addons' ),
		'all_items'             => __( 'All Portfolio', 'wpbricks-portfolio-block-addons' ),
		'search_items'          => __( 'Search Portfolio', 'wpbricks-portfolio-block-addons' ),
		'parent_item_colon'     => __( 'Parent Portfolio:', 'wpbricks-portfolio-block-addons' ),
		'not_found'             => __( 'No portfolio found.', 'wpbricks-portfolio-block-addons' ),
		'not_found_in_trash'    => __( 'No portfolio found in Trash.', 'wpbricks-portfolio-block-addons' ),
		'featured_image'        => __( 'Portfolio Cover Image', 'wpbricks-portfolio-block-addons' ),
		'set_featured_image'    => __( 'Set cover image', 'wpbricks-portfolio-block-addons' ),
		'remove_featured_image' => __( 'Remove cover image', 'wpbricks-portfolio-block-addons' ),
		'use_featured_image'    => __( 'Use as cover image', 'wpbricks-portfolio-block-addons' ),
		'archives'              => __( 'Portfolio archives', 'wpbricks-portfolio-block-addons' ),
		'insert_into_item'      => __( 'Insert into portfolio', 'wpbricks-portfolio-block-addons' ),
		'uploaded_to_this_item' => __( 'Uploaded to this portfolio', 'wpbricks-portfolio-block-addons' ),
		'filter_items_list'     => __( 'Filter Portfolio list', 'wpbricks-portfolio-block-addons' ),
		'items_list_navigation' => __( 'Portfolio list navigation', 'wpbricks-portfolio-block-addons' ),
		'items_list'            => __( 'Portfolio list', 'wpbricks-portfolio-block-addons' ),
	);
	$args   = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'wpbricks_portfolio' ),
		'taxonomies'         => array( 'wpbricks_portfolio_cat' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 250,
		'menu_icon'          => 'dashicons-portfolio',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
	);
	register_post_type( 'wpbricks_portfolio', $args );
	$cat_labels = array(
		'name'                       => __( 'Categories', 'wpbricks-portfolio-block-addons' ),
		'singular_name'              => __( 'Categories', 'wpbricks-portfolio-block-addons' ),
		'search_items'               => __( 'Search Portfolio Categories' ),
		'popular_items'              => __( 'Popular Portfolio Categories' ),
		'all_items'                  => __( 'All Portfolio Categories' ),
		'parent_item'                => null,
		'parent_item_colon'          => null,
		'edit_item'                  => __( 'Edit Portfolio Categories' ),
		'update_item'                => __( 'Update Portfolio Categories' ),
		'add_new_item'               => __( 'Add New Portfolio Categories' ),
		'new_item_name'              => __( 'New Portfolio Categories Name' ),
		'separate_items_with_commas' => __( 'Separate Portfolio Categories with commas' ),
		'add_or_remove_items'        => __( 'Add or remove Portfolio Categories' ),
		'choose_from_most_used'      => __( 'Choose from the most used Portfolio Categories' ),
		'menu_name'                  => __( 'Categories' ),
	);
	register_taxonomy(
		'wpbricks_portfolio_cat',
		'wpbricks_portfolio',
		array(
			'hierarchical'          => true,
			'labels'                => $cat_labels,
			'show_ui'               => true,
			'show_admin_column'     => true,
			'update_count_callback' => '_update_post_term_count',
			'query_var'             => true,
			'rewrite'               => array( 'slug' => 'wpbricks_portfolio_cat' ),
		)
	);
}
/**
 * Render data.
 *
 * @since 1.0.0
 */
function wpbricks_portfolio_block_render_callback( $attributes ) {
	$portfolio_cat_show_type     = $attributes['portfolio_cat_show_type'];
	$portfolioCategory_arr       = array();
	$portfolio_tab_position      = '';
	$portfolio_tab_fontWeight    = '';
	$portfolio_tab_textUppercase = '';
	$portfolio_tab_FontColor     = '';
	$titleFontSize               = '';
	$descFontSize                = '';
	$portfolio_marginTop         = '';
	$portfolio_marginRight       = '';
	$portfolio_marginBottom      = '';
	$portfolio_marginLeft        = '';
	$portfolio_paddingTop        = '';
	$portfolio_paddingRight      = '';
	$portfolio_paddingBottom     = '';
	$portfolio_paddingLeft       = '';
	if ( $portfolio_cat_show_type ) {
		if ( array_key_exists( 'portfolioCategory', $attributes ) ) {
			$portfolioCategory_arr = $attributes['portfolioCategory'];
		}
	}
	if ( array_key_exists( 'portfolio_tab_position', $attributes ) ) {
		$portfolio_tab_position = $attributes['portfolio_tab_position'];
	}
	$portfolio_tab_fontSize = $attributes['portfolio_tab_fontSize'];
	if ( array_key_exists( 'portfolio_tab_fontWeight', $attributes ) ) {
		$portfolio_tab_fontWeight = $attributes['portfolio_tab_fontWeight'];
	}
	if ( array_key_exists( 'portfolio_tab_textUppercase', $attributes ) ) {
		$portfolio_tab_textUppercase = $attributes['portfolio_tab_textUppercase'];
	}
	if ( array_key_exists( 'portfolio_tab_FontColor', $attributes ) ) {
		$portfolio_tab_FontColor = $attributes['portfolio_tab_FontColor'];
	}
	if ( array_key_exists( 'titleFontSize', $attributes ) ) {
		$titleFontSize = $attributes['titleFontSize'];
	}
	if ( array_key_exists( 'descFontSize', $attributes ) ) {
		$descFontSize = $attributes['descFontSize'];
	}
	if ( array_key_exists( 'portfolio_marginTop', $attributes ) ) {
		$portfolio_marginTop = $attributes['portfolio_marginTop'];
	}
	if ( array_key_exists( 'portfolio_marginRight', $attributes ) ) {
		$portfolio_marginRight = $attributes['portfolio_marginRight'];
	}
	if ( array_key_exists( 'portfolio_marginBottom', $attributes ) ) {
		$portfolio_marginBottom = $attributes['portfolio_marginBottom'];
	}
	if ( array_key_exists( 'portfolio_marginLeft', $attributes ) ) {
		$portfolio_marginLeft = $attributes['portfolio_marginLeft'];
	}
	if ( array_key_exists( 'portfolio_paddingTop', $attributes ) ) {
		$portfolio_paddingTop = $attributes['portfolio_paddingTop'];
	}
	if ( array_key_exists( 'portfolio_paddingRight', $attributes ) ) {
		$portfolio_paddingRight = $attributes['portfolio_paddingRight'];
	}
	if ( array_key_exists( 'portfolio_paddingBottom', $attributes ) ) {
		$portfolio_paddingBottom = $attributes['portfolio_paddingBottom'];
	}
	if ( array_key_exists( 'portfolio_paddingLeft', $attributes ) ) {
		$portfolio_paddingLeft = $attributes['portfolio_paddingLeft'];
	}
	if ( true == $portfolio_cat_show_type ) {
		$all_prd = new WP_Query(
			array(
				'post_status'         => 'publish',
				'offset'              => 0,
				'post_type'           => WPBRICKS_PORTFOLIO_POSTTYPE,
				'posts_per_page'      => 100,
				'ignore_sticky_posts' => 1,
				'tax_query'           => array(
					array(
						'taxonomy' => 'wpbricks_portfolio_cat',
						'field'    => 'slug',
						'terms'    => $portfolioCategory_arr,
					),
				),
			)
		);
	} else {
		$all_prd = new WP_Query(
			array(
				'post_status'         => 'publish',
				'offset'              => 0,
				'post_type'           => WPBRICKS_PORTFOLIO_POSTTYPE,
				'posts_per_page'      => 100,
				'ignore_sticky_posts' => 1,
			)
		);
	}
	$all_prd_count = $all_prd->found_posts;
	if ( $all_prd_count > 0 ) {
		if ( $all_prd_count < $attributes['portfolio_columns'] ) {
			$attributes['portfolio_columns'] = $all_prd_count;
		}
	}
	$portfolio_columns = $attributes['portfolio_columns'];
	$columns_width     = ( 100 / $portfolio_columns ) . "%";
	$get_content       = '';
	ob_start();
	if ( $all_prd->posts ) {
		?>
		<div class="wpbricks-portfolio-addons" style="
			margin-top: <?php echo esc_attr( $portfolio_marginTop ); ?>px;
			margin-bottom: <?php echo esc_attr( $portfolio_marginBottom ); ?>px;
			margin-left: <?php echo esc_attr( $portfolio_marginLeft ); ?>px;
			margin-right: <?php echo esc_attr( $portfolio_marginRight ); ?>px;
			padding-top: <?php echo esc_attr( $portfolio_paddingTop ); ?>px;
			padding-bottom: <?php echo esc_attr( $portfolio_paddingBottom ); ?>px;
			padding-left: <?php echo esc_attr( $portfolio_paddingLeft ); ?>px;
			padding-right: <?php echo esc_attr( $portfolio_paddingRight ); ?>px;
			">
			<div class="button-group filter-button-group" style="text-align: <?php echo esc_attr( $portfolio_tab_position ); ?>;">
				<button class="button" data-filter="*" style="
					text-align: <?php echo esc_attr( $portfolio_tab_position ); ?>;
					font-size: <?php echo esc_attr( $portfolio_tab_fontSize ); ?>px;
					font-weight: <?php echo esc_attr( $portfolio_tab_fontWeight ); ?>;
					text-transform: <?php echo esc_attr( $portfolio_tab_textUppercase ); ?>;
					color: <?php echo esc_attr( $portfolio_tab_FontColor ); ?>;
					">All
				</button>
				<?php
				if ( true == $portfolio_cat_show_type ) {
					foreach ( $portfolioCategory_arr as $cat_arr ) {
						$cat = get_term_by( 'slug', $cat_arr, 'wpbricks_portfolio_cat' );
						echo '<button class="button" data-filter=".' . $cat->slug . '" style="color: ' . esc_attr( $portfolio_tab_FontColor ) . ';text-align: ' . esc_attr( $portfolio_tab_position ) . ';font-size: ' . esc_attr( $portfolio_tab_fontSize ) . 'px;font-weight: ' . esc_attr( $portfolio_tab_fontWeight ) . ';text-transform: ' . esc_attr( $portfolio_tab_textUppercase ) . ';">' . html_entity_decode( $cat->name ) . '</button>';
					}
				} else {
					$terms = get_terms( array(
							'taxonomy'   => array( 'wpbricks_portfolio_cat' ),
							'hide_empty' => true,
						)
					);
					foreach ( $terms as $term ) {
						$return[] = [
							'id'   => $term->term_id,
							'name' => html_entity_decode( $term->name ),
							'slug' => $term->slug,
						];
						echo '<button class="button" data-filter=".' . $term->slug . '" style="color: ' . esc_attr( $portfolio_tab_FontColor ) . ';text-align: ' . esc_attr( $portfolio_tab_position ) . ';font-size: ' . esc_attr( $portfolio_tab_fontSize ) . 'px;font-weight: ' . esc_attr( $portfolio_tab_fontWeight ) . ';text-transform: ' . esc_attr( $portfolio_tab_textUppercase ) . ';">' . html_entity_decode( $term->name ) . '</button>';
					}
				}
				?>
			</div>

			<div class="grid">
				<?php
				while ( $all_prd->have_posts() ) {
					$all_prd->the_post();
					global $post;
					$post_id          = $post->ID;
					$featured_img_url = get_the_post_thumbnail_url( $post_id, 'full' );
					$category_slug    = array();
					$cat              = "";
					$terms            = get_the_terms( $post_id, 'wpbricks_portfolio_cat' );
					if ( $terms ) {
						foreach ( $terms as $term ) {
							$category_slug[] = $term->slug;
						}
						$cat .= implode( " ", $category_slug );
					}
					if ( $featured_img_url ) {
						?>
						<div class="grid-item init <?php echo esc_attr( $cat ); ?>" data-category="<?php echo esc_attr( $cat ); ?>" style="width: <?php echo esc_attr( $columns_width ); ?>;">
							<div class="grid-item-inner">
								<?php if ( $attributes['display_feature_image'] ) { ?>
									<a class="gallery-image-popup" href="<?php echo esc_url( $featured_img_url ); ?>"><img src="<?php echo esc_url( $featured_img_url ); ?>" alt="<?php echo esc_html( get_the_title( $post_id ) ); ?>"></a>
								<?php } ?>
								<?php if ( ( true == $attributes['display_portfolio_title'] ) || ( true == $attributes['portfolio_excerpt'] ) ) { ?>
									<div class="meta-item">
										<?php if ( $attributes['display_portfolio_title'] ) { ?>
											<div class="title" style="font-size: <?php echo esc_attr( $titleFontSize ); ?>px;"><?php echo esc_html( get_the_title( $post_id ) ); ?></div>
										<?php } ?>
										<?php if ( $attributes['portfolio_excerpt'] ) {
											$excerpt_words_length = $attributes['excerpt_words_length'];
											$excerpt              = apply_filters( 'the_excerpt',
												get_post_field(
													'post_excerpt',
													$post_id,
													'display'
												)
											);
											if ( !empty( $excerpt ) && isset( $excerpt_words_length ) ) {
												$new_content = apply_filters( 'the_excerpt',
													wp_trim_words(
														preg_replace(
															array(
																'/\<figcaption>.*\<\/figcaption>/',
																'/\[caption.*\[\/caption\]/',
															),
															'',
															get_the_content( $post_id )
														),
														$excerpt_words_length
													)
												);
											}
											?>
											<div class="short-desc" style="font-size: <?php echo esc_attr( $descFontSize ); ?>px;"><?php echo $new_content; ?></div>
										<?php } ?>
									</div>
								<?php } ?>
							</div>
						</div>
						<?php
					}
				} ?>
			</div>
		</div>
		<?php
	} else {
		?>
		<div class='portfolio-list-outer no-result'>
			<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=wpbricks_portfolio' ) ); ?>"><?php echo esc_html__( 'Click Here ', 'wpbricks-portfolio-block-addons' ); ?></a><?php echo esc_html__( 'to create Portfolio', 'wpbricks-portfolio-block-addons' ); ?>
		</div>
		<?php
	}
	$get_content .= ob_get_contents();
	ob_end_clean();
	return $get_content;
}
/**
 * Register block.
 *
 * @since 1.0.0
 */
function wpbricks_portfolio_block_register_block() {
	register_block_type( 'wpbricks/bricks-portfolio-block', array(
			'attributes'      => array(
				'portfolio_cat_show_type'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'portfolio_columns'           => array(
					'type'    => 'integer',
					'default' => 4,
				),
				'portfolioCategory'           => array(
					'type'    => 'array',
					'default' => [],
					'items'   => [
						'type' => 'string',
					],
				),
				'titleFontSize'               => array(
					'type'    => 'integer',
					'default' => 20,
				),
				'descFontSize'                => array(
					'type'    => 'integer',
					'default' => 16,
				),
				'portfolio_excerpt'           => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'excerpt_words_length'        => array(
					'type'    => 'integer',
					'default' => 30,
				),
				'display_portfolio_title'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'display_feature_image'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portfolio_tab_fontSize'      => array(
					'type'    => 'number',
					'default' => 16,
				)
			,
				'portfolio_tab_fontWeight'    => array(
					'type' => 'number',
				),
				'portfolio_tab_textUppercase' => array(
					'type' => 'string',
				),
				'portfolio_tab_position'      => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'portfolio_tab_FontColor'     => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'portfolio_marginTop'         => array(
					'type'    => 'string',
					'default' => '25',
				),
				'portfolio_marginRight'       => array(
					'type'    => 'string',
					'default' => '0',
				),
				'portfolio_marginBottom'      => array(
					'type'    => 'string',
					'default' => '25',
				),
				'portfolio_marginLeft'        => array(
					'type'    => 'string',
					'default' => '0',
				),
				'portfolio_paddingTop'        => array(
					'type'    => 'string',
					'default' => '0',
				),
				'portfolio_paddingRight'      => array(
					'type'    => 'string',
					'default' => '0',
				),
				'portfolio_paddingBottom'     => array(
					'type'    => 'string',
					'default' => '0',
				),
				'portfolio_paddingLeft'       => array(
					'type'    => 'string',
					'default' => '0',
				),
			),
			'render_callback' => 'wpbricks_portfolio_block_render_callback',
		)
	);
}
add_action( 'init', 'wpbricks_portfolio_block_register_block' );
add_action( 'enqueue_block_assets', 'wpbricks_portfolio_block_enqueue_block_assets' );
/**
 * Enqueue the block's assets for the front.
 *
 * @since 1.0.0
 */
function wpbricks_portfolio_block_enqueue_block_assets() {
	wp_enqueue_style(
		'wpbricks-portfolio-enqueue-block-assets',
		WPBRICKS_PORTFOLIO_PLUGIN_PATH . 'css/wpbricks-portfolio-frontend.css',
		array(),
		''
	);
	/*wp_enqueue_style(
		'wpbricks-gutenberg-magnific-popup-css',
		plugins_url( 'css/magnific-popup.min.css', __FILE__ ),
		array(),
		''
	);*/
	wp_enqueue_script(
		'wpbricks-portfolio-isotope-frontend-script',
		WPBRICKS_PORTFOLIO_PLUGIN_PATH . 'js/isotope.min.js',
		array( 'jquery' ),
		'1.0.0',
		true
	);
	/*wp_enqueue_script(
		'jquery-magnific',
		plugins_url( 'js/jquery.magnific-popup.js', __FILE__ ),
		array( 'jquery' ),
		'1.0.0'
	);*/
	wp_enqueue_script(
		'wpbricks-portfolio-custom',
		WPBRICKS_PORTFOLIO_PLUGIN_PATH . 'js/wp-front-custom.js',
		array(),
		'1.0.0',
		true
	);
}
