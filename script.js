let planet = {
  name: "Unnamed World",
  type: "earth",
  size: 180,
  rings: true,
  moons: 0,
  atmosphere: "normal",
};
const planetEl = document.getElementById("planet");
const ringEl = document.getElementById("ring");
const moonsEl = document.getElementById("moons");
const typeButtons = document.querySelectorAll(".type-btn");
const ringButtons = document.querySelectorAll(".ring-btn");
const moonButtons = document.querySelectorAll(".moon-btn");
const sizeSlider = document.getElementById("sizeSlider");
const atmosphereSelect = document.getElementById("atmosphereSelect");
const randomBtn = document.getElementById("randomBtn");
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
  btn.addEventListener("click", function () {
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
atmosphereSelect.addEventListener("change", function () {
  planet.atmosphere = atmosphereSelect.value;
  updatePlanet();
});
randomBtn.addEventListener("click", function () {
  generateRandomPlanet();
});
function updatePlanet() {
  planetEl.className = "planet " + planet.type + " atmo-" + planet.atmosphere;
  planetEl.style.width = planet.size + "px";
  planetEl.style.height = planet.size + "px";
  if (planet.rings) {
    ringEl.classList.remove("hidden");
  } else {
    ringEl.classList.add("hidden");
  }
  buildMoons();
  updateStats();
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
function getStats() {
  const sizeFactor = planet.size / 180;
  const diameter = Math.round(12700 * sizeFactor);
  const gravity = (1 * sizeFactor).toFixed(1);
  let temperature = 24;
  let life = "Possible";
  if (planet.type === "lava") {
    temperature = 847;
    life = "Unlikely";
  } else if (planet.type === "ice") {
    temperature = -120;
    life = "Unlikely";
  } else if (planet.type === "desert") {
    temperature = 58;
    life = "Rare";
  } else if (planet.type === "alien") {
    temperature = -12;
    life = "Unknown";
  } else if (planet.type === "earth") {
    temperature = 24;
    life = "Possible";
  }
  if (planet.atmosphere === "none") {
    temperature = temperature + 20;
  } else if (planet.atmosphere === "dense") {
    temperature = temperature + 15;
  }
  return {
    diameter: diameter,
    gravity: gravity,
    temperature: temperature,
    life: life,
  };
}
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function updateStats() {
  const stats = getStats();
  document.getElementById("statName").textContent = planet.name;
  document.getElementById("statType").textContent = capitalize(planet.type);
  document.getElementById("statDiameter").textContent =
    stats.diameter.toLocaleString() + " km";
  document.getElementById("statMoons").textContent = planet.moons;
  document.getElementById("statGravity").textContent = stats.gravity + "g";
  document.getElementById("statTemp").textContent = stats.temperature + "°C";
  document.getElementById("statLife").textContent = stats.life;
}
function generateRandomPlanet() {
  const types = ["earth", "lava", "ice", "desert", "alien"];
  const atmospheres = ["none", "thin", "normal", "dense"];
  planet.type = types[Math.floor(Math.random() * types.length)];
  planet.size = Math.floor(Math.random() * 160) + 100;
  planet.atmosphere =
    atmospheres[Math.floor(Math.random() * atmospheres.length)];
  planet.moons = Math.floor(Math.random() * 4);
  planet.rings = Math.random() > 0.5;
  typeButtons.forEach(function (b) {
    b.classList.toggle("active", b.dataset.type === planet.type);
  });
  moonButtons.forEach(function (b) {
    b.classList.toggle("active", parseInt(b.dataset.moons) === planet.moons);
  });
  ringButtons.forEach(function (b) {
    const isOn = b.dataset.rings === "on";
    b.classList.toggle("active", isOn === planet.rings);
  });
  sizeSlider.value = planet.size;
  atmosphereSelect.value = planet.atmosphere;
  updatePlanet();
}
