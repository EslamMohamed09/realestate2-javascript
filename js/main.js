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


$('body').css('paddingTop', $('.header').innerHeight() - 50);


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

$('.realestate-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    dots:false,
	center:false,
    margin:0,
    autoplayTimeout:9000,
    smartSpeed:1500,
    autoplayHoverPause:false,
    items:3, 
	nav:true,
	navText: [
		'<i class="fa fa-angle-left" id="slidder-arrow-left"></i>',
		'<i class="fa fa-angle-right" id="slidder-arrow-right"></i>',
	], 
	responsive:{
		0:{
			items:1
		},
		600:{
			items:2
		},
		1000:{
			items:3
		}
	}     
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

