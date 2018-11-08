if ((typeof (Viki) == 'undefined') || (Viki == null)) Viki = function () { };
Viki.Site = function () { };
Viki.Site.SetupLive = function (selector) {

  //$('.viki-gallery').each(function () { $(this).find('a > img').parent('a').lightBox({ fixedNavigation: false }); });

  Viki.Site.Cit.Setup();
  Viki.Site.VikiPopup.Init();
  Viki.Site.Carousel.Init ();
  Viki.Site.RbrHover.Setup(300);
  Viki.Site.ProjHover.Setup(200);
  Viki.Site.Animate.Setup(500);
  Viki.Site.Calculator.Init();
  /*Viki.Site.Bubble.Setup();*/
};
Viki.Site.SetupPartial = function (selector) {};

Viki.Site.VikiPopup = function () { };
Viki.Site.VikiPopup.Init = function () {

  $(".viki-popdn-button").on("click", function (e) { return false; });
  $(".viki-popdn-button").mouseover(function () { $(this).addClass('cur'); $(this).next("div").slideToggle(); });
  $(".viki-popdn-button").mouseout(function () { $(this).removeClass('cur'); $(this).next("div").css('display', 'none'); });
  $(".viki-popdn").mouseover(function () { $(this).prevAll('.viki-popdn-button:first').addClass('cur'); $(this).css('display', 'block'); });
  $(".viki-popdn").mouseout(function () { $(this).prevAll('.viki-popdn-button:first').removeClass('cur'); $(this).css('display', 'none'); });
};

Viki.Site.Bubble = function () { };
Viki.Site.Bubble.Setup = function (time) {
  var SoapBubbleMachineNumber1 = $('fn').BubbleEngine({
    particleSizeMin: 20,
    particleSizeMax: 100,
    particleSourceX: 120,
    particleSourceY: 50,    
    particleDirection: 'right',
    particleAnimationDuration: 1000,
    particleAnimationVariance: 5000,
    particleScatteringX: 1000,
    particleScatteringY: 500,
    gravity: 100
  }); 
  $('.hd .logo').hover(
        function () {
          var winWidth = $(window).width();
          if (winWidth > 500)               
            SoapBubbleMachineNumber1.addBubbles(5);
        },
        function () {
          SoapBubbleMachineNumber1.removeBubbles();
        });
};

Viki.Site.Animate = function () { };
Viki.Site.Animate.Setup = function (time) {
  var art = $('.art');
  var col = $('.col');
  art.css({ 'margin-left': '-100px', 'opacity': '0' }).animate({ 'margin-left': '0px', 'opacity': '1' }, time);
  col.css({ 'margin-right': '-100px', 'opacity': '0' }).animate({ 'margin-right': '0px', 'opacity': '1' }, time);

};

Viki.Site.Cit = function () { };
Viki.Site.Cit.Setup = function () {
  var time = parseInt($('#CitTimeSecOnClient').val() * 1000);
  (function f() {

    var bl = $('.cit');
    if (bl.css('display') == 'none')
      $('.cit .cwr').delay(time).queue(f);

    f.count = $('.cit .cwr').length;
    f.idx = (f.idx || 0) % f.count + 1;
    $($('.cit .cwr')[f.idx - 1]).fadeIn(1000).delay(time).fadeOut(500, f);
  })();
};

Viki.Site.RbrHover = function () { };
Viki.Site.RbrHover.Setup = function (time) {
  $('ul.rb li').hover(
        function () {
          h = $(this).height();
          var title = $(this).find('.t');          
          title.stop().css({ 'left': '-300px', 'opacity': '0' }).animate({ 'left': '15px', 'opacity': '1' }, time);
          if (h < 150) return;
          var con = $(this).find('.con');
          con.stop().animate({ 'height': '65px' }, time/3);
        },
        function () {
          var con = $(this).find('.con');
          con.stop().css({ 'height': '0px' })
        });
};

