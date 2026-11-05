/* ---------- Active link in the navbar ---------- */
const links = document.querySelectorAll(".navbar__links a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});


/* ---------- Hamburger menu (mobile) ---------- */
const navbar = document.querySelector(".navbar");
const toggle = document.querySelector(".navbar__toggle");

toggle.addEventListener("click", () => {
  const open = navbar.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", open);
});

// close the menu when a link is clicked
links.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});


/* ---------- Register Now: button becomes an email field ---------- */
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

  // click on the button -> show the field
  btn.addEventListener("click", () => {
    reg.classList.add("open");
    input.focus();
  });

  // Escape key -> back to the button
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // click outside -> back to the button (if the field is empty)
  document.addEventListener("click", (e) => {
    if (reg.classList.contains("open") && !reg.contains(e.target) && !input.value.trim()) {
      close();
    }
  });

  // submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.textContent = "Please enter a valid email.";
      msg.className = "reg__msg error";
      return;
    }

    // local save (temporary)
    const saved = JSON.parse(localStorage.getItem("devtalk_emails") || "[]");
    if (!saved.includes(email)) saved.push(email);
    localStorage.setItem("devtalk_emails", JSON.stringify(saved));

    msg.textContent = "Thank you! You're registered ✔";
    msg.className = "reg__msg success";

    setTimeout(close, 2000);
  });
});