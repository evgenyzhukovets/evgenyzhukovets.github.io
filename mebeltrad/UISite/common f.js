

if ((typeof (Viki) == 'undefined') || (Viki == null)) Viki = function () { };
Viki.Site = function () { };
Viki.Site.SetupLive = function (selector) {
  Viki.Site.Navigation.Init();
  Viki.Site.Slider.Init();
  Viki.Site.ScrollAnimation.Init();



  $('.cat-block').hover(
    function() {
      /*$('.cat-block').addClass('cat-block_unhover');
      $(this).removeClass('cat-block_unhover');*/
      $('.cat-block').css('opacity', '0.3');
      $(this).css('opacity', '1');
    }, function() {
      $('.cat-block').css('opacity', '1');
    }
  );
};

Viki.Site.SetupPartial = function (selector) {};


Viki.Site.Navigation = function () { };
Viki.Site.Navigation.Init = function (selector) {
  $('.toggle-btn').on('click', function(event) {

    event.preventDefault();
    var target=$(this).attr('href');
    $(target).stop().slideToggle(300);
  });

  $(window).scroll(function(){
    var menuTop=$(".main-nav").height();
    
    if($(this).scrollTop()>menuTop){
      $('.main-nav').addClass('main-nav_fixed').removeClass('slideOutUp').addClass('slideInDown');
    }
    else if ($(this).scrollTop()<menuTop){
      $('.main-nav').removeClass('slideInDown').removeClass('main-nav_fixed');
    }
  });
};

Viki.Site.Slider = function () { };
Viki.Site.Slider.Init = function (selector) {
    $('.main-slider .owl-carousel').owlCarousel({
        autoplay: true,
        loop:true,
        nav:false,
        onTranslated: owlTranslated,
        onTranslate: owlTranslate,
        dotsContainer: 'main-slider__dots',
        responsive:{
            0:{
                items:1
            }
        }
    });
    $('.catalog-slider .owl-carousel').owlCarousel({
        autoplay: true,
        loop:true,
        nav:false,
        autoWidth:true,
        margin:5,
        onTranslated: owlTranslated,
        onTranslate: owlTranslate,
        dotsContainer: 'main-slider__dots',
        responsive: { 0: { items: 1 }, 768: { items: 3 } }
    });
    var owl = $('.main-slider .owl-carousel');
    owl.owlCarousel();
    $('.owl-dot').click(function () {
      owl.trigger('to.owl.carousel', [$(this).index(), 300]);
    });

    function owlTranslated(event) {
        $('.main-slider__after, .main-slider__before').removeClass('slideOutDown').addClass('slideInUp');
        $('.slider-content').removeClass('slideOutDown').css('opacity','1').addClass('slideInDown');

    }
    function owlTranslate(event) {
        $('.main-slider__after, .main-slider__before').removeClass('slideInUp').addClass('slideOutDown');
        $('.slider-content').removeClass('slideInDown').css('opacity','0');
    }


    $(".companies-slider .owl-carousel").owlCarousel({
        autoplay: true,
        pagination: false,
        nav: false,
        dots:false,
        items: 5,
        loop: true,
        autoplayTimeout: 1500,
        smartSpeed: 1000,
        responsive: { 0: { items: 1 }, 480: { items: 3 }, 768: { items: 6 } }
    });

    $(".slider__btn_prev").click(function(e){
        e.preventDefault();
        var owl = $(this).closest(".slider").find('.owl-carousel');
        owl.owlCarousel();
        owl.trigger('prev.owl.carousel');
    });
    $(".slider__btn_next").click(function(e){
        e.preventDefault();
        var owl = $(this).closest(".slider").find('.owl-carousel');
        owl.owlCarousel();
        owl.trigger('next.owl.carousel');
    });
};


Viki.Site.ScrollAnimation = function () { };
Viki.Site.ScrollAnimation.Init = function (selector) {
  (function($) {
    $.fn.animated = function(inEffect) {
        $(this).each(function() {
            var ths = $(this);
            ths.css("opacity", "0").addClass("animated").waypoint(function(dir) {
                if (dir === "down") {
                    ths.addClass(inEffect).css("opacity", "1");
                };
            }, {
                offset: "90%"
            });
        });
    };
  })(jQuery);

  $('.main-slider__after, .main-slider__before').animated('slideInUp');
  $('.slider-content').animated('slideInDown');
  
  $('.benefit__img img').animated('zoomIn');
};