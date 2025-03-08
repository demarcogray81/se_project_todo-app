// Import necessary modules and components
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForms.js";
import TodoCounter from "../components/TodoCounter.js";
// ... other imports

// DOM elements selection
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Initialize popup form with submit handler
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const id = uuidv4();

    // Adjust date for timezone
    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const values = { ...formData, date, id };

    renderTodo(values);
    todoCounter.updateTotal(true);
    formVal.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(todoId) {
  // Find the todo in initialTodos array
  const todoIndex = initialTodos.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    // If the todo was completed, update the completed counter
    if (initialTodos[todoIndex].completed) {
      todoCounter.updateCompleted(false);
    }
    // Remove the todo from the array
    initialTodos.splice(todoIndex, 1);
    // Update the total counter
    todoCounter.updateTotal(false);
  }
}

// Helper function to create and render new todo items
const renderTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    todoCounter,
    handleCheck,
    handleDelete
  ).getView();
  section.addItem(todo);
};

// Initialize section with initial todos and rendering logic
const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

// Render initial todos
section.renderItems();

// Event Listeners
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// Initialize form validation
const formVal = new FormValidator(validationConfig, addTodoForm);
formVal.enableValidation();
