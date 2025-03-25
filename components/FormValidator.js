class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }
  _showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  _hideInputError(formElement, inputElement, settings) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  }
  _checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      this._hideInputError(formElement, inputElement, settings);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, settings) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  resetForm() {
    this._inputList.forEach((inputElement) => {
      inputElement.value = "";
    });
    this._toggleButtonState(
      this._inputList,
      this._buttonElement,
      this._settings
    );
  }

  _setEventListeners(formElement, settings) {
    this._inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );

    this._toggleButtonState(this._inputList, buttonElement, settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, settings);
        this._toggleButtonState(this._inputList, buttonElement, settings);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement, this._settings);
  }
}

export default FormValidator;
