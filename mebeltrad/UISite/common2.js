
if ((typeof (Viki) == 'undefined') || (Viki == null)) Viki = function () { };
Viki.Site = function () { };
Viki.Site.SetupLive = function (selector) {

  Viki.Site.Navigation.Init(selector);
  Viki.Site.Carousel.Init(selector);
  

  $(window).load(function () {
    $('.viki-slider-box').each(function () { Viki.Site.Slider.Init($(this)); });
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) { $('#back-top').fadeIn(); } else { $('#back-top').fadeOut(); }
  });
  $('#back-top a').click(function () {
    $('body,html').stop(false, false).animate({ scrollTop: 0 }, 800);
    return false;
  });

};
Viki.Site.SetupPartial = function (selector) { };

$(document).ready(function () {
  var viki_gallery_n = 0;
  $('.viki-gallery').each(function () {
    viki_gallery_n++;
    var galName = 'viki-gallery' + viki_gallery_n;
    $(this).find('a img').each(function () {
      $(this).parents('a:first').attr('rel', galName);
    });


  });
});


Viki.Site.Slider = function () { };
Viki.Site.Slider.Init = function (selector) {
  var defaultDuration=18000;
  var isRightDirection=true;
  var duration=defaultDuration;
  var changeDuration=6000;

  var isVisible = $(selector).is(':reallyvisible');
  if (!isVisible) { $(selector).show(0); };

  var container_width = parseInt($(selector).find(".viki-slider-container").css('width'));
  var slider_width = 0;
  var is_first = true;
  $(selector).find(".viki-slider").children().each(function () {
    var e = $(this);
    var add = is_first ? 0 : (isNaN(parseInt(e.css('margin-left'))) ? 0 : parseInt(e.css('margin-left')))
                               + (isNaN(parseInt(e.css('margin-right'))) ? 0 : parseInt(e.css('margin-right')));
    if (is_first) is_first = false;
    slider_width += (isNaN(parseInt(e.width())) ? 0 : parseInt(e.width())) + add;
  });
  if (slider_width == 0) { slider_width = parseInt($(selector).find(".viki-slider").width()); }

  $(selector).find(".viki-slider").css('width', slider_width + 'px');
  var ml = isNaN(parseInt($(selector).find(".viki-slider-container").css('margin-left'))) ? 0 : parseInt($(selector).find(".viki-slider-container").css('margin-left'));
  var sliderDelta = slider_width - container_width + ml;

  if (sliderDelta <= 0) {
    $(selector).find('.viki-slider-left, .viki-slider-right').hide();
    if (!isVisible) { $(selector).hide(0); };
    return;
  };


  var sl = $(selector).find(".viki-slider");
  var left = isNaN(parseInt(sl.css('left'))) ? 0 : parseInt(sl.css('left'));
  addWidth = -(-left + sliderDelta + left);
  sl.animate({ left: addWidth }, defaultDuration, "linear", function () { });

  $(selector).find('.viki-slider-left, .viki-slider-right').each(function () {

    /*$(this).on('click', function () { return false; });*/

    $(this).on('click', function (e) {
      e.preventDefault();


      var isRight = $(this).hasClass("viki-slider-right");
      var sl = $(selector).find(".viki-slider");

      var left = isNaN(parseInt(sl.css('left'))) ? 0 : parseInt(sl.css('left'));

      var addWidth = 0;
      
      if(isRight!=isRightDirection){
        sl.stop();
        duration=defaultDuration;
      }  else {
        if((duration-8000)>0) {duration-=8000;}
      }
      isRightDirection=isRight;

      
      if (isRight) {
        if (left <= -sliderDelta)
          return;
        addWidth = -(-left + sliderDelta + left);
      }

      if (!isRight && left >= 0){
        isRightDirection=!isRightDirection;
        return;
      }


      console.log('addWidth:'+addWidth + ' duration:'+duration);
      sl.stop();
      sl.animate({ left: addWidth }, duration, "linear", function () { });
    });
  });

  if (!isVisible) { $(selector).hide(0); };

};



Viki.Site.Navigation = function () { };
Viki.Site.Navigation.Init = function (selector) {
  if($(window).width() > '768'){
    $('.mp-category-wrapper').hover(function () {
      if($(this).find('.mp-categories-sub').length>0){
        $(this).addClass('active').find('.mp-categories-sub').stop(true, true).slideDown(200);
      }
    }, function () {
      var elem = this;
      $(this).find('.mp-categories-sub').stop(true, true).slideUp(200);
      setTimeout(function (e) {
        $(elem).removeClass('active');
      },200)
    });
  };
  $('.mp-news-item').css('visibility', 'hidden');
  $('.mp-news').waypoint(function () {
    $('.mp-news-item').css('visibility', 'visible');
    $('.mp-news-item').addClass("fadeInUp animated");
  }, {
    offset: '90%'
  });

  $('.nav-button').on("click", function (e) {
    e.preventDefault();
    $('.mnc').stop().slideToggle();
    $('.hamburger').toggleClass('is-active');
  });
};

Viki.Site.Carousel = function () { };
Viki.Site.Carousel.Init = function (selector) {
  $(".customers-carousel").owlCarousel({
    autoplay: true,
    pagination: false,
    nav: false,
    items: 5,
    loop: true,
    autoplayTimeout: 1500,
    smartSpeed: 1000,
    responsive: { 0: { items: 1 }, 480: { items: 3 }, 768: { items: 6 }, 1200: { items: 10} }
  });
};