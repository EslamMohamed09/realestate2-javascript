/**
 * Header Active
 */
const header = document.querySelector("header");

// document.body.style.paddingTop = `${header.offsetHeight}px`;

window.addEventListener("scroll", function () {
  this.window.scrollY > 10 ? header.classList.add("active") : header.classList.remove("active");
});


if(document.querySelector(".open-btn") && window.innerWidth < 768){
    const openBtn = document.querySelector("header .top-bar .right-block .open-btn");
    const bottomBar = document.querySelector("header .bottom-bar");
    openBtn.onclick = () => {
      bottomBar.classList.toggle("mobile-header");

      let icon = openBtn.querySelector("i") || openBtn.querySelector("svg");

      icon.style.transition = "transform 0.2s ease-in-out";
      icon.style.transform = "rotate(180deg)";

      setTimeout(() => {
        if (icon.classList.contains("fa-bars")) {
            icon.classList.replace("fa-bars", "fa-times");
        } else {
            icon.classList.replace("fa-times", "fa-bars");
        }
        icon.style.transform = "rotate(0deg)";
      }, 150);
    };
}

    
//search icon
const bottomBarHeader = document.querySelector(".header .bottom-bar");
const headerSearchBtn = document.querySelector(".header .bottom-bar .services-buttons .search-btn");
const headerSearchForm = document.querySelector("header .bottom-bar .header-search-form");

if (window.innerWidth > 768) {
    headerSearchBtn.addEventListener('click', function(){
      if (!bottomBarHeader.classList.contains('view-search-form')) {
          bottomBarHeader.classList.add('view-search-form');
      } else {
        bottomBarHeader.classList.remove('view-search-form');
      }
    });
}


/* 
 ######################
 #### HERO SECTION ####
 ######################
*/
if(document.querySelector(".hero-section")){

function heroSlider(options){

    const {
        sectionSelector ='.slider-section',
        sliderWrapperSelector = '.slider-wrapper',
        prevBtnSelector = '.prev-btn',
        nextBtnSelector = '.next-btn',
        playSpeed = 5000
    } = options;

    let section = document.querySelector(sectionSelector);
    let sliderWrapper = document.querySelector(sliderWrapperSelector);
    let slides = Array.from(sliderWrapper.children);
    let prevBtn = document.querySelector(prevBtnSelector);
    let nextBtn = document.querySelector(nextBtnSelector);
    let indicatorsMenu;
    let currentIndex = 0;
    let slideWidth = slides[0].offsetWidth;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    
    function setupSlider(){
      if (currentIndex >= 0 && currentIndex < slides.length) {
          indicatorsMenu.children[currentIndex]?.classList.add('active');
      }
    }

    function buildIndicators(){
        indicatorsMenu = document.createElement('ul');
        indicatorsMenu.classList.add('indicators-menu');
        section.appendChild(indicatorsMenu);

        for (let i=0; i<slides.length; i++) {
            const indicator = document.createElement('li');
            indicator.setAttribute('data-index', i);
            indicatorsMenu.appendChild(indicator);
        
            indicator.addEventListener('click', () => {
              currentIndex = i;
              updateSlides();
            });
        }

        indicatorsMenu.children[currentIndex].classList.add('active');

        if(window.innerWidth < 500){
           if(indicatorsMenu.children.length > 8){
              indicatorsMenu.style.display = 'none';
           }
        } else {
          if(indicatorsMenu.children.length > 12){
             indicatorsMenu.style.display = 'none';
          }
        }
    }

    function updateSlides(){
       const scrollPosition = currentIndex * slideWidth;
       Array.from(indicatorsMenu.children).forEach(indicator => {indicator.classList.remove('active');});
       indicatorsMenu.children[currentIndex].classList.add('active');

       slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

        function animateScroll(start, end, duration) {
            let startTime = null;
    
            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, start, end - start, duration);
    
                sliderWrapper.scrollLeft = run;
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
    
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
    
            requestAnimationFrame(animation);
        }
    
        animateScroll(sliderWrapper.scrollLeft, scrollPosition, 1100);
        
        sliderWrapper.scrollTo({
            left:scrollPosition,
            behavior:"smooth"
        });
    
        if (currentIndex >= slides.length) {
            currentIndex = 0;
            sliderWrapper.scrollLeft = 0;
        }
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlides();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlides();
    }

    let heroSliderInterval = setInterval(nextSlide, playSpeed);

    function stopSlider(){
      clearInterval(heroSliderInterval);
    }

    function startSlider(){
      clearInterval(heroSliderInterval);
      heroSliderInterval = setInterval(nextSlide, playSpeed);
    }

    function startDrag(e) {
        isDragging = true;
        startX = e.clientX;
        scrollStart = sliderWrapper.scrollLeft;
    }

    function duringDrag(e) {
        if (!isDragging) return;
        const currentX = e.clientX;
        const dragDistance = currentX - startX;
        sliderWrapper.scrollLeft = scrollStart - dragDistance;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        const scrollLeft = sliderWrapper.scrollLeft;

        if (Math.abs(scrollLeft - currentIndex * slideWidth) > slideWidth / 4) { // Snap to nearest slide after drag
            if (scrollLeft > currentIndex * slideWidth) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            updateSlides();
        }
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('mouseenter', stopSlider);
    nextBtn.addEventListener('mouseenter', stopSlider);
    section.addEventListener('mouseenter', stopSlider);
    section.addEventListener('mouseleave', startSlider);

    sliderWrapper.addEventListener('mousedown', startDrag);
    sliderWrapper.addEventListener('mousemove', duringDrag);
    sliderWrapper.addEventListener('mouseup', endDrag);
    sliderWrapper.addEventListener('mouseleave', endDrag);

    buildIndicators();
    updateSlides();
    setupSlider();

    window.addEventListener('scroll', function(){
      if(window.scrollY > 10){
          stopSlider();
      } else if(window.scrollY === 0){
          startSlider();
      }
    });

    section.querySelectorAll('.hero-slide-item .left-block h2').forEach((h2) => {
      h2.textContent = h2.textContent.split(" ").slice(0,5).join(" ");
    });

    section.querySelectorAll('.hero-slide-item .left-block p').forEach((p) => {
      p.textContent = p.textContent.split(" ").slice(0, 25).join(" ");
    });
}

// heroSlider({sectionSelector:'.hero-section', 
//             sliderWrapperSelector:'.hero-section .slider-wrapper', 
//             prevBtnSelector:'.hero-section .prev-btn',
//             nextBtnSelector:'.hero-section .next-btn',
// });

}

