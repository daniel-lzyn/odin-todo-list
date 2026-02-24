import './style.css'

import { displayDialog, closeDialog } from './dialogHandler.js';
import { submitForm, observe as formObserve } from './formHandler.js';

// Classes
class ProjectData {
    constructor(projectTitle, todoList = []) {
        this.projectTitle = projectTitle;
        this.todoList = todoList;
    };
};

// Project data container
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

// Displaying and closing dialog
displayDialog(addProjectBtn, projectDialog);
closeDialog(projectCloseForm, projectDialog);

displayDialog(addTodoBtn, todoDialog);
closeDialog(todoCloseForm, todoDialog);

// Function to store project object.
submitForm(projectForm);

const projectItemStore = function(formObject) {
    projectDialog.close();

    if("projectName" in formObject) {
        projectContainer[formObject.projectName] = new ProjectData(formObject.projectName);
    };
    
    updateProjectItems(projectContainer);
};

formObserve(projectItemStore);

// Project item DOM Manipulator
function updateProjectItems(projectObject) {
    const projectContainer = document.getElementById('project_container');
    projectContainer.replaceChildren();
    
    for (const property in projectObject) {
        const projectDiv = document.createElement('div');
        const projectTitleEl = document.createElement('p');
        const deleteBtn = document.createElement('button');

        projectDiv.classList.add(property);
        deleteBtn.textContent = "Delete";
        projectTitleEl.innerText = property;

        projectDiv.append(projectTitleEl, deleteBtn)
        projectContainer.append(projectDiv);
    };
};

// IIFE to handle project deletion
(function() {
    const projectContainerEl = document.getElementById('project_container');
    projectContainerEl.addEventListener('click', (e) => {
        if(e.target.textContent === "Delete") {
            const selectedProjectEl = e.target.parentNode.classList[0];
            delete projectContainer[selectedProjectEl];
            console.log(projectContainer)
            console.log('deleted')
            selectedProject = "";
        }

        updateProjectItems(projectContainer);
    });
})();

// Function to handle todo form data
submitForm(todoForm);

const todoStoreItem = function(formObject) {
    todoDialog.close();

    const requiredKeys = ["title", "desc", "dueDate", "priority"];
    const keyCheck = requiredKeys.every(key => key in formObject);

    if(keyCheck && selectedProject !== "") {
        projectContainer[selectedProject].todoList.push(formObject);
        refreshTodo();
    } else if (keyCheck && selectedProject === "") {
        alert('Please select a project!');
    };
};

formObserve(todoStoreItem);

// Function to refresh todo list
function refreshTodo() {
    const todoContainer = document.getElementById('todo_container');
    const todoTitle = document.getElementById('todo_title');
    todoContainer.replaceChildren();

    if (selectedProject in projectContainer) {
        const currentTodo = projectContainer[selectedProject];

        todoTitle.textContent = `${currentTodo.projectTitle} todo list:`;
        currentTodo.todoList.forEach(todoItem => {
            const todoDiv = document.createElement('div');

            const todoName = document.createElement('p');
            const todoDesc = document.createElement('p');
            const todoDueDate = document.createElement('p');
            const todoPrioroty = document.createElement('p');
            const deleteBtn = document.createElement('button');

            todoName.textContent = todoItem.title;
            todoDesc.textContent = `Description: ${todoItem.desc}`;
            todoDueDate.textContent = `Due date: ${todoItem.dueDate}`;
            todoPrioroty.textContent = `Priority: ${todoItem.priority}`;
            deleteBtn.textContent = "Delete";

            todoDiv.classList.add(todoName.textContent);
            todoDiv.append(todoName, todoDesc, todoDueDate, todoPrioroty, deleteBtn);
            todoContainer.append(todoDiv);
        });
    };
};

// IIFE to handle todo item deletion
(function() {
    const todoContainer = document.getElementById('todo_container');
    todoContainer.addEventListener('click', (e) => {
        let selectedTodoItem = "";

        if(e.target.textContent === "Delete") {
            selectedTodoItem = e.target.parentNode.classList[0];
        };

        if(selectedTodoItem !== "") {
            const todoIndex = projectContainer[selectedProject].todoList.findIndex(prop => prop.title === selectedTodoItem);
            console.log(selectedTodoItem);
            console.log(projectContainer[selectedProject].todoList)
            console.log(todoIndex);
            delete projectContainer[selectedProject].todoList[todoIndex];
            refreshTodo();
        };
    });
})();

// Adding event listener to projects.
const projectContainerEl = document.getElementById('project_container');

let selectedProject = "";

projectContainerEl.addEventListener('click', (e) => {
    if(e.target.textContent in projectContainer){
        selectedProject = e.target.textContent;
        refreshTodo();
    };
});