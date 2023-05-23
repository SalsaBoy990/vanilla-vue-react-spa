import {render as Posts, clear as clearPosts} from "./Posts";

import {state, setState} from "../../state";
import {getEl, createEl} from "../../helpers";
import {deletePost} from '../../entities/posts/crud';

import {main, backBtn} from "../../config";
import {loadPost} from "../admin/Editor";

export function render() {
    const article = createEl('article');
    article.classList.add('post');
    article.innerHTML =
        `
    <p><a id="${backBtn}" href="#">&lt; Back to Posts</a></p>
    <h1 class="entry-title">${state.post.title.rendered}</h1>
    <div class="entry-content">${state.post.content.rendered}</div>
    `;

    article.querySelector(`#${backBtn}`).addEventListener('click', event => {
        event.preventDefault();
        setState('post', null);
        Posts();
    });

    // If logged in, display edit link
    if (state.loggedIn) {
        article.appendChild(editLink(state.post));
        article.appendChild(deleteLink(state.post));
    }

    clearPosts();

    getEl(main).appendChild(article);
}

export function editLink(post) {

    const link = createEl('a');
    link.href = '#edit-post';
    link.classList.add('edit');
    link.innerText = "Edit";

    link.addEventListener('click', () => {
        setState('editorPost', post.id);
        loadPost();
    });

    return link;

}

export function deleteLink(post) {
    // Setup the delete link
    const link = document.createElement("a");
    link.href = "#delete-post";
    link.classList.add("delete-post");
    link.innerText = "Delete";

    // Add the event listener to delete the post
    link.addEventListener("click", event => {
        event.preventDefault();
        deletePost(post);
    });

    // Return the delete link
    return link;
}
