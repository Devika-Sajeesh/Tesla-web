(function ($) {
	"use strict";

	// MENU
	$(".navbar-collapse a").on("click", function () {
		$(".navbar-collapse").collapse("hide");
	});

	// CUSTOM LINK
	$(".smoothscroll").click(function () {
		var el = $(this).attr("href");
		var elWrapped = $(el);
		var header_height = $(".navbar").height();

		scrollToDiv(elWrapped, header_height);
		return false;

		function scrollToDiv(element, navheight) {
			var offset = element.offset();
			var offsetTop = offset.top;
			var totalScroll = offsetTop - navheight;

			$("body,html").animate(
				{
					scrollTop: totalScroll,
				},
				300
			);
		}
	});
	document.addEventListener("scroll", function () {
		let logo = document.getElementById("teslaLogo");
		if (window.scrollY > 100) {
			logo.classList.add("shrink");
		} else {
			logo.classList.remove("shrink");
		}
	});
	document.addEventListener("scroll", function () {
		let aboutSection = document.getElementById("aboutTesla");
		let aboutPosition = aboutSection.getBoundingClientRect().top;
		let aboutBottom = aboutSection.getBoundingClientRect().bottom;
		let screenHeight = window.innerHeight;
	
		// When the section comes into view, slide it in
		if (aboutPosition < screenHeight / 1.3 && aboutBottom > 0) {
			aboutSection.classList.add("visible");
			aboutSection.classList.remove("hidden-out-left");
		} 
		// When the section is scrolled past (up or down), move it out
		else {
			aboutSection.classList.remove("visible");
			aboutSection.classList.add("hidden-out-left");
		}
	});
	document.addEventListener("scroll", function () {
		let aboutSection = document.getElementById("stat");
		let aboutPosition = aboutSection.getBoundingClientRect().top;
		let aboutBottom = aboutSection.getBoundingClientRect().bottom;
		let screenHeight = window.innerHeight;
	
		// When the section comes into view, slide it in
		if (aboutPosition < screenHeight / 1.3 && aboutBottom > 0) {
			aboutSection.classList.add("visible");
			aboutSection.classList.remove("hidden-out-right");
		} 
		// When the section is scrolled past (up or down), move it out
		else {
			aboutSection.classList.remove("visible");
			aboutSection.classList.add("hidden-out-right");
		}
	});
	document.addEventListener("scroll", function () {
		let aboutSection = document.getElementById("preEvents");
		let aboutPosition = aboutSection.getBoundingClientRect().top;
		let aboutBottom = aboutSection.getBoundingClientRect().bottom;
		let screenHeight = window.innerHeight;
	
		// When the section comes into view, slide it in
		if (aboutPosition < screenHeight / 1.3 && aboutBottom > 0) {
			aboutSection.classList.add("visible");
			aboutSection.classList.remove("hidden-out-left");
		} 
		// When the section is scrolled past (up or down), move it out
		else {
			aboutSection.classList.remove("visible");
			aboutSection.classList.add("hidden-out-left");
		}
	});
	
	document.addEventListener("scroll", function () {
		let aboutSection = document.getElementById("footer");
		let aboutPosition = aboutSection.getBoundingClientRect().top;
		let aboutBottom = aboutSection.getBoundingClientRect().bottom;
		let screenHeight = window.innerHeight;
	
		// When the section comes into view, slide it in
		if (aboutPosition < screenHeight / 1.3 && aboutBottom > 0) {
			aboutSection.classList.add("visible");
			aboutSection.classList.remove("hidden-out-right");
		} 
		// When the section is scrolled past (up or down), move it out
		else {
			aboutSection.classList.remove("visible");
			aboutSection.classList.add("hidden-out-right");
		}
	});
	window.addEventListener("resize", function () {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
});
		
	// SMOOTH SCROLL
	$(function () {
		$(".smoothscroll").on("click", function (e) {
			e.preventDefault();
			$("html, body").animate(
				{
					scrollTop: $($(this).attr("href")).offset().top,
				},
				1000,
				"easeInOutExpo"
			);
		});
	});
})(window.jQuery);
