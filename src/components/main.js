function render (){
return `
<header>
    <div>hola</div>  
</header>

 `
}

 function ListenEvents(){
    
}

const MainPage = {
    toString(){
        return render()
    },
    addListeners(){
        ListenEvents()
    }
}

export default MainPage