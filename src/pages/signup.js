import DOMHandler from "../dom-handler.js"
import { signupUser } from "../services/session-services.js"
import LoginPage from "./login.js"

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

        <button id="create_button" class="button__primary">Create account</button>
    </form>
    <div id="login_button" class="primary__pink">Login</div>
 </section>
 `
}

 function ListenEvents(){

    //login button
    const login_button= document.getElementById("login_button")

    login_button.addEventListener("click",()=>{
        DOMHandler.load(LoginPage)
    })

    //signup button
    const form= document.querySelector("form")

    form.addEventListener("submit",(event)=>{

        event.preventDefault();

        try{            
            const {email, password} = event.target.elements
            const credentials = {
                email: email.value,
                password: password.value
            }
       signupUser(credentials)
            
        }catch(error){
            console.log(error)
        }
    })
}

const SignupPage = {
    toString(){
        return render()
    },
    addListeners(){
        ListenEvents()
    }
}

export default SignupPage