import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleTotal(increment) {
  todoCounter.updateTotal(increment);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleTotal);
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosListSection.addItem(todo);
};

const todosListSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

todosListSection.renderItems();

addTodoButton.addEventListener("click", () => {
  todoPopup.open();
});

const validator = new FormValidator(validationConfig, addTodoForm);
validator.enableValidation();

const todoPopup = new PopupWithForm("#add-todo-popup", (data) => {
  const name = data.name;
  const dateInput = data.date;
  const id = uuidv4();

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date, id };
  renderTodo(values);
  validator.resetForm();
  todoPopup.close();
  todoCounter;
  handleTotal(true);
});
todoPopup.setEventListeners();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
