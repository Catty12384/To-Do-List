import Task from './Task.js';

export default class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(title, description, dueDate) {
        const task = new Task(title, description, dueDate);
        this.tasks.push(task);
        this.saveTasks();
    }

    editTask(id, newTitle, newDescription, newDueDate) {
        const task = this.tasks.find(task => task.id === id);
        task.title = newTitle;
        task.description = newDescription;
        task.dueDate = newDueDate;
        this.saveTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        task.isComplete = !task.isComplete;
        this.saveTasks();
    }

    filterTasks(filter) {
        switch (filter) {
            case 'completed':
                return this.tasks.filter(task => task.isComplete);
            case 'incomplete':
                return this.tasks.filter(task => !task.isComplete);
            default:
                return this.tasks;
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}
