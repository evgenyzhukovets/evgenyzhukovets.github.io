$(document).ready(function($) {
	$('.main-menu__link_dropdown, .main-menu__dropdown').hover(function() {
    	$(this).closest('.main-menu__item').find(".main-menu__dropdown").show();
    }, function() {
    	$(this).closest('.main-menu__item').find(".main-menu__dropdown").hide();
    });
    
    $(".slider__button_left").click(function(e){
    	e.preventDefault();
        var owl = $(this).parent(".slider").find(".owl-carousel").data('owlCarousel');
        owl.prev();
    });
    $(".slider__button_right").click(function(e){
    	e.preventDefault();
        var owl = $(this).parent(".slider").find(".owl-carousel").data('owlCarousel');
        owl.next();
    });  
    $(".main-slider__items").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
     	pagination: false,
        singleItem:true
    });
    $(".companies-slider__slider").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
     	pagination: false,
        items : 7,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3]
     
    });
    $(".managers-slider__items").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        pagination: true,
        singleItem:true
    });
    $(".comments-slider__items").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        pagination: false,
        singleItem:true
    });
    $('.main-slider__nav-item').on("click", function(e){
		e.preventDefault();
        var owl = $(".owl-carousel").data('owlCarousel');
        var index=$(this).data('item');
        owl.goTo(index);
    });

});





