import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
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
    });
  }
}
