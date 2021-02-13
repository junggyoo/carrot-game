"use strict";

export default class PopUp {
  constructor() {
    this.popup = document.querySelector(".popup");
    this.popupMessage = document.querySelector(".popupMessage");
    this.popupReplay = document.querySelector(".popupReplay");
    this.popupReplay.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popupMessage.innerText = text;
    this.popup.style.display = "flex";
  }

  hide() {
    this.popup.style.display = "none";
  }
}
