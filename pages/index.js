import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", closeOnEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", closeOnEscape);
};

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".popup_visible");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

// The logic in this function should all be handled in the Todo class.
const renderTodo = (data) => {
  const todo = new Todo(data, "#todo-template").getView();
  todosList.append(todo);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  renderTodo(values);
  addTodoForm.reset();
  formVal.resetValidation();
  closeModal(addTodoPopup);
});

initialTodos.forEach(renderTodo);

const formVal = new FormValidator(validationConfig, addTodoForm);
formVal.enableValidation();
