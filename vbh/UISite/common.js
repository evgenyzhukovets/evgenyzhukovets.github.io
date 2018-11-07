if ((typeof (Viki) == 'undefined') || (Viki == null)) Viki = function () { };
Viki.Site = function () { };
Viki.Site.SetupLive = function (selector) {


  Viki.Site.Slider.Init();
  Viki.Site.Navigation.Init();
  Viki.Site.Accordeon.Init();
  Viki.Site.Socials.Init();
};
Viki.Site.SetupPartial = function (selector) {};


Viki.Site.Slider = function () { };
Viki.Site.Slider.Init = function (selector) {
  $('.main-slider .owl-carousel').owlCarousel({
    loop:false,
    nav:true,
    responsive:{
        0:{
            items:1
        }
    }
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



    $('.main-nav__link_search').on('click', function (e) {
        e.preventDefault();
        if (window.matchMedia('(min-width: 768px)').matches) {
            $(this).parent().find('.search__form').addClass('search__form_visible');
        } else{
            $(this).parent().find('.search__form').toggleClass('search__form_visible');
        }    
    });
    $(document).mouseup(function (e) {
        var container = $(".search");
        if (container.has(e.target).length === 0){
            container.find('.search__form').removeClass('search__form_visible');
        }
    });


    $('.menu-toggle').on('click', function (event) {
        event.preventDefault();
        $($(this).attr('href')).slideToggle(200);
        $(this).toggleClass('is-active');
    });

    $('.main-nav__item_has-subnav .main-nav__link_level_1').on('click', function (e) {
        e.preventDefault();
        if (window.matchMedia('(max-width: 767px)').matches) {
            $(this).parent().find('.submenu').slideToggle(200);
        }
    });
};

Viki.Site.Accordeon = function () { };
Viki.Site.Accordeon.Init = function (selector) {
  $('.accordeon__content').hide(); 
    $('.accordeon__title').on('click', function (e) {
        $(this).toggleClass('accordeon__title_is-open').parent().find('.accordeon__content').slideToggle(200);
    });

    $('.box__more, .link-less').hide();
    $('.box__more-link a').on('click', function (e) {
        e.preventDefault();
        $(this).parent().prevAll('.box__more').toggleClass('box__more_hidden').slideToggle(200);
        $(this).find('.link-less, .link-more').toggle();
        $(this).find('.svg').toggleClass('svg_opened');
     });
};

Viki.Site.Socials = function () { };
Viki.Site.Socials.Init = function (selector) {
  Share = {
    /**
     * Показать пользователю дилог шаринга в сооветствии с опциями
     * Метод для использования в inline-js в ссылках
     * При блокировке всплывающего окна подставит нужный адрес и ползволит браузеру перейти по нему
     *
     * @example <a href="" onclick="return share.go(this)">like+</a>
     *
     * @param Object _element - элемент DOM, для которого
     * @param Object _options - опции, все необязательны
     */
    go: function(_element, _options) {
        var
            self = Share,
            options = $.extend(
                {
                    type:       'vk',    // тип соцсети
                    url:        location.href,  // какую ссылку шарим
                    count_url:  location.href,  // для какой ссылки крутим счётчик
                    title:      document.title, // заголовок шаринга
                    image:        '',             // картинка шаринга
                    text:       '',             // текст шаринга
                },
                $(_element).data(), // Если параметры заданы в data, то читаем их
                _options            // Параметры из вызова метода имеют наивысший приоритет
            );

        if (self.popup(link = self[options.type](options)) === null) {
            // Если не удалось открыть попап
            if ( $(_element).is('a') ) {
                // Если это <a>, то подставляем адрес и просим браузер продолжить переход по ссылке
                $(_element).prop('href', link);
                return true;
            }
            else {
                // Если это не <a>, то пытаемся перейти по адресу
                location.href = link;
                return false;
            }
        }
        else {
            // Попап успешно открыт, просим браузер не продолжать обработку
            return false;
        }
    },

    // ВКонтакте
    vk: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   '',
            }, _options);

        return 'http://vkontakte.ru/share.php?'
            + 'url='          + encodeURIComponent(options.url)
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&image='       + encodeURIComponent(options.image)
            + '&noparse=true';
    },

    // Facebook
    fb: function(_options) {
        var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   '',
            }, _options);

        return 'https://www.facebook.com/sharer/sharer.php'
            + '?u='+ encodeURIComponent(options.url);
    },

    // Твиттер
    tw: function(_options) {
        var options = $.extend({
                url:        location.href,
                count_url:  location.href,
                title:      document.title,
            }, _options);

        return 'http://twitter.com/share?'
            + 'text='      + encodeURIComponent(options.title)
            + '&url='      + encodeURIComponent(options.url)
            + '&counturl=' + encodeURIComponent(options.count_url);
    },

    // Открыть окно шаринга
    popup: function(url) {
        return window.open(url,'','toolbar=0,status=0,scrollbars=1,width=626,height=436');
    }
}
$(document).on('click', '.social_share', function(e){
    e.preventDefault();
    Share.go(this);
});
};




