if ((typeof (Viki) == 'undefined') || (Viki == null)) Viki = function () { };
Viki.Site = function () { };
Viki.Site.SetupLive = function (selector) {


  Viki.Site.Slider.Init();
  Viki.Site.Navigation.Init();
  Viki.Site.ScrollAnimation.Init();
};
Viki.Site.SetupPartial = function (selector) {};


Viki.Site.Slider = function () { };
Viki.Site.Slider.Init = function (selector) {
  $('.comments-slider .owl-carousel').owlCarousel({
    loop:true,
    nav:true,
    responsive:{
        0:{
            items:1
        }
    }
  });
  $('.car-slider .owl-carousel').owlCarousel({
    loop:true,
    nav:true,
    responsive:{
        0:{
            items:1
        }
    }
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

Viki.Site.Navigation = function () { };
Viki.Site.Navigation.Init = function (selector) {
 $(window).scroll(function(){
      var menuTop=$(".main-header").height();
        
        if($(this).scrollTop()>menuTop){
            $('.main-header').addClass('main-header_fixed');
        }
        else if ($(this).scrollTop()<menuTop){
            $('.main-header').removeClass('main-header_fixed');
        }
    });

    $('.menu-toggle').on('click', function (event) {
        event.preventDefault();
        $($(this).attr('href')).slideToggle(200);
        $(this).toggleClass('is-active');
    });

    $('.scroll-link').on("click", function(e){
      e.preventDefault();
      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($(anchor.attr('href')).offset().top-50)
      }, 500);    
    });
};





$(document).ready(function () {

  $( ".form input[placeholder*='телефон']" ).mask("+375 99 9999999", { placeholder: "+375 __ _______" })

  var viki_gallery_n = 0;
  $('.viki-gallery').each(function () {
    viki_gallery_n++;
    var galName = 'viki-gallery' + viki_gallery_n;
    $(this).find('a img').each(function () {
      $(this).parents('a:first').attr('rel', galName);
    });

    $('a[rel=' + galName + ']').fancybox({
      'transitionIn': 'elastic',
      'transitionOut': 'none',
      'titlePosition': 'inside',
      'titleFormat': function (title, currentArray, currentIndex, currentOpts) {
        return '<span>¹' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
      }
    });
  });

  $('.mobile-phones__button').on('click', function (e) {
    e.preventDefault();
    $('.mobile-phones__phones').show();
  });
  $(document).mouseup(function (e) {
      var container = $(".mobile-phones__phones");
      if (container.has(e.target).length === 0){
          container.hide();
      }
  });
});


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

  $('.fade-in-left, .drivers__item:nth-of-type(odd)').animated('fadeInLeft');
  $('.fade-in-right, .drivers__item:nth-of-type(even)').animated('fadeInRight');
  $('.fade-in-up').animated('fadeInUp');
};