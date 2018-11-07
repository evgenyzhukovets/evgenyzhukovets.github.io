/* ------------------------------------------------------------------------
	s3Slider
	
	Developped By: Boban Karišik -> http://www.serie3.info/
        CSS Help: Mészáros Róbert -> http://www.perspectived.com/
	Version: 1.0
	
	Copyright: Feel free to redistribute the script/modify it, as
			   long as you leave my infos at the top.
------------------------------------------------------------------------- */


(function ($) {

    $.fn.s3Slider = function (vars) {

        var element = this;
        var timeOut = (vars.timeOut != undefined) ? vars.timeOut : 4000;
        var itemButtons = (vars.itemButtons != undefined) ? vars.itemButtons : false;
        var itemsButton = null;
        var current = null;
        var timeOutFn = null;
        var faderStat = true;
        var mOver = false;
        var items = $("#" + element[0].id + "Content ." + element[0].id + "Image");
        var itemsSpan = $("#" + element[0].id + "Content ." + element[0].id + "Image span");


        items.each(function (i) {

            $(items[i]).mouseover(function () {
                mOver = true;
            });

            $(items[i]).mouseout(function () {
                mOver = false;
                fadeElement(true);
            });

        });





        var fadeElement = function (isMouseOut) {
            var thisTimeOut = (isMouseOut) ? (timeOut / 2) : timeOut;
            thisTimeOut = (faderStat) ? 10 : thisTimeOut;
            if (items.length > 0) {
                timeOutFn = setTimeout(makeSlider, thisTimeOut);
                if (itemButtons && items.length > 2) fadeItemButton();
            } else {
                console.log("Poof..");
            }
        };


        var fadeItemButton = function () {
            var currNo = currIndex();
            $(itemsButton[currNo]).addClass('cur');
            currNo = (currNo == 0) ? items.length - 2 : (currNo - 1);
            $(itemsButton[currNo]).removeClass('cur');
        };

        var currIndex = function () {
            current = (current != null) ? current : items[(items.length - 1)];
            var currNo = jQuery.inArray(current, items) + 1
            currNo = (currNo == items.length) ? 0 : (currNo - 1);
            return currNo;
        };

        var makeSlider = function () {
            var currNo = currIndex();

            if (faderStat == true) {
                if (!mOver) {
                    $(items[currNo]).fadeIn((timeOut / 6), function () {
                        if ($(itemsSpan[currNo]).css('bottom') == 0) {
                            $(itemsSpan[currNo]).slideUp((timeOut / 6), function () {
                                faderStat = false;
                                current = items[currNo];
                                if (!mOver) {
                                    fadeElement(false);
                                }
                            });
                        } else {
                            $(itemsSpan[currNo]).slideDown((timeOut / 6), function () {
                                faderStat = false;
                                current = items[currNo];
                                if (!mOver) {
                                    fadeElement(false);
                                }
                            });
                        }
                    });
                }
            } else {
                if (!mOver) {
                    if ($(itemsSpan[currNo]).css('bottom') == 0) {
                        $(itemsSpan[currNo]).slideDown((timeOut / 6), function () {
                            $(items[currNo]).fadeOut((timeOut / 6), function () {
                                faderStat = true;
                                current = items[(currNo + 1)];
                                if (!mOver) {
                                    fadeElement(false);
                                }
                            });
                        });
                    } else {
                        $(itemsSpan[currNo]).slideUp((timeOut / 6), function () {
                            $(items[currNo]).fadeOut((timeOut / 6), function () {
                                faderStat = true;
                                current = items[(currNo + 1)];
                                if (!mOver) {
                                    fadeElement(false);
                                }
                            });
                        });
                    }
                }
            }
        }

        var makeItemButtons = function () {
            if (itemButtons && items.length > 1) {
                $("#" + element[0].id + 'Content .itemButtons').remove();
                $("#" + element[0].id + 'Content').append("<div class='itemButtons'></div>")
                var itemButtonBlock = $("#" + element[0].id + 'Content .itemButtons');
                for (var i = 0; i < items.length - 1; i++) {
                    itemButtonBlock.append($('<a>', { text: '', href: '#' }).attr('data-slider-item', i));
                };
                itemsButton = $("#" + element[0].id + 'Content .itemButtons a');

                itemsButton.each(function (i) {

                    $(itemsButton[i]).mouseover(function () {
                        mOver = true;
                    });

                    $(itemsButton[i]).mouseout(function () {
                        mOver = false;
                        fadeElement(true);
                    });

                });

                itemsButton.bind("click", function (e) {
                    var i = $(this).attr('data-slider-item');

                    var currNo = currIndex();
                    itemsButton.each(function (i) { $(itemsButton[i]).removeClass('cur'); });

                    $(items[currNo]).fadeOut(100);
                    $(itemsSpan[currNo]).hide(100);

                    $(itemsButton[i]).addClass('cur');
                    $(items[i]).fadeIn(300);
                    $(itemsSpan[i]).show(300);
                    current = items[i];
                    clearTimeout(timeOutFn);
                    
                    return false;
                });
                $(itemsButton[0]).addClass('cur');
            };
        };


        makeSlider();
        makeItemButtons();
    };

})(jQuery);  