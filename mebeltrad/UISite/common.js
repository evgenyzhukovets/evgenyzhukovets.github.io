

if ((typeof (Viki) == 'undefined') || (Viki == null)) Viki = function () { };
Viki.Site = function () { };
Viki.Site.SetupLive = function (selector) {
  Viki.Site.Navigation.Init();
  Viki.Site.OwlSlider.Init();
  Viki.Site.ScrollAnimation.Init();
  $(window).load(function () {
    $('.viki-slider-box').each(function () { Viki.Site.Slider.Init($(this)); });
  });

  $('.product-cart table').wrap('<div class="table-wrapper"></div>');


  $('.cat-block').hover(
    function () {
      /*$('.cat-block').addClass('cat-block_unhover');
      $(this).removeClass('cat-block_unhover');*/
      $('.cat-block').css('opacity', '0.3');
      $(this).css('opacity', '1');
    }, function () {
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
    var menuTop=$(".main-header").height();
    if($(this).scrollTop()>menuTop){
      $('.main-header').addClass('main-header_fixed').removeClass('slideOutUp').addClass('slideInDown');
      $('.main-content').css('padding-top',menuTop+40+'px');
    }
    else if ($(this).scrollTop()<menuTop){
      $('.main-header').removeClass('slideInDown').removeClass('main-header_fixed');
      $('.main-content').css('padding-top','0px');
    }
  });


  $('.main-menu__item').hover(

    function() {
      $(this).find('.dropdown').stop().slideToggle(300);
    }, function() {
      $(this).find('.dropdown').stop().slideToggle(300);
    }
  );
};

Viki.Site.OwlSlider = function () { };
Viki.Site.OwlSlider.Init = function (selector) {
    $('.main-slider .owl-carousel').owlCarousel({
        autoplay: true,
        loop:true,
        nav:false,
        smartSpeed: 1000,
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
        autoplayTimeout: 1500,
        smartSpeed: 1000,
        nav:false,
        margin:5,
        onTranslated: owlTranslated,
        onTranslate: owlTranslate,
        dotsContainer: 'main-slider__dots',
        responsive: { 0: { items: 1 }, 320: { items: 2 }, 480: { items: 3 }, 768: { items: 4 } }
    });
    $('.projects-slider .owl-carousel').owlCarousel({
        autoplay: true,
        loop:true,
        autoplayTimeout: 1500,
        smartSpeed: 1000,
        nav:false,
        margin:5,
        onTranslated: owlTranslated,
        onTranslate: owlTranslate,
        dotsContainer: 'main-slider__dots',
        responsive: { 0: { items: 1 }, 320: { items: 2 }, 480: { items: 3 }, 768: { items: 4 } }
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
        nav: false,
        dots:false,
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


    //Viki gallery
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
          return '<span>Фото ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
        }
      });
    });

    $('.gallery-big__link').on('click', function (e) {
      e.preventDefault();
      var target=$(this).data('gallery-target');
      $("a[href$='" + target + "']").trigger('click');
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



Viki.Site.Slider = function () { };
Viki.Site.Slider.Init = function (selector) {
  var defaultDuration;
  var isRightDirection=true;
  var duration;
  var durationChange=3;

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

  sl.stop();

  defaultDuration=(-addWidth)*30;
  duration=defaultDuration;

  sl.animate({ left: addWidth }, duration, "linear", function () { });

  $(selector).find('.viki-slider-left, .viki-slider-right').each(function () {



    $(this).on('click', function (e) {
      e.preventDefault();


      var isRight = $(this).hasClass("viki-slider-right");
      sl = $(selector).find(".viki-slider");
      sl.stop();

      var left = isNaN(parseInt(sl.css('left'))) ? 0 : parseInt(sl.css('left'));

      var addWidth = 0;

      if (isRight) {
        if (left <= -sliderDelta) return;
        addWidth = -(-left + sliderDelta + left);
      }
      if(isRight!=isRightDirection){
        duration=defaultDuration;
      }  else {
        if((duration/durationChange)>0) {
          duration/=durationChange;
        } else{
          duration=1000;
        }
      }
      isRightDirection=isRight;

      
      

      if (!isRight && left >= 0){
        return;
      }
      
      
      console.log('addWidth:'+addWidth + ' duration:'+duration + ' isRight:'+isRight + ' isRightDirection:'+isRightDirection);
      
      sl.animate({ left: addWidth }, duration, "linear", function () { });
    });
  });

  if (!isVisible) { $(selector).hide(0); };

};



//<iframe frameborder="0" id="scmframe" src="http://scmplayer.co/scm.html#http://localhost/mebeltrad.by"></iframe>
//<iframe src="javascript:location.replace('http://localhost/mebeltrad.by');" frameborder="0" id="content" allowtransparency="true" name="content"></iframe>


/*$(window).load(function () {
  if(!inIframe()){
    $('body').html("<audio controls autoplay='autoplay' id='audio'><source src='/mebeltrad.by/upload/file/music.mp3' type='audio/mpeg'>Тег audio не поддерживается вашим браузером.</audio>");
    $('body').append("<iframe src='"+location.href +"' frameborder='0' id='frame-content' allowtransparency='true' name='frame-content' class='frame-content'></iframe>" );
  }
  $("a").on('click', function (e) {
    var url = $(this).attr("href");
    setLocation(url);
  });
}); 

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
function setLocation(curLoc){
    var title = $('title').text();
    var desc=$('meta[name="Description"]').attr("content");
    var keywords=$('meta[name="Keywords"]').attr("content");
    var robots=$('meta[name="ROBOTS"]').attr("content");

    window.top.document.title=title;
    window.top.document.querySelector('meta[name="Description"]').setAttribute("content", desc);
    window.top.document.querySelector('meta[name="Keywords"]').setAttribute("content", keywords);
    window.top.document.querySelector('meta[name="ROBOTS"]').setAttribute("content", robots);

    try {
      window.top.history.pushState(null, null, curLoc);
      return;
    } catch(e) {}

    window.top.location.hash = '#' + curLoc;
}*/