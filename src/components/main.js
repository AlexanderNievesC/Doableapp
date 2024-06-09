import { STORE } from "../STORE.js"
import { getTask } from "../services/task-services.js"


async function Items(){

    STORE.tasks = await getTask(); 
    console.log(STORE.tasks)

    return `
    <div class="flex-row">
    <div>
        <input type="checkbox" id="Checkbox_assignment"> 
        <label for="Checkbox_pending">Complete assignments</label>
    </div>
        <img src="/assets/alert.svg">
    </div>
    `
}

function render (){
return `
<header id=header_main>
    <div id="logo_area">
        <img src="/assets/{ doable }.svg" width="101px" height="24px">
    </div>
    
    <img src="/assets/block.svg" width="16px" height="16px">    
</header>
 <section>
        <div class="flex-row">
            <div class="class">Sort</div>
            <select id="options" class="select__primary"> 
                <option value="alphabetical">Alphabetical (a-z)</option>
            </select>
        </div>

        <div class="flex-row">
            <div>Show</div>

            <div>
                <input type="checkbox" id="Checkbox_pending"> 
                <label for="Checkbox_pending">Only pending  </label>
            </div>

            <div>
                <input type="checkbox" id="Checkbox_important"> 
                <label for="Checkbox_pending">Only important  </label>
            </div>
        </div>

    <div id="section__body">
        ${Items()}
    </div>

    <form>
        <input class="input__primary" name="task" type="text" placeholder="do the dishes...">
        <input class="input__primary" name="date" type="date" placeholder="mm/dd/yy">
        <button class="button__primary">Add Task</button/>
    </form>
    
 </section>
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