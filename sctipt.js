const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        ${taskText} 
        <button class="delete-btn">X</button>
    `;

    taskList.appendChild(taskItem);
    saveTaskToLocalStorage(taskText);
    taskInput.value = "";

    taskItem.querySelector(".delete-btn").addEventListener("click", function () {
        taskItem.remove();
        removeTaskFromLocalStorage(taskText);
    });
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            ${task} 
            <button class="delete-btn">X</button>
        `;
        taskList.appendChild(taskItem);

        taskItem.querySelector(".delete-btn").addEventListener("click", function () {
            taskItem.remove();
            removeTaskFromLocalStorage(task);
        });
    });
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
