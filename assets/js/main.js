const headerElm = document.querySelector(".header");
const initialStickyState = headerElm.classList.contains("sticky");

const menuButton = document.querySelector(".header-menu__icon");
const menuElement = document.querySelector(".header-nav");

const videoElements = document.querySelectorAll(".video-slider__src");
const playPauseButtons = document.querySelectorAll(".video-control");

const branchElms = document.querySelectorAll(".branch .branch-item");
const branchWrp = document.querySelector(".branch .branch-wrapper");

const tabsList = document.querySelector(".tabs-list");
const tabsBodys = document.querySelectorAll(".tabs-uses__body");

const contactItemElms = document.querySelectorAll(".contact-branch__item");
const contactMapImgElm = document.querySelector(".contact-content__img");

const videoCaroselModal = document.querySelector('.video-carosel__modal');
const videoSliderSrcElms = document.querySelectorAll('.video-slider__src');
const videoControlElms = document.querySelectorAll('.video-control');
const videoCaroselIdElm = document.getElementById('videoCaroselId');

var swiper = new Swiper(".tyd-swiper", {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 24,
  grabCursor: true,
  freeMode: true,
  autoHeight: true,
  loop: true,
  navigation:
    window.innerWidth >= 1024
      ? {
        nextEl: ".swiper__button-next",
        prevEl: ".swiper__button-prev",
      }
      : {},
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 18,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

var videoSliderThumb = new Swiper(".tyd-video-slider-thumb", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: window.innerWidth >= 1024 ? 3 : 2,
  freeMode: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".thumb-swiper-button__next",
    prevEl: ".thumb-swiper-button__prev",
  },
});

var videoSlider = new Swiper(".tyd-video-slider", {
  loop: true,
  speed: 400,
  spaceBetween: window.innerWidth >= 1024 ? 10 : 5,
  thumbs: {
    swiper: videoSliderThumb,
  },
});

var swiperBlog = new Swiper(".tyd-blog-swiper", {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 24,
  grabCursor: true,
  freeMode: true,
  autoHeight: true,
  loop: true,
  navigation:
    window.innerWidth >= 1024
      ? {
        nextEl: ".swiper__button-next",
        prevEl: ".swiper__button-prev",
      }
      : {},
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 18,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

//#region Memnu mobile
menuButton.addEventListener("click", () => {
  menuElement.classList.toggle("active");
  if (menuElement.classList.contains("active")) {
    headerElm.classList.add("sticky");
  } else {
    if (!initialStickyState) {
      headerElm.classList.remove("sticky");
    }
  }
});
//#endregion

//#region Branch
branchElms.forEach((branchElm, idx) => {
  branchElm.addEventListener("click", () => {
    for (const elm of branchElms) {
      elm.classList.remove("active");
    }
    branchElm.classList.add("active");
    const backgroundUrl = branchElm.getAttribute('data-background');
    branchWrp.style.backgroundImage = `url(${backgroundUrl})`;
  });
});
//#endregion

//#region Tabs
const tabsItemElms = document.querySelectorAll(".tabs-item");

function activateTab(index) {
  if (!index || index < 1 || index > tabsItemElms.length) return;

  for (const elm of tabsItemElms) {
    elm.classList.remove("active");
  }
  
  // Find the tab with the matching data-index
  const activeTab = Array.from(tabsItemElms).find(elm => elm.getAttribute('data-index') == index);
  if (activeTab) {
      activeTab.classList.add("active");
  }

  for (const tabBody of tabsBodys) {
    tabBody.classList.remove('active');
  }
  tabsBodys?.[index - 1]?.classList.add('active');
}

tabsItemElms.forEach((element, idx) => {
  element.addEventListener("click", () => {
    const dataIndex = element.getAttribute('data-index');
    activateTab(dataIndex);
  });
});

// Check for tab parameter in URL
const urlParams = new URLSearchParams(window.location.search);
const tabParam = urlParams.get('tab');
if (tabParam) {
    activateTab(tabParam);
    // Scroll to tabs section
    const tabsSection = document.querySelector(".tabs");
    if(tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
//#endregion

//#region Contact
contactItemElms.forEach((element, idx) => {
  element.addEventListener('click', () => {
    for (const elm of contactItemElms) {
      elm.classList.remove("active");
    }
    element.classList.add("active");
    const dataSrc = element.getAttribute('data-src');
    contactMapImgElm.setAttribute('src', dataSrc)
  })
})

//#endregion

//#region Video Carosel Modal

function handleOpenVideoModal(elms) {
  elms.forEach((element) => {
    element.addEventListener('click', () => {
      const videoId = element.getAttribute('data-video-id');
      videoCaroselIdElm.setAttribute('videoid', videoId);
      videoCaroselModal.classList.add('active');
    })
  });
};

if (videoCaroselIdElm && videoCaroselModal) {
  videoCaroselModal.addEventListener('click', () => {
    videoCaroselModal.classList.remove('active');
    videoCaroselModal.classList.contains('active') ? () => { } : videoCaroselIdElm.setAttribute('videoid', null);

  });
  videoCaroselIdElm.addEventListener('click', (e) => e.stopPropagation());
}

handleOpenVideoModal(videoControlElms);
handleOpenVideoModal(videoSliderSrcElms);

// #endregion