import './style.css'

// Classes
class ProjectData {
    constructor(projectTitle, todoList = []) {
        this.projectTitle = projectTitle;
        this.todoList = todoList;
    };
};

const projectContainer = {};

// Project form
const addProjectBtn = document.getElementById('add_project_btn');
const projectDialog = document.getElementById('project_dialog');
const projectCloseForm = document.getElementById('project_close_form');
const projectForm = document.getElementById('project_form');

// Todo item form
const addTodoBtn = document.getElementById('add_todo_btn');
const todoDialog = document.getElementById('todo_dialog');
const todoCloseForm = document.getElementById('todo_close_form');

// Function to display dialog
function displayDialog(btn, dialog) {
    btn.addEventListener('click', () => {
        dialog.showModal();
    });
};

// Function to close dialog
function closeDialog(btn, dialog) {
    btn.addEventListener('click', () => {
        dialog.close();
    });
};

// Function to handle form data
function submitForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        for (const pair of formData.entries()) {
            projectContainer[pair[1]] = new ProjectData(pair[1]);
            projectDialog.close();
            console.log(projectContainer);
        };
    });
};

displayDialog(addProjectBtn, projectDialog);
closeDialog(projectCloseForm, projectDialog);
submitForm(projectForm);

displayDialog(addTodoBtn, todoDialog);
closeDialog(todoCloseForm, todoDialog);