
import LoginPage from "./src/pages/login.js";
import DOMHandler from "./src/dom-handler.js";
import { tokenKey } from "./src/config.js";
import MainPage from "./src/components/main.js";


async function init(){
        const token = sessionStorage.getItem(tokenKey)
        if (token){
                DOMHandler.load(MainPage)
        }else{
                DOMHandler.load(LoginPage)
        }
        
}

init();