/* 
 #################################
 #### SELL APARTMENTS SECTION ####
 #################################
*/
// dotsFullResponsiveSlider({
//     section:'.sell-apartments-section',
//     containerSelector:'.sell-apartments-section .slider-wrapper',
//     dotsSelector:'.sell-apartments-section #sliderdots',
//     prevArrowSelector:'.sell-apartments-section .arrow-left',
//     nextArrowSelector:'.sell-apartments-section .arrow-right',
// });

/* 
 #############################
 #### SELL BUILDS SECTION ####
 #############################
*/
// dotsFullResponsiveSlider({
//     section:'.sell-builds-section',
//     containerSelector:'.sell-builds-section .slider-wrapper',
//     dotsSelector:'.sell-builds-section #sliderdots',
//     prevArrowSelector:'.sell-builds-section .arrow-left',
//     nextArrowSelector:'.sell-builds-section .arrow-right',
// });

/* 
 #################################
 #### INTERIOR DESIGN SECTION ####
 #################################
*/
filterTabs({tabSelector:'.interior-design-section .tabs-menu li', 
            itemSelector:'.interior-design-section .items-holder .item'});

/* 
 ###############################
 #### PROPERTY LIST SECTION ####
 ###############################
*/
filterTabs({tabSelector:'.property-list-section .tabs-menu li',
            itemSelector:'.property-list-section .section-container .card'});


window.onload = function(){
	document.getElementById("preloader").style.display = "none";
	document.getElementById("loading").style.display = "block";
}

/* 
 #######################
 #### POSTS SECTION ####
 #######################
*/
const postDescriptions = document.querySelectorAll(".post-section .box-container .box p");
postDescriptions.forEach((postDescription) => {
  postDescription.textContent = postDescription.textContent.trim().split(/\s+/).slice(0,10).join(" ") + "...";
});


function scrollUp(){
	const scrollUp = document.getElementById('scroll-up');
	if(this.scrollY >= 1600) {
     scrollUp.classList.add('show-scrollup');
  } else {
	     scrollUp.classList.remove('show-scrollup');
	};
}
window.addEventListener('scroll', scrollUp);

const scrollUpBtn = document.getElementById("scroll-up");

scrollUpBtn.addEventListener("click", () => {
  window.scrollTo({
    top:0,
    behavior: "smooth"
  });
});


