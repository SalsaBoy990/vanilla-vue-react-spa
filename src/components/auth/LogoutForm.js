import {state} from "../../state";
import {getEl, isRendered} from "../../helpers";
import {sidebar, logoutForm} from "../../config";

// logout form
export function render() {
    if (state.loggedIn === false || isRendered(logoutForm)) {
        return;
    }

    const form = document.createElement('form');
    form.id = logoutForm;
    form.innerHTML = `<button class="button submit">Logout</button>`;

    getEl(sidebar).appendChild(form);
}

