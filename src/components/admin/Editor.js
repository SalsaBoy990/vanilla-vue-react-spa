import axios from "axios";
import Cookies from 'js-cookie';

// Import configs
import {setState, state} from "../../state";
import {getEl, isRendered} from "../../helpers";

import {primary, main, editor, editorTitle, editorContent} from "../../config";

import {save, update} from '../../entities/posts/crud';

/**
 * render - Displays the editor on the page
 *
 * @export
 */
export function render() {
    // Make sure user is logged in or editor is not already rendered
    if (state.loggedIn === false || isRendered(editor)) {
        return;
    }

    // Setup the editor form
    const form = document.createElement("form");
    form.id = editor;
    form.innerHTML = `
    <h3 class="add-new-post">Add New Post</h3>
    <h3><input id="${editorTitle}" type="text" name="title" placeholder="Enter title here" value=""></h3>
    <div id="${editorContent}"></div>
    <p><button class="button">Save</button></p>
  `;

    // Add the editor form to the page
    getEl(primary).insertBefore(form, getEl(main));

    // Initialize the quill editor
    var quill = new Quill(`#${editorContent}`, {
        theme: "snow"
    });

    getEl(editor).addEventListener('submit', process);
}

function process(event) {

    // Get the Quill editor
    const quillEditor = Quill.find(getEl(editorContent));
    // Setup post object to save with updated content
    const post = {
        // Get the post id
        id: state.editorPost,
        // Get the editor title
        title: getEl(editorTitle).value,
        // Get the editor content
        content: quillEditor.root.innerHTML,
        // Set the status to publish
        status: "publish"
    };

    // Prevent default even behavior
    event.preventDefault();

    console.log(post);
    // Quick and dirty validation
    if (!post.title || !post.content) {
        alert("All fields required");
        return;
    }

    if (state.editorPost === null) {
        // Finally save the post
        save(post);

    } else {
        update(post);
    }



}

/**
 * clear - Clear the data from the editor form
 *
 * @export
 */
export function clear() {
    // Set the editor title field to empty
    getEl(editorTitle).value = "";
    // Get the Quill editor
    const quillEditor = Quill.find(getEl(editorContent));
    // Clear the editor content
    quillEditor.root.innerHTML = "";
    // set the fortm method back to post
    setState('editorPost', null);
}


export function loadPost() {

    const token = Cookies.get(state.token);

    axios.get(
        state.restUrl + "wp/v2/posts/" + state.editorPost, {
            params: {
                context: 'edit'
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
    ).then(response => {
        window.scrollTo(0, 50);
        getEl(editorTitle).value = response.data.title.raw;
        const contentEditor = Quill.find(getEl(editorContent));
        contentEditor.root.innerHTML = response.data.content.raw;

    }).catch(error => console.error(error));


}

