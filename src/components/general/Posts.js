import axios from 'axios';

import {state, setState} from "../../state";
import {getEl, createEl} from "../../helpers";
import {main} from "../../config";

import {render as Post, editLink, deleteLink} from './Post';


export function init(event) {
    if (event) {
        event.preventDefault();
    }

    axios.get(state.restUrl + 'wp/v2/posts', {
        params: {
            per_page: 10
        }
    }).then(({data: posts}) => {
        console.log(posts);
        setState("posts", posts);
        render();

    })

}

export function render() {
    clear();
    state.posts.map((post, index) => {
        const article = createEl('article');
        article.classList.add('post');
        article.innerHTML = `
            <h2 class="entry-title">
                <a href="#${post.slug}">${post.title.rendered}</a>
            </h2>
            <div class="entry-content">${post.excerpt.rendered}</div> 
        `;

        article.querySelector('.entry-title a').addEventListener('click', event => {
            event.preventDefault();
            setState('post', state.posts[index]);
            Post();
        });

        // If logged in, display edit link
        if (state.loggedIn) {
            article.appendChild(editLink(post));
            article.appendChild(deleteLink(post));
        }

        getEl(main).append(article);
    });

}

export function clear() {
    getEl(main).innerHTML = '';
}
