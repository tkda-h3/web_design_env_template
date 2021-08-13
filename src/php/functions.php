<?php
function my_enqueue_scripts() {
  // style.css読み込み
  wp_enqueue_style( 'my-style', get_template_directory_uri(). '/css/main.css', array(), '1.0.0' );
  // script読み込み
  wp_enqueue_script( 'my-script', get_template_directory_uri(). '/js/script.js', array( 'jquery' ), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'my_enqueue_scripts' );
