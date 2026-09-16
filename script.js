let planet = {
  type: "earth",
  size: 180,
  rings: true,
  moons: 0
};
const planetEl = document.getElementById("planet");
const ringEl = document.getElementById("ring");
const moonsEl = document.getElementById("moons");
const typeButtons = document.querySelectorAll(".type-btn");
const ringButtons = document.querySelectorAll(".ring-btn");
const moonButtons = document.querySelectorAll(".moon-btn");
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
moonButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    moonButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    planet.moons = parseInt(btn.dataset.moons);
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
  buildMoons();
}
function buildMoons() {
  moonsEl.innerHTML = "";
  for (let i = 0; i < planet.moons; i++) {
    const radius = planet.size / 2 + 30 + i * 20;
    const speed = 6 + i * 3;
    const moon = document.createElement("div");
    moon.className = "moon";
    moon.style.setProperty("--orbit-radius", radius + "px");
    moon.style.animationDuration = speed + "s";
    moon.style.marginLeft = "-11px";
    moon.style.marginTop = "-11px";
    moonsEl.appendChild(moon);
  }
}