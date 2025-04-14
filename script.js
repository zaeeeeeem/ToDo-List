let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];


document.addEventListener("DOMContentLoaded", () => {

    const todoInput = document.querySelector("#todo-input");
    const addTask = document.querySelector("#add-task");
    const taskList = document.querySelector("#task-list");

    renderData();

    function saveData() {
        localStorage.setItem("tasks", JSON.stringify(taskArray));
    }

    function renderData() {
        taskList.innerHTML = "";

        if(taskArray.length == 0) {
            document.querySelector("#delete-all").classList.add("hidden");
        } else {
            document.querySelector("#delete-all").classList.remove("hidden");
        }

        taskArray.forEach((taskItem) => {

            let taskToAdd = document.createElement("li");
    
            taskToAdd.innerHTML = `
                <p>${taskItem.task}</p>
                <button class="delete-btn">Delete</button>
            `;
            if(taskItem.status == true){
                taskToAdd.classList.add("task-done-btn");
            }
            taskToAdd.setAttribute("id", taskItem.id);
    
            taskList.appendChild(taskToAdd);
        })
    }

    function onEnter(fn) {
        todoInput.addEventListener("keydown", (event) => {
            if(event.key == "Enter") {
                fn.click();
            }
        })  
    }

    addTask.addEventListener("click", () => {
        let taskValue = todoInput.value.trim();
        if(taskValue === "") return;

        let taskStatus = false;

        const tasks = {
            task: taskValue,
            id: Date.now(),
            status: taskStatus
        }

        taskArray.push(tasks);
        renderData();
        saveData();

        document.querySelector("#todo-input").value = "";
    });

    onEnter(addTask);

    document.querySelector("#task-list").addEventListener("click", (event) => {
        if(event.target.tagName === "BUTTON") {
            let targetId =  event.target.parentElement.getAttribute("id");
            taskArray = taskArray.filter((task) => task.id != targetId);

            renderData();
            saveData();
            
        } else if(event.target.tagName === "LI") {
            let targetId =  event.target.getAttribute("id");

            taskArray = taskArray.map((taskItem) => {
                if(taskItem.id == targetId) {
                    return {
                        ...taskItem,
                        status: !taskItem.status
                    };
                }
                return taskItem;
            })
            saveData();
            renderData();
        }
    });

    document.querySelector("#delete-all").addEventListener("click", () => {
        taskArray.length = 0;
        renderData();
        saveData();
    })
})