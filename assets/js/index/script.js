import { preloadImages } from "../../libs/utils.js";
("use strict");
$ = jQuery;
// setup lenis
// const lenis = new Lenis();
// lenis.on("scroll", ScrollTrigger.update);
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000);
// });

// gsap.ticker.lagSmoothing(0);
// end lenis
function swiperCourse() {
  if (!document.querySelector(".course-swiper")) return;
  var swiper = new Swiper(".course-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".course-list .swiper-button-next",
      prevEl: ".course-list .swiper-button-prev"
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
}
function swiperIntruct() {
  if (!document.querySelector(".swiper-instruct")) return;
  var swiper = new Swiper(".swiper-instruct", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".instruct-list .swiper-button-next",
      prevEl: ".instruct-list .swiper-button-prev"
    },
    breakpoints: {
      991: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}
function swiperTraining() {
  if (!document.querySelector(".training-swiper")) return;
  var swiper = new Swiper(".training-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".training-list .swiper-button-next",
      prevEl: ".training-list .swiper-button-prev"
    },
    breakpoints: {
      991: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
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
    allowTouchMove: true,
    breakpoints: {
      991: {
        allowTouchMove: false
      }
    }
  });

  var swiperTeamContent = new Swiper(".swiper-content-team", {
    slidesPerView: 1,
    speed: 600,
    effect: "fade",
    allowTouchMove: true,
    controller: {
      control: swiperTeamImage
    },
    breakpoints: {
      991: {
        allowTouchMove: false
      }
    },
    navigation: {
      nextEl: ".team-left .swiper-button-next",
      prevEl: ".team-left .swiper-button-prev"
    },
    pagination: {
      el: ".team-left .swiper-pagination",
      type: "fraction"
    },
    on: {
      slideChangeTransitionStart: function () {
        const allSlides = document.querySelectorAll(
          ".swiper-content-team .swiper-slide"
        );
        allSlides.forEach((slide) => {
          const elements = slide.querySelectorAll(
            ".name, .position, .team-box-item"
          );
          elements.forEach((el) => el.classList.remove("fade-in-up"));
        });

        setTimeout(() => {
          const activeSlide = this.slides[this.activeIndex];
          const elements = activeSlide.querySelectorAll(
            ".name, .position, .team-box-item"
          );

          elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.08}s`;
            el.classList.add("fade-in-up");
          });
        }, 200);
      },
      init: function () {
        const activeSlide = this.slides[this.activeIndex];
        const elements = activeSlide.querySelectorAll(
          ".name, .position, .team-box-item"
        );

        elements.forEach((el, index) => {
          el.style.animationDelay = `${index * 0.08}s`;
          el.classList.add("fade-in-up");
        });
      }
    }
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
      force3D: true
    });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(content, {
      x: -fullWidth,
      duration: fullWidth / speed,
      ease: "none",
      modifiers: {
        x: (x) => `${parseFloat(x) % fullWidth}px`
      }
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
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".feedback-teach .swiper-button-next",
      prevEl: ".feedback-teach .swiper-button-prev"
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
  if (!document.querySelector(".swiper-video")) return;
  var swiper = new Swiper(".swiper-video", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".feedback-video .swiper-button-next",
      prevEl: ".feedback-video .swiper-button-prev"
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
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
function effectFade() {
  gsap.utils
    .toArray(".data-fade-in, .fade-in-left, .fade-in-right")
    .forEach((element) => {
      let xValue = 0;
      if (element.classList.contains("fade-in-left")) xValue = -30;
      if (element.classList.contains("fade-in-right")) xValue = 30;

      gsap.fromTo(
        element,
        {
          "will-change": "opacity, transform",
          opacity: 0,
          y: 20,
          x: xValue
        },
        {
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 80%"
          },
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.5,
          ease: "sine.out"
        }
      );
    });
}

function registerForm() {
  if ($(".form-register-wrapper").length < 1) return;

  const form = $(".form-register-wrapper form");

  form.on("submit", function (e) {
    e.preventDefault();

    const fields = {
      name: form.find("input[name='name']"),
      phone: form.find("input[name='phonenumber']"),
      email: form.find("input[name='email']"),
      course: form.find(".dropdown-custom-text")
    };

    const message = form.find("textarea");

    // Reset lỗi
    form.find(".error-message").remove();
    form.find(".error").removeClass("error");

    let isValid = true;

    // Validate input/name/phone/email
    $.each(fields, (key, field) => {
      const value = key === "course" ? field.text().trim() : field.val().trim();

      if (!value) {
        field.addClass("error");
        isValid = false;
      }
    });

    if (!isValid) return;

    // AJAX
    $.ajax({
      type: "POST",
      url: ajaxUrl,
      data: {
        action: "form_register_course",
        name: fields.name.val().trim(),
        phone: fields.phone.val().trim(),
        email: fields.email.val().trim(),
        course: fields.course.text().trim(),
        message: message.val().trim()
      },
      beforeSend: function () {
        form.find("button[type='submit']").addClass("aloading");
      },
      success: function (res) {
        form.find("button[type='submit']").removeClass("aloading");
        $("#modalBookingSuccess").modal("show");

        form[0].reset();
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
      }
    });
  });
}

let lightboxInstance;

function sectionIntructionModal() {
  if (
    $("section.instruct").length < 1 &&
    $(".feeback-sec .feedback-video").length < 1 &&
    $(".introduction").length < 1
  )
    return;

  if ($(".glightbox").length === 0) return;

  if (!lightboxInstance) {
    lightboxInstance = GLightbox({
      selector: ".glightbox",
      loop: true,
      touchNavigation: true,
      autoplayVideos: true
    });
  }
}

function playVideoIntro() {
  if ($(".introduction-video-wrapper").length < 1) return;

  const wrapper = $(".introduction-video-wrapper");
  const img = wrapper.find("img");
  const video = wrapper.find("video").get(0);
  const control = wrapper.find(".ic-control");

  video.loop = true;

  control.on("click", function () {
    img.hide();
    control.hide();
    video.muted = false;
    video.volume = 1;
    video.play();
  });

  $(video).on("click", function () {
    if (!video.paused) {
      video.pause();
      video.currentTime = 0;
      img.show();
      control.show();
    }
  });
}

function courseDetail() {
  if ($("#modalCourseSuccess").length < 1) return;
}

function sectionIntro() {
  if ($(".introduction").length < 1) return;

  gsap.from(".introduction .col-left li", {
    scrollTrigger: {
      trigger: ".introduction .col-left",
      start: "top 80%"
    },
    opacity: 0,
    x: -40,
    duration: 0.5,
    stagger: 0.2,
    ease: "power2.out"
  });
}

function initFadeInSections() {
  const sections = document.querySelectorAll(".has-item-fade-in");

  sections.forEach((section) => {
    const items = section.querySelectorAll(".fade-in-item");
    if (items.length < 1) return;

    gsap.from(items, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.4,
      stagger: 0.2,
      ease: "power2.out"
    });
  });
}

function updateCompleteLesson() {
  $(".lesson-list").on("click", ".complete-lesson", function () {
    let btn = $(this);
    let parent = btn.closest(".lesson-item");
    let lessonID =
      parent.data("lesson-id") ||
      parent.attr("href").split("/").filter(Boolean).pop();

    const courseID = $(".course-detail .course-detail__video").data(
      "course-id"
    );

    $.ajax({
      url: ajaxUrl,
      type: "POST",
      data: {
        action: "mark_lesson_complete",
        lesson_id: lessonID,
        course_id: courseID
      },
      beforeSend: function () {
        btn.addClass("aloading");
      },
      success: function (res) {
        if (res.success) {
          // đổi giao diện
          parent.addClass("done");

          btn.addClass("d-none");
          parent.find(".continue").removeClass("d-none");

          // cập nhật progress (nếu có)
          updateProgressBar();
        }

        if (res.data.course_completed) {
          $(".course-detail .announcement").removeClass("d-none");
        }
      }
    });
  });
}

function updateProgressBar() {
  let done = $(".lesson-item.done").length;
  let total = $(".lesson-item").length;

  let percent = Math.round((done / total) * 100);

  $(".course-progress").css("--progress", percent + "%");
  $(".progress-value").text(percent + "%");

  // nếu hoàn thành 100% thì mở modal
  if (percent >= 100) {
    // $("#modalCourseSuccess").modal("show");
  }
}

// course detail
function lessonCompleteHandler() {
  const box = document.querySelector(".course-detail__video");
  if (!box) return;

  const lessonId = box.dataset.lessonId;
  const lessonType = box.dataset.lessonType;
  const lessonDuration = parseInt(box.dataset.lessonDuration || 0);

  if (lessonType === "video") {
    handleVideoLesson(lessonId);
  } else if (lessonType === "document") {
    handleDocumentLesson(lessonId, lessonDuration);
  }
}

function handleVideoLesson(lessonId) {
  const video = document.querySelector("#lesson-video");
  if (!video) return;

  video.addEventListener("ended", function () {
    appendCompleteButton(lessonId);
  });
}

// function handleDocumentLesson(lessonId, duration) {
//   if (!duration || duration < 1) duration = 2;

//   const time_ms = duration * 60 * 1000;

//   setTimeout(() => {
//     appendCompleteButton(lessonId);
//   }, time_ms);
// }

function handleDocumentLesson(lessonId, duration) {
  if (!duration || duration < 1) duration = 2;

  let seconds = duration * 60;
  console.log("Document duration:", seconds, "seconds");

  // Đếm ngược
  const countdownInterval = setInterval(() => {
    seconds--;
    console.log("Document countdown:", seconds, "s");

    if (seconds <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  setTimeout(() => {
    appendCompleteButton(lessonId);
    console.log("Document: time completed → show button");
  }, duration * 60 * 1000);
}

function appendCompleteButton(lessonId) {
  $.ajax({
    url: ajaxUrl,
    type: "POST",
    dataType: "json",
    data: {
      action: "update_lesson_status",
      lesson_id: lessonId,
      status: "completed"
    },
    success: function (res) {
      console.log("Status updated to studied:", res);

      $(
        `.lesson-item[data-lesson-id='${lessonId}'] .complete-lesson`
      ).removeClass("disabled");

      if (res.data.course_complete) {
        $(".course-detail .announcement").removeClass("d-none");
      }
    }
  });
}

function openModalCompleteCourse() {
  $(document).on("click", ".course-detail .announcement", function (e) {
    e.preventDefault();

    const courseID = $(this).data("course-id");
    const userID = $(this).data("user-id");
    // $("#modalCourseSuccess").modal("show");

    $.ajax({
      url: ajaxUrl,
      type: "POST",
      dataType: "json",
      data: {
        action: "check_course_completed",
        course_id: courseID
      },
      success: function (res) {
        if (res.success && res.data.completed) {
          $("#modalCourseSuccess").modal("show");
        } else {
          console.log("Course not completed yet");
        }
      }
    });
  });
}

function submitCertificateForm() {
  const form = $("#certificateForm");
  if (form.length < 1) return;

  form.on("submit", function (e) {
    e.preventDefault();

    const input = form.find("input[name='name']");
    const fullName = input.val().trim();

    if (!fullName) {
      input.addClass("error");
      return;
    } else {
      input.removeClass("error");
    }

    const submitBtn = form.find("button[type='submit']");
    const courseId = submitBtn.data("course-id");
    const userId = submitBtn.data("user-id");

    $.post(
      ajaxUrl,
      {
        action: "get_certificate_info",
        course_id: courseId,
        user_id: userId
      },
      function (res) {
        const finalUserName = fullName || res.user_name;

        $("#certUserName").text(finalUserName);
        $("#certCourseName").text(res.course_name);

        $("#modalCourseSuccess").modal("hide");

        setTimeout(() => {
          $("#modalCourseCertificate").modal("show");
        }, 300);
      }
    );
  });
}

function downloadPDFCertificate() {
  function downloadCertificatePDF() {
    const area = document.getElementById("certificateArea");
    if (!area) return;

    const btn = $("#btnDownloadPDF");
    btn.addClass("aloading");

    html2canvas(area, {
      scale: 2,
      useCORS: true
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jspdf.jsPDF("landscape", "px", [
          canvas.width,
          canvas.height
        ]);
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

        pdf.save("certificate.pdf");
      })
      .finally(() => {
        btn.removeClass("aloading");
      });
  }

  $(document).on("click", "#btnDownloadPDF", function () {
    downloadCertificatePDF();
  });
}
function swiperBanner() {
  if (!document.querySelector(".swiper-banner")) return;
  const swiperBanner = new Swiper(".swiper-banner", {
    loop: true,
    speed: 900,
    effect: "fade",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });
}

function hideDevTools() {
  // ====== CHẶN CHUỘT PHẢI ======
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // ====== CHẶN PHÍM MỞ DEVTOOLS ======
  document.addEventListener("keydown", function (e) {
    // F12
    if (e.key === "F12") e.preventDefault();

    // Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i")
      e.preventDefault();

    // Ctrl + Shift + J
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j")
      e.preventDefault();

    // Ctrl + U (view source)
    if (e.ctrlKey && e.key.toLowerCase() === "u") e.preventDefault();

    // Ctrl + S (save page)
    if (e.ctrlKey && e.key.toLowerCase() === "s") e.preventDefault();
  });

  // ====== CHẶN DEVTOOLS MỞ NGẦM ======
  const detect = () => {
    const threshold = 160;
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      document.body.innerHTML =
        "<h2 style='text-align:center;margin-top:40px'>DevTools bị chặn</h2>";
    }
  };

  setInterval(detect, 500);
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
  swiperIntruct();
  effectFade();
  registerForm();
  sectionIntructionModal();
  courseDetail();
  sectionIntro();
  updateCompleteLesson();
  initFadeInSections();
  lessonCompleteHandler();
  openModalCompleteCourse();
  submitCertificateForm();
  // $("#modalCourseCertificate").modal("show");
  downloadPDFCertificate();
  // playVideoIntro();
  swiperBanner();
  hideDevTools();
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
