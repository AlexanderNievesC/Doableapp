import apiFetch from "../api-fetch.js"

 async function getTask(){
    const tasks = await apiFetch("tasks")
    return tasks
}

 async function createTask(task = {title,due_date}){
    return await apiFetch("tasks",{body:task})
}

export {getTask, createTask}