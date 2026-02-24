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
const todoForm = document.getElementById('todo_form');

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

function updateProjectItems(projectObject) {
    const projectContainer = document.getElementById('project_container');
    projectContainer.replaceChildren();
    
    for (const property in projectObject) {
        const projectTitleEl = document.createElement('p');
        projectTitleEl.innerText = property;
        projectContainer.append(projectTitleEl);
    };
};

// Function to handle project form data
function submitForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        for(const pair of formData.entries()) {
            projectContainer[pair[1]] = new ProjectData(pair[1]);
            projectDialog.close();
            updateProjectItems(projectContainer);
        };
    });
};

// Function to handle todo form data
function submitTodoForm(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(selectedProject !== "") {
            const formData = new FormData(form);
            const todoObject = {};

            for(const pair of formData.entries()) {
                todoObject[pair[0]] = pair[1];
            };
            projectContainer[selectedProject].todoList.push(todoObject);
            todoDialog.close();
            refreshTodo();
        };

        if(selectedProject === "") {
            alert("Plase select a project first!");
        };
    });
}

displayDialog(addProjectBtn, projectDialog);
closeDialog(projectCloseForm, projectDialog);
submitForm(projectForm);

displayDialog(addTodoBtn, todoDialog);
closeDialog(todoCloseForm, todoDialog);
submitTodoForm(todoForm);

// Function to refresh todo list
function refreshTodo() {
    const todoContainer = document.getElementById('todo_container');
    const todoTitle = document.getElementById('todo_title');
    todoContainer.replaceChildren();

    if (selectedProject in projectContainer) {
        const currentTodo = projectContainer[selectedProject];
        const todoDiv = document.createElement('div');

        todoTitle.textContent = `${currentTodo.projectTitle} todo list:`;
        currentTodo.todoList.forEach(todoItem => {
            const todoName = document.createElement('p');
            const todoDesc = document.createElement('p');
            const todoDueDate = document.createElement('p');
            const todoPrioroty = document.createElement('p');

            todoName.textContent = todoItem.title;
            todoDesc.textContent = `Description: ${todoItem.desc}`;
            todoDueDate.textContent = `Due date: ${todoItem.dueDate}`;
            todoPrioroty.textContent = `Priority: ${todoItem.priority}`;

            todoDiv.append(todoName, todoDesc, todoDueDate, todoPrioroty);
            todoContainer.append(todoDiv);
        });
    };
};

// Adding event listener to projects.
const projectContainerEl = document.getElementById('project_container');

let selectedProject = "";

projectContainerEl.addEventListener('click', (e) => {
    selectedProject = e.target.textContent;
    refreshTodo();
});