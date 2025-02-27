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
		let aboutSection = document.getElementById("workshops");
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
		let aboutSection = document.getElementById("preEvents");
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
	
	/*document.addEventListener("scroll", function () {
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
});*/
document.addEventListener("DOMContentLoaded", function () {
    function animateValue(element, start, end, duration) {
        let startTime = null;
        const stepTime = 50; // Controls speed (lower = faster)

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = timestamp - startTime;
            let fraction = progress / duration;
            let current = Math.floor(start + (end - start) * fraction);

            if (current > end) current = end;
            
            // Update the number without "+" while animating
            element.innerHTML = current.toLocaleString() + "<br>" + element.getAttribute("data-label");

            if (progress < duration) {
                setTimeout(() => requestAnimationFrame(step), stepTime);
            } else {
                // Add "+" sign when counting completes
                element.innerHTML = end.toLocaleString() + "+" + "<br>" + element.getAttribute("data-label");
            }
        }

        requestAnimationFrame(step);
    }

    function startCounters() {
        document.querySelectorAll(".stat-item p").forEach((p) => {
            let text = p.innerHTML.split("<br>");
            let endValue = parseInt(text[0].replace(/\D/g, ""));
            p.setAttribute("data-label", text[1]); // Store label text
            p.innerHTML = "0<br>" + text[1]; // Reset to 0 before animation
            animateValue(p, 0, endValue, 4000); // Slow animation (4s)
        });
    }

    // Trigger animation when stats come into view
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.disconnect(); // Run animation once
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of stats are visible
    );

    observer.observe(document.querySelector(".stats-container"));
});
/*countdown*/
document.addEventListener("DOMContentLoaded", function () {
    function updateCountdown() {
        const eventDate = new Date("March 14, 2025 00:00:00").getTime();
        const now = new Date().getTime();
        const timeLeft = eventDate - now;

        if (timeLeft <= 0) {
            document.getElementById("countdown").innerHTML = "<span style='color: #8DE602;'>Event Started!</span>";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately to avoid 1s delay
});

document.addEventListener("DOMContentLoaded", function () {
    const leftImages = [
        "images/Tesla-24/img1.jpeg",
        "images/Tesla-24/img3.JPG",
        "images/Tesla-24/img5.JPG",
		"images/Tesla-24/img7.JPG",
		"images/Tesla-24/img9.JPG",
		"images/Tesla-24/img11.png"
    ];
    const rightImages = [
        "images/Tesla-24/img2.JPG",
        "images/Tesla-24/img4.JPG",
        "images/Tesla-24/img6.JPG",
		"images/Tesla-24/img8.JPG",
		"images/Tesla-24/img10.png",
		"images/Tesla-24/img12.png"
    ];

    let index = 0;
    const leftImgElement = document.getElementById("left-image");
    const rightImgElement = document.getElementById("right-image");

    function changeImages() {
		index = (index + 1) % leftImages.length;
	
		// Create new Image objects for preloading
		const newLeftImage = new Image();
		const newRightImage = new Image();
	
		// Set the source of the new images
		newLeftImage.src = leftImages[index];
		newRightImage.src = rightImages[index];
	
		// Wait for both images to load before swapping
		newLeftImage.onload = newRightImage.onload = function () {
			leftImgElement.style.opacity = "0";
			rightImgElement.style.opacity = "0";
	
			setTimeout(() => {
				leftImgElement.src = newLeftImage.src;
				rightImgElement.src = newRightImage.src;
	
				// Fade in only after the new images are completely loaded
				setTimeout(() => {
					leftImgElement.style.opacity = "1";
					rightImgElement.style.opacity = "1";
				}, 100);
			}, 300); // Adjust delay if needed
		};
	}
	

    setInterval(changeImages, 3000); // Change every 3 seconds
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
