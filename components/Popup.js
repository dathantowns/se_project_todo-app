class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
  }
  open() {
    this._popupElement.classList.add("popup_visible");
    this.setEventListeners();
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", (evt) =>
      this._handleEscapeClose(evt)
    );
  }
  _handleEscapeClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });
    document.addEventListener("keydown", (evt) => this._handleEscapeClose(evt));
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, totalHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._totalHandler = totalHandler;
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
  }
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this._totalHandler(true);
    });
  }
}

export { Popup, PopupWithForm };
