import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputElements = this._form.querySelectorAll(".popup__input");
    const formData = {};

    inputElements.forEach((input) => {
      if (input.name === "date") {
        const date = new Date(input.value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        formData[input.name] = date;
      } else {
        formData[input.name] = input.value.trim();
      }
    });

    return formData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
