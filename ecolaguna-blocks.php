<?php
/**
 * Plugin Name: Gutenberg Custom Blocks — EcoLaguna
 * Plugin URI: https://github.com/edrusano/ecolaguna-blocks
 * Description: Gutenberg Custom Blocks is a showcase plugin for creating Gutenberg blocks
 * Author: edrusano
 * Author URI: https://www.ecolaguna.de
 * Text Domain: ecolaguna-blocks
 * Domain Path: /languages
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package ecolaguna_blocks
 */

namespace ecolaguna_blocks;

defined('ABSPATH') || exit;

/**
 * Plugin base path.
 *
 * @since 1.0.0
 *
 * @return string
 */
function get_plugin_dir() {
  return __DIR__;
}

/**
 * Plugin base URL.
 *
 * @since 1.0.0
 *
 * @return string
 */
function get_plugin_url() {
  static $plugin_url;
	 return ( empty($plugin_url)
    ? ( $plugin_url = \plugins_url(null, __FILE__) )
    : $plugin_url
  );
}

// Initialize Gutenberg Blocks.
require_once( __DIR__ . '/src/init-blocks.php' );
