import { STORE } from "../STORE.js"
import DOMHandler from "../dom-handler.js";
import LoginPage from "../pages/login.js";
import { logoutUser } from "../services/session-services.js";
import { createTask, getTask } from "../services/task-services.js";

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getItems(tasks){

    return `
    <div class="flex-row">
        <div>
            ${tasks.map(task => {
                return `
                <div id="flex-column">
                    <div id="flex-row1" >
                        <div>
                            ${task.completed ? `<input type="checkbox" checked id="Checkbox_assignment">` :  `<input type="checkbox" id="Checkbox_assignment">` }
                        </div>
                        <div>
                            <label class="checkbox_pending" for="Checkbox_pending" class="${!task.completed? 'primary__bold' : 'primary__gray'}">${task.title}</label>
                            <div>${task.due_date!=null ? formatDate(task.due_date) : ""}</div>
                        </div>
                    </div>
                    ${!task.important
                        ? `<img src="/assets/alert.svg" width="16px" height="16px">`
                        : (!task.completed
                            ? `<img src="/assets/alert_important.svg" width="16px" height="16px">`
                            : `<img src="/assets/alert_middle.svg" width="16px" height="16px">`
                        )}
                    </div>
                
                `
            }).join('')}
        </div>
    </div>
    `
}
                


async function render (){

    STORE.tasks=await getTask();
    let data =  STORE.tasks.sort((a,b)=>a.title.localeCompare(b.title));
    console.log(data)

    return `
    <header id=header_main>
        <div id="logo_area">
            <img src="/assets/{ doable }.svg" width="101px" height="24px">
        </div>
        
        <img id="block" src="/assets/block.svg" width="16px" height="16px">    
    </header>
    <section>
            <div class="flex-row">
                <div class="class">Sort</div>
                <select id="options" class="select__primary"> 
                    <option class="option">Alphabetical (a-z)</option>
                    <option class="option">Due date</option>
                    <option class="option">Importance</option>
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
            ${await getItems(data)}
            
        </div>

        <form>
            <input class="input__primary" name="task" placeholder="do the dishes...">
            <input class="input__primary" name="due_date" placeholder="mm/dd/yy">
            <button class="button__primary">Add Task</button/>
        </form>
        
    </section>
 `
}

 function ListenEvents(){
    //add task
    const form = document.querySelector("form");
    
    form.addEventListener("submit",async(event)=>{
        try {
            event.preventDefault();
    
            const {task,due_date} = event.target.elements;
    
            const data={
                task:task.value,
                due_date:due_date.value,
            }

            console.log(data)
            createTask(data) 
        }catch(error){
            console.log(error)
        }
    })

    function renderTasks() {
        const tasksContainer = document.getElementById('section__body');
        tasksContainer.innerHTML = getItems(STORE.tasks);
    }
    

    //order tasks
    const selectElement = document.getElementById('options');

    selectElement.addEventListener("change",(event)=>{
        const optionSelected = event.target.options[event.target.selectedIndex].value

        switch(optionSelected){
            case "Alphabetical (a-z)": {
                STORE.tasks = STORE.tasks.sort((a, b) => a.title.localeCompare(b.title))
                console.log(STORE.tasks)
            }
            break;
            case "Due date": {
                STORE.tasks = STORE.tasks.sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
            }
            break;
            case "Importance": {
                STORE.tasks = STORE.tasks.sort((a, b) => b.important - a.important)
            } 
            break;
        }
        renderTasks();
    })
    
    //Only pending
        const checkbox_pending = document.getElementById("Checkbox_pending");
        const Checkbox_important = document.getElementById("Checkbox_important");
        
        checkbox_pending.addEventListener("change",async (event)=>{
            if (checkbox_pending.checked) {
                STORE.tasks = STORE.tasks.filter(task => !task.completed )
                renderTasks();
            }  else {
                STORE.tasks = await getTask();
                renderTasks();
            }
        })

    //Only important
        Checkbox_important.addEventListener("change",async (event)=>{
            if (Checkbox_important.checked) {
                STORE.tasks = STORE.tasks.filter(task => task.important)
                renderTasks();
            }  else {
                STORE.tasks = await getTask();
                renderTasks();
            }
        })

    // User Logout
    const logout_button = document.getElementById("block");

    logout_button.addEventListener("click",()=>{
        logoutUser()
        DOMHandler.load(LoginPage)
    })

    // Asigning pending and important tasks
    const checkbox_pend = document.querySelectorAll("#Checkbox_assignment");

    checkbox_pend.forEach(checkbox => {
        checkbox.addEventListener("click",(event)=>{
            console.log(event.target)
        })
    })



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