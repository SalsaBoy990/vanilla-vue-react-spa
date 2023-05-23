import axios from "axios";
import Cookies from 'js-cookie';
import formurlencoded from "form-urlencoded";

import {init as Posts} from "../components/general/Posts";

import {render as LoginForm} from '../components/auth/LoginForm';
import {render as LogoutForm} from '../components/auth/LogoutForm';

import {render as Editor} from '../components/admin/Editor';
import {render as Notice} from "../components/admin/Notice";


import {state, setState} from "../state";
import {getEl, removeEl} from "../helpers";
import {logoutForm, loginForm, username, password, editor} from "../config";

// auth process
export function init() {

    if (Cookies.get(state.token) === undefined) {
        console.info('logged out')
        logout();
        initLogin();
    } else {
        console.info('logged in')
        login();
        initLogout();
    }

}


export function login() {
    setState('loggedIn', true);
    removeEl(loginForm);
    Notice('loggedin');
    LogoutForm();
    Editor();
    // getEl(loginBtn).classList.add('hidden');
    // getEl(logoutBtn).classList.remove('hidden');

    Posts();
}


export function logout() {
    setState('loggedIn', false);
    // getEl(loginBtn).classList.remove('hidden');
    removeEl(logoutForm);

    Notice('loggedout');

    LoginForm();
    removeEl(editor);
    // getEl(logoutForm).classList.add('hidden');
    Posts();

}


export function initLogin() {

    // clone it and replace (it also removes the event listener
    /*
        const previousLogin = getEl(loginBtn);
        const newLogin = previousLogin.cloneNode(true);
        previousLogin.parentNode.replaceChild(newLogin, previousLogin);
    */

    // getEl(loginBtn).addEventListener('click', event => {
    getEl(loginForm).addEventListener('submit', event => {
        event.preventDefault();


        /*        username: "h8328tjb8iy9",
                    password: "n7fX0hEjM%MU0$k#79w#",*/
        const credentials = {
            username: getEl(username).value,
            password: getEl(password).value,
        };

        axios({
            method: "POST",
            url: state.restUrl + 'jwt-auth/v1/token',
            data: formurlencoded(credentials),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}

        }).then(response => {
            if (200 === response.status) {
                console.log(response);
                Cookies.set(state.token, response.data.token, {
                    expires: 1, // 1 day expiration of token
                    secure: true
                });


                init();
            }
        }).catch(error => {
            console.error(error);
        });

    });

}


export function initLogout() {

    // clone it and replace (it also removes the event listener
    /*    const previousLogout = getEl(logoutBtn);
        const newLogout = previousLogout.cloneNode(true);
        previousLogout.parentNode.replaceChild(newLogout, previousLogout);*/

    getEl(logoutForm).addEventListener('submit', event => {
        event.preventDefault();
        Cookies.remove(state.token, {secure: true});
        init();
    });
}

