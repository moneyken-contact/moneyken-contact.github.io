const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const aboutToggle = document.querySelector(".about-toggle");
const aboutLayout = document.querySelector(".about-layout");

if (aboutToggle && aboutLayout) {
  aboutToggle.addEventListener("click", () => {
    const isExpanded = aboutToggle.getAttribute("aria-expanded") === "true";
    aboutToggle.setAttribute("aria-expanded", String(!isExpanded));
    aboutLayout.classList.toggle("expanded", !isExpanded);
    aboutToggle.querySelector(".toggle-label").textContent = isExpanded
      ? "Читать подробнее"
      : "Свернуть";
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