/*
 ######################
 ####### GLOBAL #######
 ######################
*/
function dotsFullResponsiveSlider(options) {
    const {
        sectionSelector = '.slider-section',
        containerSelector = '.slides-container',
        prevArrowSelector = '.arrow-left',
        nextArrowSelector = '.arrow-right',
        slidesToShowDefault = 1,
        slidesToScrollDefault = 1,
        autoplaySpeed = 7000
    } = options;

    let section = document.querySelector(sectionSelector);
    let sliderContainer = document.querySelector(containerSelector);
    let currentIndex = 0;
    let slides;
    let slidesToShow = slidesToShowDefault;
    let slidesToScroll = slidesToScrollDefault;
    let dotsWrapper;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let autoSlideInterval;

    const smallScreen = window.innerWidth > 10 && window.innerWidth < 515;
    const mediumScreen = window.innerWidth > 515 && window.innerWidth < 800;
    const mediumScreen2 = window.innerWidth > 800 && window.innerWidth < 1000;
    const mediumScreen3 = window.innerWidth > 1000 && window.innerWidth < 1200;
    const underBigScreen = window.innerWidth < 1200;

    const gapSize = smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 0
                  : mediumScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.5
                  : mediumScreen2 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.5
                  : mediumScreen3 ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.5
                                  : parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.1;

    const scrollgapSize = smallScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5
                        : underBigScreen ? parseFloat(getComputedStyle(document.documentElement).fontSize) * - 0.5
                                         : parseFloat(getComputedStyle(document.documentElement).fontSize) * - 0.2;

    function setupSlider() {
      clearInterval(autoSlideInterval);
      slides = Array.from(sliderContainer.children);
      sliderContainer.style.display = 'flex';
      sliderContainer.style.overflow = 'hidden';
      updateSlidesToShow();
    }

    function buildDots() {

      const existingDots = section.querySelector('.dots-menu');
      if (existingDots) {existingDots.remove();}

      dotsWrapper = document.createElement('ul');
      dotsWrapper.classList.add('dots-menu');
      section.appendChild(dotsWrapper);

      const totalDots = Math.ceil(slides.length / slidesToScroll);
      for (let i=0; i<totalDots; i++) {
          const dot = document.createElement('li');
          dot.classList.add('dot');
          dot.dataset.index = i;
          dotsWrapper.appendChild(dot);
      }
      
      if(window.innerWidth < 500){
          if(totalDots > 8){
            dotsWrapper.style.display = 'none';
          }
      } else {
        if(totalDots > 12){
            dotsWrapper.style.display = 'none';
        }
      }
      updateDots();
    }

    function updateDots() {
      const dots = dotsWrapper.children;
      const activeDotIndex = Math.floor(currentIndex / slidesToScroll);
      Array.from(dots).forEach(dot => dot.classList.remove('active'));
      if (dots[activeDotIndex]) {
          dots[activeDotIndex].classList.add('active');
      }
    }

    function setResponsive() {
        const responsiveSettings = [
            { breakpoint: 10, settings: { slidesToShow: 1, slidesToScroll: 1 }},
            { breakpoint: 515, settings: { slidesToShow: 2, slidesToScroll: 2 }},
            { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 3 }},
            { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 }},
            { breakpoint: 1400, settings: { slidesToShow: 5, slidesToScroll: 5 }},
        ];

        responsiveSettings.forEach(resp => {
            if (window.innerWidth >= resp.breakpoint) {
                slidesToShow = resp.settings.slidesToShow;
                slidesToScroll = resp.settings.slidesToScroll;
            }
        });

        updateSlidesToShow();
        buildDots();
    }

    function updateSlidesToShow() {
      const wrapperWidth = sliderContainer.clientWidth;
      const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        
      Array.from(slides).forEach(slide => {
        slide.style.flex = `0 0 ${slideWidth}px`;
        slide.style.maxWidth = `${slideWidth}px`;
      });
    }

    function scrollToSlide() {
        const wrapperWidth = sliderContainer.clientWidth;
        const slideWidth = (wrapperWidth - scrollgapSize * (slidesToShow - 1)) / slidesToShow;
        const scrollPosition = currentIndex * (slideWidth + scrollgapSize);
    
        function animateScroll(start, end, duration) {
           let startTime = null;
    
            function animation(currentTime) {
              if (!startTime) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const run = easeInOutQuad(timeElapsed, start, end - start, duration);
    
              sliderContainer.scrollLeft = run;
              if (timeElapsed < duration) requestAnimationFrame(animation);
            }
    
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
    
           requestAnimationFrame(animation);
        }
    
        animateScroll(sliderContainer.scrollLeft, scrollPosition, 1000);
    
        if (currentIndex >= slides.length) {
            currentIndex = 0;
            sliderContainer.scrollTo({ left: 0 });
        }
        updateDots();
    }

    function prevSlide() {
      currentIndex -= slidesToScroll;
      if (currentIndex < 0) {
          currentIndex = slides.length - (slides.length % slidesToScroll || slidesToScroll);
      }
      scrollToSlide(true);
    }

    function nextSlide() {
      currentIndex += slidesToScroll;
      if (currentIndex >= slides.length) {currentIndex = 0;}
      scrollToSlide(true);
    }

    function attachEvents() {
      const prevButton = document.querySelector(prevArrowSelector);
      const nextButton = document.querySelector(nextArrowSelector);

      prevButton.addEventListener('click', prevSlide);
      nextButton.addEventListener('click', nextSlide);
      window.addEventListener('resize', setResponsive);

      Array.from(dotsWrapper.children).forEach(dot => {
        dot.addEventListener('click', e => {
          currentIndex = parseInt(e.target.dataset.index) * slidesToScroll;
          scrollToSlide();
        });
	    });    

      sliderContainer.addEventListener('mousedown', startDrag);
      sliderContainer.addEventListener('mousemove', duringDrag);
      sliderContainer.addEventListener('mouseup', endDrag);
      sliderContainer.addEventListener('mouseleave', endDrag);
      section.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
      section.addEventListener('mouseleave', autoSlide);
    }

    function startDrag(e) {
      isDragging = true;
      startX = e.clientX;
      scrollStart = sliderContainer.scrollLeft;
    }

    function duringDrag(e) {
      if (!isDragging) return;
      const currentX = e.clientX;
      const dragDistance = currentX - startX;
      sliderContainer.scrollLeft = scrollStart - dragDistance;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        const wrapperWidth = sliderContainer.clientWidth;
        const slideWidth = wrapperWidth / slidesToShow;
        const scrollLeft = sliderContainer.scrollLeft;

        if (Math.abs(scrollLeft - currentIndex * slideWidth) > slideWidth / 2) { // Snap to nearest slide after drag
            if (scrollLeft > currentIndex * slideWidth) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            scrollToSlide(true);
        }
    }

    function autoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, autoplaySpeed);
    }

    setupSlider();
    setResponsive();
    attachEvents();
    autoSlide();
}

