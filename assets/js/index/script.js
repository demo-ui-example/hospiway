import { preloadImages } from "../../libs/utils.js";
("use strict");
$ = jQuery;
// setup lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// end lenis
function swiperCourse() {
  if (!document.querySelector(".course-swiper")) return;
  var swiper = new Swiper(".course-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".course-list .swiper-button-next",
      prevEl: ".course-list .swiper-button-prev",
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}
function swiperTraining() {
  if (!document.querySelector(".training-swiper")) return;
  var swiper = new Swiper(".training-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".training-list .swiper-button-next",
      prevEl: ".training-list .swiper-button-prev",
    },
    breakpoints: {
      991: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
}
function swiperTeam() {
  if (
    !document.querySelector(".team-image") ||
    !document.querySelector(".swiper-content-team")
  )
    return;
  var swiperTeamImage = new Swiper(".team-image", {
    effect: "fade",
    slidesPerView: 1,
    speed: 900,
    allowTouchMove: false,
  });
  var swiperTeamContent = new Swiper(".swiper-content-team", {
    slidesPerView: 1,
    speed: 900,
    allowTouchMove: false,
    controller: {
      control: swiperTeamImage,
    },
    navigation: {
      nextEl: ".team-left .swiper-button-next",
      prevEl: ".team-left .swiper-button-prev",
    },
    pagination: {
      el: ".team-left .swiper-pagination",
      type: "fraction",
    },
  });
  swiperTeamImage.controller.control = swiperTeamContent;
}
function marquee() {
  document.querySelectorAll(".marquee-container").forEach((container) => {
    const content = container.querySelector(".marquee-content");
    const items = [...container.querySelectorAll(".marquee-item")];
    const speed = parseFloat(container.getAttribute("data-speed")) || 50;

    content.innerHTML = "";
    items.forEach((item) => content.appendChild(item.cloneNode(true)));

    const clonedItems = [...content.children];
    let totalWidth = 0;

    clonedItems.forEach((item) => (totalWidth += item.offsetWidth));

    const containerWidth = container.offsetWidth;
    const copiesNeeded = Math.ceil(containerWidth / totalWidth) + 2;

    for (let i = 0; i < copiesNeeded; i++) {
      clonedItems.forEach((item) => {
        content.appendChild(item.cloneNode(true));
      });
    }

    let fullWidth = 0;
    [...content.children].forEach((item) => (fullWidth += item.offsetWidth));

    gsap.set(content, {
      x: 0,
      willChange: "transform",
      force3D: true,
    });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(content, {
      x: -fullWidth,
      duration: fullWidth / speed,
      ease: "none",
      modifiers: {
        x: (x) => `${parseFloat(x) % fullWidth}px`,
      },
    });

    // Hover pause
    const pause = parseFloat(container.getAttribute("hover-pause")) || false;
    if (pause) {
      container.addEventListener("mouseenter", () => tl.pause());
      container.addEventListener("mouseleave", () => tl.resume());
    }
  });
}
function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select"
  );

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");
    const displayText = dropdown.querySelector(".dropdown-custom-text");

    // Kiểm tra loại dropdown
    const isSelectType = dropdown.classList.contains("dropdown-custom-select");

    // Toggle dropdown on button click
    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    // Handle item selection
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        if (isSelectType) {
          // Logic cho dropdown-custom-select
          const optionText = item.textContent;
          displayText.textContent = optionText;
          dropdown.classList.add("selected");
        } else {
          // Logic cho dropdown-custom
          const currentImgEl = valueSelect.querySelector("img");
          const currentImg = currentImgEl ? currentImgEl.src : "";
          const currentText = valueSelect.querySelector("span").textContent;
          const clickedHtml = item.innerHTML;

          valueSelect.innerHTML = clickedHtml;

          const isSelectTime = currentText.trim() === "Time";

          if (!isSelectTime) {
            if (currentImg) {
              item.innerHTML = `<span>${currentText}</span><img src="${currentImg}" alt="" />`;
            } else {
              item.innerHTML = `<span>${currentText}</span>`;
            }
          }
        }

        closeAllDropdowns();
      });
    });

    // Close dropdown on scroll
    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}
function swiperPageFeedback() {
  if (!document.querySelector(".swiper-teach")) return;
  var swiper = new Swiper(".swiper-teach", {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: ".feedback-teach .swiper-button-next",
      prevEl: ".feedback-teach .swiper-button-prev",
    },
  });
  if (!document.querySelector(".swiper-video")) return;
  var swiper = new Swiper(".swiper-video", {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: ".feedback-video .swiper-button-next",
      prevEl: ".feedback-video .swiper-button-prev",
    },
  });
}
function headerMobile() {
  const headerIcon = document.getElementById("btn-hambuger");
  const mainMenu = document.querySelector(".header-menu");
  headerIcon.addEventListener("click", function () {
    this.classList.toggle("active");
    mainMenu.classList.toggle("active");
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  swiperCourse();
  swiperTraining();
  swiperTeam();
  marquee();
  customDropdown();
  swiperPageFeedback();
  headerMobile();
};
preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});

// loadpage
let isLinkClicked = false;
$("a").on("click", function (e) {
  // Nếu liên kết dẫn đến trang khác (không phải hash link hoặc javascript void)
  if (this.href && !this.href.match(/^#/) && !this.href.match(/^javascript:/)) {
    isLinkClicked = true;
    console.log("1");
  }
});

$(window).on("beforeunload", function () {
  if (!isLinkClicked) {
    $(window).scrollTop(0);
  }
  isLinkClicked = false;
});
