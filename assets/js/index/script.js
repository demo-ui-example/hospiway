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
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: ".course-list .swiper-button-next",
      prevEl: ".course-list .swiper-button-prev",
    },
  });
}
function swiperTraining() {
  if (!document.querySelector(".training-swiper")) return;
  var swiper = new Swiper(".training-swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: ".training-list .swiper-button-next",
      prevEl: ".training-list .swiper-button-prev",
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
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  swiperCourse();
  swiperTraining();
  swiperTeam();
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
