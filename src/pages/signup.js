

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

        <button id="button__primary">Create account</button>
    </form>
    <div id="primary__pink account">Login</div>
 </section>
 `
}

 function ListenEvents(){
    
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