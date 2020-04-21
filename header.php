<?php
/**
 * Header file for Gulppress theme
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Gulppress
 * @since 5.3.2
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >

    <?php wp_head(); ?>
  </head>

  <body <?php body_class( ''); ?>>
    <header id="site-header" role="banner"></header>