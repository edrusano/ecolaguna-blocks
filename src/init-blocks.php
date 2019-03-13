<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all blocks.
 *
 * @since   1.0.0
 * @package ecolaguna_blocks
 */

namespace ecolaguna_blocks;

\defined('ABSPATH') || exit;

/**
 * Enqueue Gutenberg block assets for both end-user and editor.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function enqueue_block_assets() {

  $style_path = '/dist/blocks.build.css';

  \wp_enqueue_style(
	  	__NAMESPACE__ . '-block',
	  	get_plugin_url() . $style_path,
  		[ 'wp-editor' ],
	  	\filemtime( get_plugin_dir() . $style_path ),
  );
}

// Hook: Frontend assets.
\add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_block_assets' );

/**
 * Enqueue Gutenberg block assets for editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function enqueue_block_editor_assets() {

  $style_path = '/dist/blocks.editor.build.css';

  \wp_enqueue_style(
    __NAMESPACE__ . '-block-editor',
		  get_plugin_url() . $style_path,
		  [ 'wp-edit-blocks' ], 
		  \filemtime( get_plugin_dir() . $style_path ),
	 );

  $script_path = '/dist/blocks.editor.build.js';

  \wp_enqueue_script(
	  	__NAMESPACE__ . '-block-editor',
  		get_plugin_url() . $script_path,
  		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		  \filemtime( get_plugin_dir() . $script_path ),
	  	true,
	 );
}

// Hook: Editor assets.
\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );

if ( \function_exists( 'register_block_type' ) ) {
  \register_block_type( 'ecolaguna/image-before-after' );
}
