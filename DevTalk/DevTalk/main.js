/* ---------- Lien actif de la navbar ---------- */
const links = document.querySelectorAll(".navbar__links a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});


/* ---------- Register Now : le bouton devient un champ email ---------- */
document.querySelectorAll(".reg").forEach((reg) => {
  const btn = reg.querySelector(".reg__btn");
  const form = reg.querySelector(".reg__form");
  const input = reg.querySelector("input");
  const msg = reg.querySelector(".reg__msg");

  function close() {
    reg.classList.remove("open");
    form.reset();
    msg.textContent = "";
    msg.className = "reg__msg";
  }

  // clic sur le bouton -> afficher le champ
  btn.addEventListener("click", () => {
    reg.classList.add("open");
    input.focus();
  });

  // touche Echap -> revenir au bouton
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // clic en dehors -> revenir au bouton (si le champ est vide)
  document.addEventListener("click", (e) => {
    if (reg.classList.contains("open") && !reg.contains(e.target) && !input.value.trim()) {
      close();
    }
  });

  // envoi
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.textContent = "Please enter a valid email.";
      msg.className = "reg__msg error";
      return;
    }

    // sauvegarde locale (temporaire)
    const saved = JSON.parse(localStorage.getItem("devtalk_emails") || "[]");
    if (!saved.includes(email)) saved.push(email);
    localStorage.setItem("devtalk_emails", JSON.stringify(saved));

    msg.textContent = "Thank you! You're registered ✔";
    msg.className = "reg__msg success";

    setTimeout(close, 2000);
  });
});