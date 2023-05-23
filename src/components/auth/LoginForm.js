import {state} from "../../state";
import {getEl, createEl, isRendered} from "../../helpers";
import {sidebar, loginForm, username, password} from "../../config";

// login form
export function render() {
    if (state.loggedIn === true || isRendered(loginForm)) {
        return;
    }

    const form = createEl('form');
    form.id = loginForm;


    form.innerHTML = `
       <h3>Login</h3>
       
       <p><label for="username">Username</label></p> 
       <p><input id="${username}" type="text" name="username" value=""></p>

       <p><label for="password">Password</label></p> 
       <p><input id="${password}" type="password" name="password" value=""></p>
       
       <p><button id="login-button" type="submit" class="button submit">Login</button></p>
    `;

    getEl(sidebar).appendChild(form);
}

