//jquery-click-scroll
//by syamsul'isul' Arifin

var sectionArray = [1, 2, 3, 4, 5, 6];

$(document).scroll(function () {
    var docScroll = $(document).scrollTop();
    var docScroll1 = docScroll + 1;
    
    var activeFound = false; // Track if a section is active

    $.each(sectionArray, function(index, value) {
        var section = $('#section_' + value);
        var offsetSection = section.offset().top - 83;
        var sectionHeight = section.outerHeight();
        
        if (docScroll1 >= offsetSection && docScroll1 < offsetSection + sectionHeight) {
            $('.navbar-nav .nav-item .nav-link').removeClass('active'); // Remove active from all
            $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');  
            $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active').removeClass('inactive');
            activeFound = true; // A section is active
        }
    });

    // ✅ Fix: Ensure "Contacts" activates only when reaching the footer
    var contactsSection = $("#footer").offset().top - 300; // Adjust if needed
    if (docScroll >= contactsSection) {
        $('.navbar-nav .nav-item .nav-link').removeClass('active'); // Remove all active states
        $('.navbar-nav .nav-item .nav-link[href="#footer"]').addClass('active'); // Activate Contacts
        activeFound = true;
    }

    // ✅ Fix: If no section or footer is active, remove all active states
    if (!activeFound) {
        $('.navbar-nav .nav-item .nav-link').removeClass('active');
    }
});

// ✅ Ensure clicking "Contacts" scrolls and activates correctly
$('.navbar-nav .nav-item .nav-link[href="#footer"]').click(function (e) {
    e.preventDefault();
    var offsetClick = $("#footer").offset().top - 83;
    $('html, body').animate({ scrollTop: offsetClick }, 300);
    $('.navbar-nav .nav-item .nav-link').removeClass('active');
    $(this).addClass('active'); // Manually highlight it
});

// ✅ Ensure clicking other sections scrolls and activates correctly
$('.click-scroll').each(function(index) {
    $(this).click(function(e) {
        var offsetClick = $('#' + 'section_' + sectionArray[index]).offset().top - 83;
        e.preventDefault();
        $('html, body').animate({ scrollTop: offsetClick }, 300);
    });
});

$(document).ready(function() {
    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');    
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');

    var currentPage = window.location.pathname.split("/").pop(); // Get the current page filename

    if (currentPage === "committee.html") {
        $('.navbar-nav .nav-item .nav-link').removeClass('active'); // Remove active from all
        $('.navbar-nav .nav-item .nav-link[href="committee.html"]').addClass('active'); // Highlight committee link
    }
});
