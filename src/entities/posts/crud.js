// Import libraries
import axios from "./../../Axios";

// Import components
import {clear as clearEditor} from "./../../components/admin/Editor";
import {init as Posts} from "./../../components/general/Posts";
import {render as Notice} from "./../../components/admin/Notice";

// Import configs
import {setState, state} from "../../state";

/**
 * Saves a post
 *
 * @export
 * @param {Object} post The new post to be saved
 */
export function save(post) {

    // Save post
    axios({
        // Setup method
        method: "post",
        // Setup rest url
        url: state.restUrl + "wp/v2/posts",
        // Setup the post object to send
        data: post,
        //  Headers are setup up in the interceptor of axios
    })
        .then(response => {
            // Clear the editor
            clearEditor();

            Notice('saved');

            // Reload the latest posts
            Posts();
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * Updates a post
 *
 * @export
 * @param {Object} post The new post to be saved
 */
export function update(post) {
    // Update existing post
    axios({
        // Set method to put
        method: "put",
        // set the URL with the current post id
        url: state.restUrl + "wp/v2/posts/" + post.id,
        // Set the post data object to send
        data: post,
    })
        .then(response => {
            // Clear the editor
            clearEditor();
            // Load a notice post is updated
            Notice("updated");
            // Reload the posts
            Posts();
        })
        .catch(error => {
            console.error(error);
        });
}

export function deletePost(post) {
    // Confirm that user wants to delete post
    const confirm = window.confirm(`Delete Post: "${post.title.rendered}"`);

    // If user confirms delete then proceed
    if (true === confirm) {
        // Setup the API request
        axios({
            // Set method to delete
            method: "delete",
            // Setup the URL for the post to delete
            url: state.restUrl + "wp/v2/posts/" + post.id,
        })
            .then(response => {
                // Clear the editor
                clearEditor();
                // Display delete notice
                Notice("deleted");
                // Load the updated list of posts
                Posts();
            })
            .catch(error => {
                console.error(error);
            });
    }
}
