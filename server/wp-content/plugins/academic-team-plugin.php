<?php

/**
 * @package Academic plugin
 * @version 1.0.0
 */
/*
Plugin Name: Academic plugin
Plugin URI: http://deukhurimultiplecampus.edu.np/
Description: The beginning of an awesome plugin
Author: Me
Version: 1.0.0
Author URI: http://deukhurimultiplecampus.edu.np/
*/
function generate_academic_type() {
    $labels = array(
        'name'                  => 'Academics',
        'singular_name'         => 'Academic',
    );
    $args = array(
        'label'                 => 'Academic',
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'custom-fields' ),
        'taxonomies'            => array( 'category', 'post_tag' ),
        'hierarchical'          => false,
        'public'                => true,
        'capability_type'       => 'post', // Change 'page' to 'post'
        'show_in_rest'          => true,
        'rest_base'             => 'academics',
    );
    register_post_type( 'academic_type', $args );
}
add_action( 'init', 'generate_academic_type', 0 );


// Add a meta box for the academic image
function add_academic_image_meta_box() {
    add_meta_box(
        'academic_image_meta_box',
        'Academic Image',
        'render_academic_image_meta_box',
        'academic_type',
        'normal',
        'high'
    );
}

add_action('add_meta_boxes', 'add_academic_image_meta_box');


// Render the content of the academic image meta box
function render_academic_image_meta_box($post) {
    // Get the current image URL if it exists
    $image_url = get_post_meta($post->ID, '_academic_image_url', true);

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'academic_image_nonce');

    // Display the input for the academic image
    ?>
    <label for="academic_image">Upload Academic Faculty Image:</label>
    <input type="text" name="academic_image" id="academic_image" class="widefat" value="<?php echo esc_url($image_url); ?>" />
    <p>
        <input type="button" id="upload_image_button" class="button" value="Upload Image" />
    </p>
    <script>
        jQuery(document).ready(function($){
            var custom_uploader;

            $('#upload_image_button').click(function(e) {
                e.preventDefault();

                //If the uploader object has already been created, reopen the dialog
                if (custom_uploader) {
                    custom_uploader.open();
                    return;
                }

                //Extend the wp.media object
                custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choose Image',
                    button: {
                        text: 'Choose Image'
                    },
                    multiple: false
                });

                //When a file is selected, grab the URL and set it as the text field's value
                custom_uploader.on('select', function() {
                    var attachment = custom_uploader.state().get('selection').first().toJSON();
                    $('#academic_image').val(attachment.url);
                });

                //Open the uploader dialog
                custom_uploader.open();
            });
        });
    </script>
    <?php
}

// Save the academic image URL when saving the academic
function save_academic_image_meta($post_id) {
    // Verify nonce
    if (!isset($_POST['academic_image_nonce']) || !wp_verify_nonce($_POST['academic_image_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's not an autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Check the user's permissions
    if ('academic_type' == $_POST['post_type'] && current_user_can('edit_post', $post_id)) {
        // Save academic image URL
        update_post_meta($post_id, '_academic_image_url', esc_url($_POST['academic_image']));
    }
}

add_action('save_post', 'save_academic_image_meta');