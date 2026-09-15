let planet = {
  type: "earth",
};
const planetEl = document.getElementById("planet");
const typeButtons = document.querySelectorAll(".type-btn");
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
function updatePlanet() {
  planetEl.className = "planet " + planet.type;
}