function filterTabs({ tabSelector, itemSelector, activeClass = 'btn-active' }) {
  const tabs = document.querySelectorAll(tabSelector);
  const items = document.querySelectorAll(itemSelector);
  if (!tabs.length || !items.length) return;

  const defaultClass = [...tabs[0].classList].find(cls => cls !== activeClass);
  if (!defaultClass) return;

  function setActiveTab(tab) {
    tabs.forEach(t => t.classList.remove(activeClass));
    tab.classList.add(activeClass);
  }

  function updateItems(matchClass) {
    items.forEach(item => {
      item.classList.contains(matchClass) ? item.style.display = 'block' : item.style.display = 'none';
    });
  }

  setActiveTab(tabs[0]);
  updateItems(defaultClass);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabClass = [...tab.classList].find(cls => cls !== activeClass);
      setActiveTab(tab);
      updateItems(tabClass);
    });
  });
}

function removeBackground(imgElement, targetColor) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const originalImage = new Image();
  originalImage.src = imgElement.src;

  originalImage.onload = function () {
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert target color to RGBA format
    const targetRGBA = hexToRGBA(targetColor);

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // Check if the pixel color matches the target color
      if (red === targetRGBA.r &&
          green === targetRGBA.g &&
          blue === targetRGBA.b
      ) {
        data[i + 3] = 0; // Set alpha channel to 0 (transparent)
      }
    }

    // Update the canvas with modified image data
    ctx.putImageData(imageData, 0, 0);

    // Replace the original image with the processed image
    imgElement.src = canvas.toDataURL();
  };
}

function hexToRGBA(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

const productImages = document.querySelectorAll('.image-holder img');
productImages.forEach(function (img) {
  const clonedImage = img.cloneNode();
  removeBackground(clonedImage, '#ffffff');
  img.parentNode.replaceChild(clonedImage, img);
});