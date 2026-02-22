import './style.css'

// Add project form
const addProjectBtn = document.getElementById('add_project_btn');
const projectDialog = document.getElementById('project_dialog');
const projectCloseForm = document.getElementById('project_close_form')

// Add todo item form
const addTodoBtn = document.getElementById('add_todo_btn');
const todoDialog = document.getElementById('todo_dialog');
const todoCloseForm = document.getElementById('todo_close_form')

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
}

displayDialog(addProjectBtn, projectDialog);
closeDialog(projectCloseForm, projectDialog);

displayDialog(addTodoBtn, todoDialog);
closeDialog(todoCloseForm, todoDialog);