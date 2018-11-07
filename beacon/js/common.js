$(document).ready(function($) {

	$('.main-content__nav-link').on("click", function(e){
		e.preventDefault();
        activeNav();
        var owl = $(".owl-carousel").data('owlCarousel');
        var index=$(this).data('item');
        owl.goTo(index);
    });

    
    $(".howwork5-content__main-content").owlCarousel({
        autoPlay: 3000, 
        singleItem:true,
        afterMove: activeNav
    });

    $(".slider-btn_left").click(function(e){
        var owl = $(this).parent().find(".owl-carousel").data('owlCarousel');
        owl.prev();
    });
    $(".slider-btn_right").click(function(e){
        var owl = $(this).parent().find(".owl-carousel").data('owlCarousel');
        owl.next();
    });

    $('.main-menu__link').on('click', function(event) {
        console.log('sdfsd');
        $('.navbar-collapse').collapse('toggle');
    });



    //Sending form
    $(".newsletter-form").submit(function(e) { 
        
        e.preventDefault(); 

        var email=$(this).find(".newsletter-form__email").val();
        var adminEmail=$(this).find(".admin-email").val();

        console.log(email + " "+ adminEmail);
        
        
        var data_all = new FormData();
        
        data_all.append("email",email);
        data_all.append("adminEmail",adminEmail);
        
        var $form = $(this);
        
        console.log(data_all);
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data:data_all,//$form.serialize(),
          processData: false,
          contentType: false
        }).done(function(data) {
          $(".newsletter-form").append('<p class="ajax-notification">'+data+'</p>');
            
        }).fail(function() {
          $(".newsletter-form").append('<p class="ajax-notification">Connecting error</p>');
          
        });
        
        
        $(this)[0].reset();
    });
});

function activeNav(event) {
    var owl = $(".owl-carousel").data('owlCarousel');
    var itemindex =owl.currentItem;
    $('.main-content__nav-link.active').removeClass('active');
    $('.main-content__nav-link[data-item='+itemindex+']').addClass('active');
}


