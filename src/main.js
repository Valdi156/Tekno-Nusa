import './style.css'

  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const menu = document.getElementById('menu');
  const sidebar = menu.querySelector('div');

  menuBtn.addEventListener('click', () => {
    menu.classList.remove('hidden');
    requestAnimationFrame(() => {
      sidebar.classList.remove('translate-x-full');
    });
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.add('translate-x-full');
    sidebar.addEventListener(
      'transitionend',
      () => {
        if (sidebar.classList.contains('translate-x-full')) {
          menu.classList.add('hidden');
        }
      },
      { once: true }
    );
  });

  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      sidebar.classList.add('translate-x-full');
      sidebar.addEventListener(
        'transitionend',
        () => {
          if (sidebar.classList.contains('translate-x-full')) {
            menu.classList.add('hidden');
          }
        },
        { once: true }
      );
    }
  });

const wrapper = document.getElementById('logo-wrapper');
if (wrapper) {
  const logos = wrapper.querySelectorAll('.logo');

  logos.forEach(logo => {
    logo.addEventListener('mousedown', () => wrapper.classList.add('paused'));
    logo.addEventListener('touchstart', () => wrapper.classList.add('paused'));

    logo.addEventListener('mouseup', () => wrapper.classList.remove('paused'));
    logo.addEventListener('mouseleave', () => wrapper.classList.remove('paused'));
    logo.addEventListener('touchend', () => wrapper.classList.remove('paused'));
  });
}

const cases = {
  website: [
    {
      text: "Sejak tahun 2019 Gadjah Mada Medical Center",
      detail: "Sistem tersebut memberikan kemudahan dalam pengelolaan data dan menunjang keperluan farmasi, keuangan, serta pelayanan pasien.",
      image: "/Cover.png"
    },
    {
      text: "Website E-Commerce Fashion...",
      detail: "Kami membangun platform e-commerce dengan desain modern dan payment gateway terintegrasi.",
      image: "/Cover.png"
    }
  ],
  mobile: [
    {
      text: "Aplikasi Mobile Banking...",
      detail: "Kami membantu bank membangun aplikasi mobile yang aman, cepat, dan user-friendly.",
      image: "/Cover.png"
    }
  ],
  edu: [
    {
      text: "Game Edukasi Anak...",
      detail: "Game edukasi interaktif untuk membantu anak belajar sambil bermain.",
      image: "/Cover.png"
    }
  ]
};

let currentCategory = "website";
let currentIndex = 0;
let autoSlideInterval;

const caseContainer = document.getElementById("case-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const tabBtns = document.querySelectorAll(".tab-btn");

function renderCase() {
  const item = cases[currentCategory][currentIndex];

  const caseItem = document.createElement("div");
  caseItem.className = "case-item flex flex-col md:flex-row items-center gap-8";

  caseItem.innerHTML = `
    <div class="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
      <h2 class="text-lg md:text-2xl text-white font-space font-bold mb-4">
        ${item.text}
      </h2>
      <p class="text-gray-300 text-sm md:text-base leading-relaxed">
        ${item.detail}
      </p>
    </div>

    <div class="flex justify-center md:justify-end w-full md:w-1/2 order-1 md:order-2">
      <img src="${item.image}" alt=""
           class="w-72 h-72 md:w-96 md:h-96 object-cover rounded-lg shadow-lg">
    </div>
  `;

  const oldItem = caseContainer.querySelector(".case-item.active");
  if (oldItem) {
    oldItem.classList.remove("active");
    setTimeout(() => oldItem.remove(), 600);
  }

  caseContainer.appendChild(caseItem);
  setTimeout(() => caseItem.classList.add("active"), 50);
}

function prevCase() {
  const length = cases[currentCategory].length;
  currentIndex = (currentIndex - 1 + length) % length;
  renderCase();
  resetAutoSlide();
}

function nextCase() {
  const length = cases[currentCategory].length;
  currentIndex = (currentIndex + 1) % length;
  renderCase();
  resetAutoSlide();
}

prevBtn.addEventListener("click", prevCase);
nextBtn.addEventListener("click", nextCase);

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    currentIndex = 0;
    tabBtns.forEach(b =>
      b.classList.remove("bg-gradient-to-r", "from-indigo-800", "to-cyan-500")
    );
    tabBtns.forEach(b => b.classList.add("border-2", "border-cyan-500"));

    btn.classList.remove("border-2", "border-cyan-500");
    btn.classList.add("bg-gradient-to-r", "from-indigo-800", "to-cyan-500");

    renderCase();
    resetAutoSlide();
  });
});

function startAutoSlide() {
  autoSlideInterval = setInterval(nextCase, 5000);
}
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

renderCase();
startAutoSlide();

const revealEls = document.querySelectorAll(
  '.scroll-animate, .scroll-zoom, .scroll-left, .scroll-right, .scroll-pop'
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach(el => observer.observe(el));