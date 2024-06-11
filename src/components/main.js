import { STORE } from "../STORE.js"
import { createTask, getTask } from "../services/task-services.js";


function getItems(){

    return `
    <div class="flex-row">
        <div>
            ${STORE.tasks.map(task => {
                return `
                <div id="flex-column">
                    <div>
                        <input type="checkbox"  id="Checkbox_assignment"> 
                        <label for="Checkbox_pending" class="primary__bold">${task.title}</label>
                    </div>
                    <img src="/assets/alert.svg" width="16px" height="16px">
                </div>
                
                `
            }).join('')}
        </div>
    </div>
    `
}

async function render (){

    STORE.tasks=await getTask();
    console.log(STORE.tasks)
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
                    <option value="alphabetical">Due date</option>
                    <option value="alphabetical">Importance</option>
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
            ${await getItems()}
            
        </div>

        <form>
            <input class="input__primary" name="task" placeholder="do the dishes...">
            <input class="input__primary" name="date" placeholder="mm/dd/yy">
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
    
            const {task,date} = event.target.elements;
    
            const TaskRelated={
                task:task.value,
                date:date.value,
            }
            createTask(TaskRelated) 
        }catch(error){
            console.log(error.message)
        }
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