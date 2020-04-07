// Define UI Vars
const taskInput = document.querySelector('#task');//Input field for new task
const form = document.querySelector('#task-form'); //Add task button
const filter = document.querySelector('#filter');//Field to filter tasks
const taskList = document.querySelector('.collection');//Lit of all the tasks 
const clearBtn = document.querySelector('.clear-tasks');//Clear tasks button

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // DOM Load Events
    document.addEventListener('DOMContentLoaded', displayTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    //Remove task evet
    taskList.addEventListener('click', removeTask);

    //Clear tasks button
    clearBtn.addEventListener('click', clearTasks);

    // Filter through tasks
    filter.addEventListener('keyup', filterTasks);
}

//Displays all the tasks from storage
function displayTasks(){
    //Load tasks from storage
    let tasks = getTasks();
    
    //Display tasks 
    tasks.forEach(function(task){
        const li = makeLI(task);    
        taskList.appendChild(li);
    })
}

// Add Task
function addTask(e){
    // Check if user has any input
    if (taskInput.value === ''){
        alert('Add a task');
        return;
    }

    //Make LI
    const li = makeLI(taskInput.value);

    // Append LI to UL
    taskList.appendChild(li);

    //Store Task in UL
    storeTaskInLS(taskInput.value);

    // Cleat Input
    taskInput.value = '';

    // Prevent reload
    e.preventDefault();
}

// Clear Tasks
function clearTasks(e){
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);   
    }
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    // Obtain text and turn to lowecase
    const text = e.target.value.toLowerCase();

    // Loop through the itmes of the ul and compare thier contents with input
    // Targetting .collection-item class and looping though node list
    document.querySelectorAll('.collection-item').forEach(function(task) {
        // task has the li, first child is the text content 
        const item = task.firstChild.textContent;

        // Compering the content of the li to the input on the text field
        if (item.toLowerCase().indexOf(text) != -1){
            // If the item is index in the NodeList then we display it
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
//---------UTILITY FUNCTIONS------------------------------//

//Make LI 
function makeLI(textValue){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(textValue));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    return li;
}

// Load Tasks From Storage
function getTasks(){
    let tasks = [];

    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    return tasks;
}

// Add Task To Storage
function storeTaskInLS(task){
    //Load tasks from storage
    let tasks = getTasks(task);

    //Push task to tasks array
    tasks.push(task);

    //Strignfy and add to storage
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove Task From Storage
function removeTaskFromLS(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        // If not create one
        tasks = [];
    } else {
        // If yes copy it to tasks
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(task === taskItem.textContent){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){
    //Target the parent of icon
    if(e.target.parentElement.classList.contains('delete-item')){
        // Delete the parent of the parent of the icon (The li)
        e.target.parentElement.parentElement.remove();

        //Remove from LS
        removeTaskFromLS(e.target.parentElement.parentElement);
    }
}