"use strict";

const searchButton = document.querySelector(".random");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
let btnCloseModal = document.querySelector(".close-modal");
const h2 = document.querySelector(".spell_name");
const p = document.querySelector(".spell_descr");
const text = document.querySelector(".text");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  text.innerHTML = "";
  btnCloseModal = document.querySelector(".close-modal");
};

const loadSpells = async function () {
  const res = await fetch(`https://hp-api.onrender.com/api/spells`);
  const data = await res.json();

  const buttons = [];
  for (let i = 0; i < data.length; i++) {
    buttons[i] = document.createElement("button");
    buttons[i].innerText = `${data[i].name}`;
    buttons[i].className = "spells";
    buttons[i].id = `spell${i}`;
    document.body.appendChild(buttons[i]);
  }
  for (let j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", function () {
      const html = `
  
      <h2 class="spell_name">🔮 ${data[j].name}</h2>
      <p class="spell_descr">${data[j].description}</p>    
      `;
      text.insertAdjacentHTML("beforeend", html);
      openModal();
    });
  }
};

loadSpells();

const displaySpell = async function () {
  const spellnumber = Math.floor(Math.random() * 76) + 1;
  const res = await fetch(`https://hp-api.onrender.com/api/spells`);
  const data = await res.json();
  const html = `
      <h2 class="spell_name">🔮 ${data[spellnumber].name}</h2>
      <p class="spell_descr">${data[spellnumber].description}</p>    
      `;
  text.insertAdjacentHTML("beforeend", html);
  openModal();
  // console.log(data[spellnumber].name, data[spellnumber].description);
};

searchButton.addEventListener("click", function () {
  displaySpell();
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
