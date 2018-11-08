$(document).ready(function(){
    $('.popup-btn').magnificPopup();

    $('.menu-toggle').on('click', function(event) {
        event.preventDefault();
        $('.main-menu').stop().slideToggle(300);
    });

    $('.achivement strong, .video-block .btn, .socials-share__btns').animated('bounceIn');
    $('.phone-img, .support').animated('fadeInUp');
    $('.main-header__logo').animated('fadeInLeft');
    $('.main-header__content').animated('fadeInRight');
});

$(window).scroll(function(){
    var menuTop=$(".main-nav").height();
    
    if($(this).scrollTop()>menuTop){
        $('.main-nav').addClass('main-nav_fixed');
    }
    else if ($(this).scrollTop()<menuTop){
        $('.main-nav').removeClass('main-nav_fixed');
    }
});

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