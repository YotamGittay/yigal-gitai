const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const progress = document.querySelector(".progress span");
const PRICE = 88;

const onScroll = () => {
  const scrolled = window.scrollY;
  nav.classList.toggle("scrolled", scrolled > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (scrolled / max) * 100 : 0}%`;
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const qty = document.getElementById("qty");
const total = document.getElementById("total");
const orderBtn = document.getElementById("orderBtn");

const renderOrder = () => {
  const n = Math.max(1, Number(qty.value) || 1);
  qty.value = String(n);
  total.textContent = `₪${(n * PRICE).toFixed(2)}`;
  const body = `שלום,\n\nאשמח להזמין ${n} עותק של הספר בין מילותיי.\nסה"כ: ₪${(n * PRICE).toFixed(2)}\n`;
  orderBtn.href = `mailto:gittayi@gmail.com?subject=${encodeURIComponent("הזמנת הספר בין מילותיי")}&body=${encodeURIComponent(body)}`;
};

document.getElementById("qtyPlus").addEventListener("click", () => {
  qty.value = String(Number(qty.value) + 1);
  renderOrder();
});
document.getElementById("qtyMinus").addEventListener("click", () => {
  qty.value = String(Math.max(1, Number(qty.value) - 1));
  renderOrder();
});
renderOrder();

document.getElementById("lead").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const note = document.getElementById("leadNote");
  if (!name || !email) {
    note.textContent = "נא למלא שם ומייל.";
    return;
  }
  const body = `שם: ${name}\nמייל: ${email}\n\nבקשה להצטרפות לרשימת התפוצה.`;
  window.location.href = `mailto:gittayi@gmail.com?subject=${encodeURIComponent("רשימת תפוצה")}&body=${encodeURIComponent(body)}`;
  note.textContent = "נפתחה פניית דוא״ל. אם היא לא נפתחה, כתבו ישירות אל gittayi@gmail.com";
  event.currentTarget.reset();
});
