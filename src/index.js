// Import everything from state, helpers and config
import {wrapper, primary, sidebar, main, siteName, siteDescription} from "./config";
import {getEl, createEl, removeEl, isRendered} from "./helpers";
import {state, setState} from "./state";

import {init as Header} from './components/general/Header';
import {init as Posts} from './components/general/Posts';

import {init as Authenticate} from './services/Authentication';

(function init() {
    // List out the state
    /*    console.table(state);
        // Show the setState function
        console.log(setState)
        // Render out UI ids
        console.table({wrapper, primary, sidebar, main, siteName, siteDescription});
        // Show getEl, createEl, removeEl and isRendered helpers
        console.log(getEl, createEl, removeEl, isRendered)*/
    Authenticate();
    Header();
    Posts();
})();
