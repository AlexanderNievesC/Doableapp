import MainPage from "../components/main.js"
import DOMHandler from "../dom-handler.js"
import { loginUser } from "../services/session-services.js"
import SignupPage from "./signup.js"


function render (){
return `
<header>
    <img src="/assets/{ doable }.svg" width="101px" height="24px">    
</header>
 <section id="section__login">
    <form id="form__login">
        <label id="primary" for="email">Email</label>
        <input id="input__primary" name="email" type="text" placeholder="you@example.com">

        <label id="primary" for="password">Password</label>
        <input id="input__primary" name="password" type="text" placeholder="*****">

        <button id="button__primary">Login</button>
    </form>
    <div id="primary__pink" class="account">Create account</div>
 </section>
 `
}

 function ListenEvents(){
    // Getting values from the form
    const form = document.getElementById("form__login") 

    form.addEventListener("submit",(event)=>{
        try{event.preventDefault()
            const {email, password} = event.target.elements
            const credentials = {
                email: email.value,
                password: password.value
            }
            loginUser(credentials)
            DOMHandler.load(MainPage)
        }catch(error){
            console.log(error)
        }
    })

    //Redirecting to page Create Account
    const create_button= document.querySelector(".account")

    create_button.addEventListener("click",()=>{
        DOMHandler.load(SignupPage)
    })
}

const LoginPage = {
    toString(){
        return render()
    },
    addListeners(){
        ListenEvents()
    }
}

export default LoginPage