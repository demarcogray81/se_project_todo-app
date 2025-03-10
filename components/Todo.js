class Todo {
  constructor(data, selector, todoCounter, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._todoCounter = todoCounter;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListener() {
    this._todoCheckboxEl.addEventListener("click", () => {
      this._handleCheck(this._todoCheckboxEl.checked);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._todoCounter.updateTotal(false);
      if (this._todoCheckboxEl.checked) {
        this._todoCounter.updateCompleted(false);
      }
    });
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        todoDate.textContent = `Due: ${dueDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    } else {
      todoDate.remove();
    }

    this._generateCheckBoxEl();
    this._setEventListener();

    return this._todoElement;
  }
}

export default Todo;
