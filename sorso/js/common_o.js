$(document).ready(function($) {
 
    
    $(".slider__button_left").click(function(e){
    	e.preventDefault();
        var owl = $(this).parent(".slider-wrapper").find(".owl-carousel").data('owlCarousel');
        owl.prev();
    });
    $(".slider__button_right").click(function(e){
    	e.preventDefault();
        var owl = $(this).parent(".slider-wrapper").find(".owl-carousel").data('owlCarousel');
        owl.next();
    });   
    $(".companies-slider").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
     	pagination: false,
        items : 5,
        itemsDesktop : [1199,5],
        itemsDesktopSmall : [979,3]
     
    });
    $('.blend__about-btn').hover(function() {
        $(this).closest('.blend').find('.blend__about').show();
    }, function() {
        $(this).closest('.blend').find('.blend__about').hide();
    });


    $('.popup_bg,.form__close-btn').on('click', function(event) {
        event.preventDefault();
        $(this).closest('.popup').fadeOut(300);
        $('.callback-form').hide();
        $('.politics-popup').hide();
    });



    $('.call-button').on('click', function(event) {
        event.preventDefault();
        $('.callback').show();
        $('.popup').fadeIn(300);
    });

    $('.order-button').on('click', function(event) {
        event.preventDefault();
        $('.order').show();
        $('.popup').fadeIn(300);
    });

    $('.politics-button').on('click', function(event) {
        event.preventDefault();
        $('.politics-popup').show();
        $('.popup').fadeIn(300);
    });

    $(".input-date").mask("99.99.9999",{placeholder:"__.__.____"});

    $(".form").submit(function(e) { 

        e.preventDefault(); 
        
        var adminEmail=$(this).find(".admin-email").val();
        var formTitle=$(this).find(".form-title").val();

        var name=$(this).find(".input-name").val();
        var phone=$(this).find(".input-phone").val();
        var date=$(this).find(".input-date").val();

        var data_all = new FormData();
        

        data_all.append("adminEmail", adminEmail);
        data_all.append("formTitle", formTitle);

        data_all.append("name",name);
        data_all.append("phone",phone);
        data_all.append("date",date);
        

        var $form = $(this);
        console.log(data_all);

       $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data:data_all, //$form.serialize()
          processData: false,
          contentType: false
        }).done(function(data) {
          $form.append('<p class="ajax-notification">'+data+'</p>');
        }).fail(function() {
          $form.append('<p class="ajax-notification">Ошибка при соединении с сервером</p>');
        });
        
        $(this)[0].reset();
    });
   



    $(window).scroll(function(){
        var menuTop=$(".main-header").height();
        
        if($(this).scrollTop()>menuTop){
            $('.main-navbar').fadeIn(300);
        }
        else if ($(this).scrollTop()<menuTop){
            $('.main-navbar').fadeOut(300);
        }
    });


});





