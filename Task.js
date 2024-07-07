export default class Task {
    constructor(title, description, dueDate, isComplete = false) {
        this.id = Date.now().toString();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
    }
}
