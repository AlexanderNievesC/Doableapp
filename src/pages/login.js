import MainPage from "../components/main.js"
import { tokenKey } from "../config.js"
import DOMHandler from "../dom-handler.js"
import { loginUser } from "../services/session-services.js"
import SignupPage from "./signup.js"


function render (){
return `
<header>
    <img src="/assets/{ doable }.svg" width="101px" height="24px">    
</header>
 <section id="section__login">
    <form>
        <label class="primary" for="email">Email</label>
        <input class="input__primary" name="email" type="text" placeholder="you@example.com">

        <label class="primary" for="password">Password</label>
        <input class="input__primary" name="password" type="text" placeholder="*****">

        <button class="button__primary">Login</button>
    </form>
    <div class ="primary__pink" id="account_button">Create account</div>
 </section>
 `
}

 function ListenEvents(){
    // Getting values from the form
    const form = document.querySelector("form") 

    form.addEventListener("submit",async(event)=>{
        try{event.preventDefault()
            const {email, password} = event.target.elements
            const credentials = {
                email: email.value,
                password: password.value
            }
            loginUser(credentials)
        }catch(error){
            console.log(error)
        }
    })

    //Redirecting to page Create Account
    const create_button= document.getElementById("account_button")

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