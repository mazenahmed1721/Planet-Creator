let planet = {
  type: "earth",
  size: 180
};
const planetEl = document.getElementById("planet");
const typeButtons = document.querySelectorAll(".type-btn");
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
sizeSlider.addEventListener("input", function () {
  planet.size = parseInt(sizeSlider.value);
  updatePlanet();
});
function updatePlanet() {
  planetEl.className = "planet " + planet.type;
  planetEl.style.width = planet.size + "px";
  planetEl.style.height = planet.size + "px";
}
