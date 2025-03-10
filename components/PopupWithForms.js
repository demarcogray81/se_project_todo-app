import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputElements = Array.from(
      this._form.querySelectorAll(".popup__input")
    );
  }

  getForm() {
    return this._form;
  }

  _getInputValues() {
    const formData = {};
    this._inputElements.forEach((input) => {
      formData[input.name] = input.value;
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
  }
}

export default PopupWithForm;
