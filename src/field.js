"use strict";

import * as sound from "./sound.js";

const CARROT_SIZE = 80;
const BUG_SIZE = 50;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameField = document.querySelector(".gameField");
    this.fieldRect = this.gameField.getBoundingClientRect();
    this.gameField.addEventListener("click", this.onClick);
  }

  init() {
    this.gameField.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png", CARROT_SIZE);
    this._addItem("bug", this.bugCount, "img/bug.png", BUG_SIZE);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath, itemSize) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - itemSize;
    const y2 = this.fieldRect.height - itemSize;

    for (let i = 0; i < count; i++) {
      const carrotImg = document.createElement("img");
      carrotImg.setAttribute("src", imgPath);
      carrotImg.setAttribute("alt", "carrot");
      carrotImg.setAttribute("class", className);
      carrotImg.setAttribute("id", `carrot${i}`);
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      carrotImg.style.transform = `translate(${x}px, ${y}px)`;
      this.gameField.appendChild(carrotImg);
    }
  }

  onClick = (e) => {
    const target = e.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
