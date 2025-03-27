'use strict';

/**
 * Header Active
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
    this.window.scrollY > 10 ? header.classList.add("active") : header.classList.remove("active");
});




/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
// const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
// const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navCloseBtn, navOpenBtn];

// close navbar when click on any navbar link
// for (let i = 0; i < navbarLinks.length; i++) {navElemArr.push(navbarLinks[i]);}


// add event on all elements for toggling navbar
for (let i = 0; i < navElemArr.length; i++) {
    navElemArr[i].addEventListener("click", function () {
        elemToggleFunc(navbar);
        // elemToggleFunc(overlay);
    });
}

// element toggle function
const elemToggleFunc = function (elem) {elem.classList.toggle("active");}

    
//search icon
const searchIcon = document.getElementById("search-icon");
const searchFormm = document.getElementById("searchForm");
let isSearchVisible = false;
$(searchFormm).hide(0);

searchIcon.addEventListener('click', function () {
	if (isSearchVisible == true) {
		searchFormm.style.pointerEvents = 'none';
		$(searchFormm).hide(0);
		isSearchVisible = false;
	} else {
		searchFormm.style.pointerEvents = 'auto';
		$(searchFormm).show(0);
		isSearchVisible = true;
	}
});


$('body').css('paddingTop', $('.header').innerHeight() + 50);


$('.slider-home').owlCarousel({
    loop:true,
    autoplay:true,
    nav:true,
    dots:false,
    margin:0,
    animateOut:"fadeOut",
    autoplayTimeout:10000,
    smartSpeed:1500,
    autoplayHoverPause:false,
    items:1,
    navText: [
        '<i class="fa fa-angle-left" id="slidder-arrow-left"></i>',
        '<i class="fa fa-angle-right" id="slidder-arrow-right"></i>',
    ],    
   

}); 

// $('.realestate-carousel').owlCarousel({
//     loop:true,
//     autoplay:true,
//     dots:false,
// 	center:false,
//     margin:0,
//     autoplayTimeout:9000,
//     smartSpeed:1500,
//     autoplayHoverPause:false,
//     items:3, 
// 	nav:true,
// 	navText: [
// 		'<i class="fa fa-angle-left" id="slidder-arrow-left"></i>',
// 		'<i class="fa fa-angle-right" id="slidder-arrow-right"></i>',
// 	], 
// 	responsive:{
// 		0:{
// 			items:1
// 		},
// 		600:{
// 			items:2
// 		},
// 		1000:{
// 			items:3
// 		}
// 	}     
// });

dotsSlider({
    section:'.sell-apartments-section',
    containerSelector:'.sell-apartments-section .slider-wrapper',
    dotsSelector:'.sell-apartments-section #sliderdots',
    prevArrowSelector:'.sell-apartments-section .arrow-left',
    nextArrowSelector:'.sell-apartments-section .arrow-right',
});


// InteriorDesign
let tabs = 'one';
$('#interiorDesign .item_wrap').not('.' + tabs).hide(0);
$('#interiorDesign .item_wrap').filter('.' + tabs).show(0);

$('#interiorDesign li').click(function () {
	tabs = $(this).attr('data-tabs');
	$('#interiorDesign .item_wrap').not('.' + tabs).hide(0);
	$('#interiorDesign .item_wrap').filter('.' + tabs).show(0);
	$(this).addClass('btn-active').siblings().removeClass('btn-active');
});

	
// Property list
let filter = 'first';
$('#property-list .card').not('.' + filter).hide(0);
$('#property-list .card').filter('.' + filter).show(0);

$('#property-list li').click(function () {
	filter = $(this).attr('data-filter');
	$('#property-list .card').not('.' + filter).hide(0);
	$('#property-list .card').filter('.' + filter).show(0);
	$(this).addClass('button-active').siblings().removeClass('button-active');
});



	
function scrollUp(){
	const scrollUp = document.getElementById('scroll-up');
	if(this.scrollY >= 1200) {scrollUp.classList.add('show-scrollup'); 
    } else {
	     scrollUp.classList.remove('show-scrollup');
	};
}
window.addEventListener('scroll', scrollUp);

$('.scrollup').click(function(event){
	event.preventDefault();
	$('html, body').animate({
	  scrollTop:0
	}, 1000);
});


window.onload = function(){
	document.getElementById("preloader").style.display = "none";
	document.getElementById("loading").style.display = "block";
}

/*
 ######################
 ####### GLOBAL #######
 ######################
*/
function dotsSlider(options) {
    const {
        section = '.slider-section',
        containerSelector = '.slides-container',
        dotsSelector = '#sliderdots',
        prevArrowSelector = '.arrow-left',
        nextArrowSelector = '.arrow-right',
        slidesToShowDefault = 1,
        slidesToScrollDefault = 1,
        autoplaySpeed = 3000
    } = options;

    let sliderSection = document.querySelector(section);
    let sliderContainer = document.querySelector(containerSelector);
    let currentIndex = 0;
    let slides;
    let slidesToShow = slidesToShowDefault;
    let slidesToScroll = slidesToScrollDefault;
    let dotsWrapper = document.querySelector(dotsSelector);
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let autoSlideInterval;
    const gapSize = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;

    function setupSlider() {
      slides = Array.from(sliderContainer.children);
      sliderContainer.style.display = 'flex';
      sliderContainer.style.overflow = 'hidden';
      updateSlidesToShow();
    }

    function buildDots() {
      dotsWrapper.innerHTML = '';
      const totalDots = Math.ceil(slides.length / slidesToScroll);
      for (let i=0; i<totalDots; i++) {
          const dot = document.createElement('span');
          dot.classList.add('dot');
          dot.dataset.index = i;
          dotsWrapper.appendChild(dot);
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
            { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 2 }},
            { breakpoint: 650, settings: { slidesToShow: 3, slidesToScroll: 3 }},
            { breakpoint: 1000, settings: { slidesToShow: 4, slidesToScroll: 4 }},
            { breakpoint: 1400, settings: { slidesToShow: 5, slidesToScroll: 5 }},
        ];

        responsiveSettings.forEach(resp => {
            if (window.innerWidth >= resp.breakpoint) {
                slidesToShow = resp.settings.slidesToShow;
                slidesToScroll = resp.settings.slidesToScroll;
            }
        });

        if(slides.length === 19 && window.innerWidth <= 1100){
           slidesToScroll = 3;
        } else if (slides.length < 18 && window.innerWidth <= 1100) {
            slidesToScroll = 2;
        } else if (slides.length < 10 && window.innerWidth <= 1100) {
            slidesToScroll = 1;
        }

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
        const slideWidth = (wrapperWidth - gapSize * (slidesToShow - 1)) / slidesToShow;
        const scrollPosition = currentIndex * (slideWidth + gapSize);
    
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
    
        animateScroll(sliderContainer.scrollLeft, scrollPosition, 700);        
    
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
        // sliderSection.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
        // sliderSection.addEventListener('mouseleave', autoSlide);
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
    buildDots();
    setResponsive();
    attachEvents();
    // autoSlide();
}