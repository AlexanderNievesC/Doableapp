import apiFetch from "../api-fetch.js"

async function getTask(){
    const tasks = await apiFetch("tasks")
    return tasks
}

export {getTask}