Viki.Site.ProjHover = function () { };
Viki.Site.ProjHover.Setup = function (time) {
  $('ul.proj li a').hover(
  function () {
    var more = $(this).find('.more');
    more.stop().css({ 'right': '-152px'}).animate({ 'right': '0px' }, time);
  },
  function () {
    var more = $(this).find('.more');
    more.stop().css({ 'right': '-152px'});
  });
};

Viki.Site.BoxfixedOpen = function () {
  $('#boxfixed-wr #boxfixed-cont').html("<div id='boxfixed-loading'></div>");
  $('#boxfixed-wr').css('display', 'block');
  return true;
};
Viki.Site.BoxfixedComplete = function () {
  var boxWidth = $('#boxfixed-cont').width();
  var boxHeight = $('#boxfixed-cont').height();
  var winWidth = $(window).width();

  $('#boxfixed').css({ 'margin': '-' + (boxHeight / 2) - 30 + 'px 0 0 -' + (winWidth > 350 ? (boxWidth / 2) : (boxWidth - 80)) + 'px' });
  return true;
};


$(document).ready(function(){
  $('a.scrollto').bind("click", function(e){
    e.preventDefault();
    var anchor = $(this);
    $('html, body').stop().animate({
    scrollTop: $(anchor.attr('href')).offset().top
    }, 500);
    
  });

  $('.sidebar-btn').on('click', function (event) {
        event.preventDefault();
        $('.sidebar').removeClass('sidebar_active');
        if(!$(this).hasClass('is-active')){
          $($(this).attr('href')).addClass('sidebar_active');
          setTimeout(function(){
            $('.hamburger').addClass('is-active');
          },300);
        } else {
          setTimeout(function(){
            $('.hamburger').removeClass('is-active');
          },300);
        }
        
    });

  portfolioGrid();

  $(window).on('resize', function(event) {
    event.preventDefault();
    portfolioGrid();
  });
});

function portfolioGrid (){
  var width=$('.portfolio-item').first().width();
  $('.portfolio-item').each(function(index, el) {
    $(el).height(width);
  });
}


Viki.Site.Carousel = function () { };
Viki.Site.Carousel.Init = function (selector) {
  $('.owl-carousel').owlCarousel({
    loop:true,
    nav:false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        }
    }
})
};

Viki.Site.Calculator = function () { };
Viki.Site.Calculator.Init = function (selector) {
  $('.calc-desc').hide();
  $('.calc-option').on('change', function () {
    if($(this).prop('checked')){
      addItem($(this).closest('.calc-item'));
    } else{
      removeItem($(this).closest('.calc-item'));
    }
  });
  $('.calc-title').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.calc-item').find('.calc-desc').slideToggle();
  });
  $('.calc-item-options').on('change', function () {
    var price = $(this).find('option:selected').data('value');
    var item =  $(this).closest('.calc-item');
    item.find('.calc-option').data('value', price);
    item.find('.calc-item-price').text('$' + price);

    var opt = $(this).closest('.calc-item').find('.calc-option');
    if(opt.prop('checked')){
      removeItem($(this).closest('.calc-item'));
      addItem($(this).closest('.calc-item'));
    }
    
  });

  function addItem(elem){
    var name = $(elem).find('.calc-title').text();
    var id =  $(elem).prop('id');
    var price = $(elem).find('.calc-option').data('value');

    $('.calc-total-items').append('<div class="calc-total-item" data-id="' + id + '">' + name + '<strong>$'+ price+'</strong>'+ '</div>')
    $(elem).addClass('calc-item_active');

    recalcTotal();
  }

  function removeItem(elem){
    var id =  $(elem).prop('id');

    $('[data-id="'+ id +'"]').detach();
    $(elem).removeClass('calc-item_active');
    recalcTotal();
  }  

  function recalcTotal(){
    var sum=0;
    $('.calc-option:checked').each(function(index, el){
      sum+=$(el).data('value');
    });
    $('.calc-total-price').text('$' + sum);
  }


};



