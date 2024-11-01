/**
 * Customizer controls portfolio
 *
 * @package WPBricks
 */


(function ($) {
    "use strict";
	var $grid = $('.wpbricks-portfolio-addons .grid').isotope({
	  itemSelector: '.grid-item',
	  layoutMode: 'fitRows',
	});

	$(document).on("click", ".wpbricks-portfolio-addons .filter-button-group .button", function(e){
		e.preventDefault();
	    $(".filter-button-group .button").removeClass("is_checked");
	    var filterValue = $(this).attr('data-filter');
	    $(this).addClass('is_checked');
	    $grid.isotope({ filter: filterValue });
	});

	// Magnific Popup for gallery
	$('.gallery-image-popup').magnificPopup({
	  gallery: {
	    enabled: true,
	    index: 0,
	    tPrev: 'prev',
	    tNext: 'Next',
	  },
	  type:'image',
	});
	
})(jQuery);

