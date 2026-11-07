const benchmark = {
  10: [6.03, 6.10, 6.10, 6.10],
  50: [9.35, 8.73, 9.12, 9.25],
  75: [10.75, 8.50, 10.09, 10.35],
  100: [11.18, 6.06, 8.98, 10.70]
};

const buttons = document.querySelectorAll("[data-size]");
for (const button of buttons) {
  button.addEventListener("click", () => {
    const size = button.dataset.size;
    const reductions = benchmark[size];
    for (const item of buttons) item.setAttribute("aria-pressed", String(item === button));
    document.querySelectorAll("#bench-values td").forEach((cell, index) => {
      cell.textContent = [0, ...reductions][index].toFixed(2) + "%";
    });
    for (const chart of ["convergence", "routes"]) {
      const file = "assets/" + chart + "-" + size + ".png";
      const image = document.getElementById(chart);
      image.src = file;
      image.alt = (chart === "routes" ? "Route maps for all five planners" : "Search convergence for all five planners") + " on the " + size + "-stop instance";
      document.getElementById(chart + "-link").href = file;
    }
  });
}
