import ToDoList from './ToDoList.js';

const toDoList = new ToDoList();
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const allTasksButton = document.getElementById('all-tasks');
const completedTasksButton = document.getElementById('completed-tasks');
const incompleteTasksButton = document.getElementById('incomplete-tasks');

document.addEventListener('DOMContentLoaded', displayTasks);

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;

    toDoList.addTask(title, description, dueDate);
    taskForm.reset();
    displayTasks();
});

taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        toDoList.deleteTask(id);
        displayTasks();
    }

    if (e.target.classList.contains('complete')) {
        const id = e.target.parentElement.dataset.id;
        toDoList.toggleComplete(id);
        displayTasks();
    }

    if (e.target.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const task = toDoList.tasks.find(task => task.id === id);
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        document.getElementById('due-date').value = task.dueDate;
        toDoList.deleteTask(id);
    }
});

allTasksButton.addEventListener('click', () => displayTasks());
completedTasksButton.addEventListener('click', () => displayTasks('completed'));
incompleteTasksButton.addEventListener('click', () => displayTasks('incomplete'));

function displayTasks(filter = 'all') {
    taskList.innerHTML = '';
    const tasks = toDoList.filterTasks(filter);
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.dataset.id = task.id;
        taskItem.className = task.isComplete ? 'complete' : '';
        taskItem.innerHTML = `
            <span>${task.title} - ${task.dueDate}</span>
            <button class="complete">Complete</button>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}
