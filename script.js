let planet = {
  type: "earth",
  size: 180,
  rings: true
};
const planetEl = document.getElementById("planet");
const ringEl = document.getElementById("ring");
const typeButtons = document.querySelectorAll(".type-btn");
const ringButtons = document.querySelectorAll(".ring-btn");
const sizeSlider = document.getElementById("sizeSlider");
typeButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    typeButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    planet.type = btn.dataset.type;
    updatePlanet();
  });
});
ringButtons.forEach(function (btn) {
  btn.addEventListener("click", function (){
    ringButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    planet.rings = btn.dataset.rings === "on";
    updatePlanet();
  });
});
sizeSlider.addEventListener("input", function () {
  planet.size = parseInt(sizeSlider.value);
  updatePlanet();
});
function updatePlanet() {
  planetEl.className = "planet " + planet.type;
  planetEl.style.width = planet.size + "px";
  planetEl.style.height = planet.size + "px";
  if (planet.rings) {
    ringEl.classList.remove("hidden");
  } else {
    ringEl.classList.add("hidden");
  }
}
