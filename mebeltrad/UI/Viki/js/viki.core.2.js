
$ = jQuery.noConflict();
if ((typeof (Viki) == 'undefined') || (Viki == null)) Viki = function () { };
Viki.StripTags = function (html) { return html.replace(/<\/?[^>]+>/gi, ''); };


String.prototype.replaceAll = function (search, replace) {
  return this.split(search).join(replace);
};

String.prototype.trimChar = function (charToRemove) {
  var string = this;
  while (string.charAt(0) == charToRemove) {
    string = string.substring(1);
  }
  while (string.charAt(string.length - 1) == charToRemove) {
    string = string.substring(0, string.length - 1);
  }
  return string;
};

Viki.Selector = function (selector) {
  if (typeof selector != 'object' || selector == undefined) {
    if (selector == '' || selector == undefined) { selector = $(document.body); }
    else { selector = $(selector); };
  };
  return selector;
};
jQuery.extend(
  jQuery.expr[":"],
  {
    reallyvisible: function (a) {
      return !(jQuery(a).is(":hidden") || jQuery(a).parents(":hidden").length || jQuery(a).css('display') == 'none');
    }
  }
);
Viki.Exec = function (callback, args) {
  if (callback && callback != '') {
    if (typeof (callback) == 'function') {
      if (args) callback(args);
      else callback();
    };
    if (typeof (callback) == 'string') {
      try { eval(callback); }
      finally { }
    };
  };
};
function getRnd(min, max) {
  var randomNum = Math.random() * (max - min);
  return (Math.round(randomNum) + min);
};

Viki.IsNullOrEmpty = function (val) {
  return val == undefined || val == '';
};


Viki.UrlRoot = function () {
  var defaultPorts = { "http:": 80, "https:": 443 };
  return window.location.protocol + "//" + window.location.hostname
   + (((window.location.port)
    && (window.location.port != defaultPorts[window.location.protocol]))
    ? (":" + window.location.port) : "");
}

Viki.UrlNoCach = function (url) {
  if (url) {
    var n = url.indexOf("://", 0);
    if (n == -1) {
      url = Viki.UrlRoot() + url;
    };
    url += (url.indexOf("?") != -1 ? "&" : "?") + "rnd=" + Math.random();
  }
  return url;
};

Viki.QueryStringParam = function (name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

Viki.QueryStringParamSet = function (key, value, url) {
  if (!url) url = window.location.href;
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"), hash;
  if (re.test(url)) {
    if (typeof value !== 'undefined' && value !== null)
      return url.replace(re, '$1' + key + "=" + value + '$2$3');
    else {
      hash = url.split('#');
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
      if (typeof hash[1] !== 'undefined' && hash[1] !== null)
        url += '#' + hash[1];
      return url;
    }
  } else {
    if (typeof value !== 'undefined' && value !== null) {
      var separator = url.indexOf('?') !== -1 ? '&' : '?';
      hash = url.split('#');
      url = hash[0] + separator + key + '=' + value;
      if (typeof hash[1] !== 'undefined' && hash[1] !== null)
        url += '#' + hash[1];
      return url;
    }
    else
      return url;
  };
};

Viki.Redirect = function (url, sender) {
  var progress = $(sender).find('.viki-redirect-progress');
  if (progress.length <= 0) { progress = $('.viki-redirect-progress'); }
  if (progress.length > 0) { progress.show(); }
  location.href = url;
};


Viki.SetupLive = function (selector) {
  /*$(selector).find('form').live('submit', {}, function (e) { return Viki.SubmitForm(this, e); });*/
  $(document).on('submit', 'form', function (e) { return Viki.SubmitForm(this, e); });
  
  /*$(selector).find('[viki-action-click]').live('click', {}, function (e) { return Viki.SubmitAjaxForm(this, e); });*/
  $(document).on('click', '[viki-action-click]', function (e) { return Viki.SubmitAjaxForm(this, e); });
  
  /*$(selector).find('[viki-submit], input[viki-action], a[viki-action]').live('click', {}, function (e) { return Viki.SubmitAjaxForm(this, e); });*/
  $(document).on('click', '[viki-submit], input[viki-action], a[viki-action]', function (e) { return Viki.SubmitAjaxForm(this, e); });

  /*$(selector).find('[viki-action-change]').vikilive('change', {}, true, function (sender, e) { return Viki.SubmitAjaxForm(sender, e); });*/
  $(document).on('change', '[viki-action-change]', function (e) { return Viki.SubmitAjaxForm(this, e); });

  /*$(selector).find('[viki-validation-change]').vikilive('change', {}, false, function (sender, e) { Viki.ValidationChange(sender, e); });*/
  $(document).on('change', '[viki-validation-change]', function (e) { return Viki.ValidationChange(this, e); });
  
  Viki.Tabs.Init(selector);
  Viki.ShoppingCart.Init(selector);  
  Viki.DataPicker.Init(selector);
  Viki.Tree.Init(selector);
  Viki.Fading.Init(selector);
  Viki.AjaxPaging.Init(selector);
  Viki.Parallax.Init();
  if (Viki.Site && Viki.Site.SetupLive) {
    Viki.Site.SetupLive(selector);
  }
};

Viki.SetupPartial = function (selector) {
  Viki.ShoppingCart.RedirectToPay(selector);
  $(selector).find('[viki-keypress]').on("keydown", function (e) { return Viki.KeyPress.KeyUp($(this), e); })
  Viki.PartialLoader.Init(selector);
  Viki.KeyPressDdl.Init(selector);
  VikiNamedPopupCloseClick.Init(selector);
  VikiPopup.Init(selector);
  Viki.Grid.Init();
  if (Viki.Site && Viki.Site.SetupPartial) {
    Viki.Site.SetupPartial(selector);
  }
};

Viki.Setup = function (selector) {
  selector = Viki.Selector(selector);
  Viki.SetupLive(selector);
  Viki.SetupPartial(selector);
};


Viki.Parallax = function () { };
Viki.Parallax.Init = function () {

  $('[data-viki-parallax]').each(function () {
    var bgobj = $(this);
    var json = $(bgobj).data('viki-parallax');
    var posX = $(bgobj).css('background-position').split(' ')[1];

    $(window).scroll(function () {
      var posY = -($(window).scrollTop() / json.speed);
      var posBg = posX + ' ' + posY + 'px';
      if (json.type == 'background') {
        $(bgobj).css({ 'background-position': posBg });        
      };
    });
  });

};



Viki.Tabs = function () { };
Viki.Tabs.Init = function (selector) {

  
  $(document).on('click', '.viki-tabs [data-viki-tabs]', function (e) { 
    var attr = $(this).attr('data-viki-tabs');
    var tabs = $(this).parents('.viki-tabs:first');

    tabs.find('[data-viki-tabs]').removeClass('act');
    $(this).addClass('act');

    tabs.find('.viki-tab').hide();
    tabs.find('.' + attr).fadeIn(function () {
      $(document.body).trigger('Viki.Tabs.Frame.Show', this);
    });
    return false;
  });
};
Viki.Tabs.Select = function (container, tabName) {
  $(container).find('[data-viki-tabs=' + tabName + ']').trigger('click');
  return true;
};





Viki.Fading = function () { };
Viki.Fading.Init = function (selector) {
  $(selector).find('.viki-fading a').each(function () {
    $(this).on('mouseenter', function () {
      $(this).css('opacity', '0.20');
      $(this).animate({ opacity: 1 }, function () { });
    });
  });
};

Viki.Grid = function () { };
Viki.Grid.Init = function () {
  var i = 0;
  var selectColor = $('.PLGMain').attr('viki-grid-color-hover');
  if (Viki.IsNullOrEmpty(selectColor)) { selectColor = '#e6e6e6'; };

  var attrDelay = $('.PLGMain').attr('viki-grid-delay');
  var selectDelay = Viki.IsNullOrEmpty(attrDelay) ? 200 : parseInt(attrDelay);


  $(".PLGMain TR:has(td):not(.PLGPagerStyle)").each(function () {
    i++;
    if (i > 1) {
      var altCss = i % 2 ? 'PLGAlternatingItemStyle' : 'PLGItemStyle';
      $(this).addClass(altCss);

      var color = $(this).css('background-color');
      $(this).attr('viki-grid-color', color);

      $(this).hover(
                function () {
                  if (selectDelay == 0) {
                    $(this).addClass('PLGOnMouseItemStyle').css('background-color', selectColor);
                  }
                  else {
                    $(this).animate({ 'background-color': selectColor }, selectDelay, function () {
                      $(this).addClass('PLGOnMouseItemStyle');
                    });
                  };
                },
                function () {
                  if (selectDelay == 0) {
                    $(this).removeClass('PLGOnMouseItemStyle').css('background-color', $(this).attr('viki-grid-color')); ;
                  }
                  else {
                    $(this).animate({ 'background-color': $(this).attr('viki-grid-color') }, selectDelay, function () {
                      $(this).removeClass('PLGOnMouseItemStyle');
                    });
                  };
                }
            );
    };
  });
};

Viki.Grid.Submit = function (it) {
  Viki.SetField($(it), 'PageNum', 1);
  return true;
};


/*----- End -----*/
function DelPr() {
  return confirm('Вы уверены ?');
}

Viki.PartialLoader = function () { };
Viki.PartialLoader.Init = function (selector) {
  $(selector).find('[viki-partial-loader]').each(function () {
    var url = $(this).attr('viki-partial-loader');

    Viki.AjaxMapTo($(this), url, null, 'async', function () {
      $('[viki-partial-loader="' + url + ']"').removeClass('viki-partial-loader');
    }, false);
  });
};


Viki.TypeWatch = function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
} ();


/*----- Viki.KeyPress -----*/
Viki.KeyPress = function () { };
Viki.KeyPress.Sender = null;
Viki.KeyPress.KeyUp = function (sender, e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 13) {
    return false;
  } else if (code == 40 || code == 38) {
    return false;
  } else {
    Viki.KeyPress.Sender = sender;
    Viki.TypeWatch(function () { Viki.KeyPress.KeyUpStart() }, 1000);
  };
  return true;
};
Viki.KeyPress.KeyUpStart = function () {
  var sender = Viki.KeyPress.Sender;
  Viki.SubmitAjaxForm(sender, null);
  return true;
};


/*----- Viki.KeyPressDdl -----*/
Viki.KeyPressDdl = function () { };
Viki.KeyPressDdl.Init = function (selector) {
  $(selector).find('[viki-keypress-ddl]')
        .on("keydown", function (e) { return Viki.KeyPressDdl.KeyUp($(this), e); })
        .mouseout(function () { $(this).nextAll('div.viki-keypress-ddl:first').css('display', 'none'); })
        .focusin(function () { $(this).nextAll('div.viki-keypress-ddl:first').css('display', 'none'); });

  $(selector).find('div.viki-keypress-ddl').mouseover(function () { $(this).css('display', 'block'); });
  $(selector).find('div.viki-keypress-ddl').mouseout(function () { $(this).css('display', 'none'); });
};
Viki.KeyPressDdl.Sender = null;
Viki.KeyPressDdl.KeyUp = function (sender, e) {

  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 13) {
    var submitType = sender.attr('data-viki-keypress-ddl-autosubmit');
    if (!submitType || submitType == 'true') {
      return true;
    };
    var box = sender.nextAll('div.viki-keypress-ddl:first');
    box.css('display', 'none');
    return false;

  } else if (code == 40 || code == 38) {
    var box = sender.nextAll('div.viki-keypress-ddl:first');
    var id = box.prevAll('input:hidden:first');
    var curVal = sender.val();
    var curId = id.val();

    var curA = $(box).find('a.cur');
    var nextA = curA;
    if (curA.length > 0) {
      curA.removeClass('cur');
      var parent = curA.parents('li:first');
      if (code == 40) { nextA = parent.nextAll('li:first').find('a'); } else { nextA = parent.prevAll('li:first').find('a'); };
    } else {
      if (code == 40) { nextA = $(box).find('a:first'); } else { nextA = $(box).find('a:last'); };
    };
    if (nextA.length > 0) {
      nextA.addClass('cur');
      id.attr('value', nextA.attr('viki-val'));
      sender.val(Viki.StripTags(nextA.html()));
    } else {
      id.val(curId);
      sender.val(curVal);
    };

    return false;
  } else {
    Viki.KeyPressDdl.Sender = sender;
    Viki.TypeWatch(function () { Viki.KeyPressDdl.KeyUpStart() }, 1000);
  };
  return true;
};
Viki.KeyPressDdl.KeyUpStart = function () {
  var sender = Viki.KeyPressDdl.Sender;
  $(sender).nextAll('input:hidden:first').val('');
  var box = $(sender).nextAll('div.viki-keypress-ddl:first');
  $(box).fadeOut();

  var val = $(sender).val();
  if (!val || val.length <= 1)
    return true;
  var url = $(sender).attr('viki-keypress-ddl');
  $.ajax({
    url: Viki.UrlNoCach(url),
    dataType: "json",
    type: 'POST',
    async: 'async',
    data: { words: val },
    success: function (data) {
      var box = $(sender).nextAll('div.viki-keypress-ddl:first');
      var ul = box.find('ul:first');
      var li = '';
      if (data.Values !== null && typeof (data.Values) != 'undefined') {
        for (var i = 0; i < data.Values.length; i = i + 2) {
          li += "<li><a href='#' viki-val='" + data.Values[i] + "' Title='" + Viki.StripTags(data.Values[i + 1]) + "'>" + data.Values[i + 1] + "</a></li>";
        };
      };
      if (li.length > 0) {
        ul.html(li);
        ul.find('a').on("click", function (e) {
          var box = $(this).parents('div.viki-keypress-ddl:first');
          var id = box.prevAll('input:hidden:first');
          var input = box.prevAll('input[viki-keypress-ddl]:first');
          input.val(Viki.StripTags($(this).html()));
          var val = $(this).attr('viki-val');
          id.attr('value', val);
          input.focus();
          $(box).fadeOut();

          var submitType = input.attr('data-viki-keypress-ddl-autosubmit');
          if (!submitType || submitType == 'true')
            ul.parents("form:first").submit();
          return false;
        });
        $(box).fadeIn();
      };
    },
    error: function (req, status, e) {

    }
  });

  return true;
};
/*----- End -----*/


/*
Viki.FixIEIsWait = false; // fix bug: twice .live('change',...) in IE7... 
Viki.FixIE = function (sender, e, f) {
  if (Viki.FixIEIsWait) {
    return false;
  }
  else {
    Viki.FixIEIsWait = true;
    if (f) {
      setTimeout(function () {
        var ret = f(sender, e);
        Viki.FixIEIsWait = false;
        return ret;
      }, 200);
    };
    return true;
  };
};
*/
/*
(function ($) {
  $.fn.extend({
    vikilive: function (command, f1, isReturn, f2) {
      $(this).live(command, f1, function (e) {
        var ret = Viki.FixIE($(this), e, f2);
        return isReturn ? ret : true;
      });      
    }
  });
})(jQuery);
*/




/*----- VikiPopup -----*/
VikiPopup = function () { };
VikiPopup.Init = function (selector) {
  $(selector).find(".viki-popup-button").mouseover(function () {
    $(this).next("div").show();
  });
  $(selector).find(".viki-popup-button").mouseout(function () { $(this).next("div").css('display', 'none'); });
  $(selector).find(".viki-popup").mouseover(function () { $(this).css('display', 'block'); });
  $(selector).find(".viki-popup").mouseout(function () { $(this).css('display', 'none'); });
};
/*------VikiPopupClick--------*/
VikiNamedPopupCloseClick = function () { };
VikiNamedPopupCloseClick.Init = function (selector) {
  $(selector).find('[viki-popup]').each(function (n, el) {
    var cl_css = $(el).attr('viki-popup');
    var cl_mode = $(el).attr('data-viki-popup-mode');

    var cl = cl_css == '' ? $(el).nextAll('div:first') : $('.' + cl_css);
    if (cl != undefined) {
      if (cl_mode != 'open') {
        cl.css('display', 'none');
      }
      $(el).on('click', function () {
        if ($(cl).is(':reallyvisible')) $(cl).fadeOut(); else $(cl).fadeIn();
        return false;
      });
    };
    var c2 = $('.' + cl_css + '-close');
    if (c2 != undefined) {
      c2.on('click', function () {
        $(cl).fadeOut();
        return false;
      });
    }
  });
};


Viki.SetField = function (it, fieldId, value) {
  var form = Viki.ParentActionSelector(it);
  if (form) {
    var field = $(form).find('#' + fieldId);
    if (field.length > 0) {
      $(field).val(value);
    };
  };
};

Viki.AddField = function (it, fieldId, value, formId) {
  var form = Viki.IsNullOrEmpty(formId) ? Viki.ParentActionSelector(it) : $('#' + formId + ':first');
  if (!form) { return; };
  var field = $(form).find('#' + fieldId);
  if (field.length == 0) {
    $(form).append("<input type='hidden' id='" + fieldId + "' name='" + fieldId + "' value='" + value + "' />");
  } else {
    $(field).val(value);
  };
  return form;
};

Viki.SubmitWithField = function (it, fieldId, value, formId) {
  var form = Viki.AddField($(it), fieldId, value, formId);
  if (form) {
    if ($(form)[0].tagName == 'FORM') {
      $(form).submit();
    }
    else {
      Viki.SubmitAjaxForm(form);
    };
  }
  $('#' + fieldId).remove();
  return false;
};

Viki.PadNumber = function (number) {
  var ret = new String(number);
  if (ret.length == 1)
    ret = '0' + ret;
  return ret;
};


Viki.DataPicker = function () { };
Viki.DataPicker.Init = function () {

  var datepickerConfig = {
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    beforeShowDay: function (date) {
      var id = $(this).attr('id');
      var onlyDates = $('#' + id + '_AllowDates').val();
      if (onlyDates != undefined) {
        var d = Viki.PadNumber(date.getDate());
        var m = Viki.PadNumber(date.getMonth() + 1);
        var y = date.getFullYear();
        var dateString = d + "." + m + "." + y;
        if (onlyDates.indexOf(dateString) >= 0)
          return [true];
        return [false];
      }
      return [true];
    }
  };

  if ($.datepicker) {
    $.datepicker.setDefaults(datepickerConfig);
  };  
  $(document).on('focusin', '.viki-datepicker', function (e) { return Viki.DataPicker.Focus($(this), e); });
};
Viki.DataPicker.Focus = function (sender, e) {

  if (!$(sender).datepicker) {
    var exStr = $(sender).attr('viki-datepicker_attr');
    if (exStr != undefined) {
      var exJson = eval("[" + exStr + "]")[0];
      $(sender).datepicker($.extend(exJson)).focus();
    }
    else {
      $(sender).datepicker().focus();
    }
  } else {
    $(sender).datepicker().focus();
  };
  return true;
};


Viki.AjaxLink = function (sender, e) {
  var f = $(sender);
  var ajax = f.attr('viki-ajax-type');

  if (ajax) {
    Viki.AjaxMapTo(f, f.attr('href'), null, ajax, null, true);
  };
  return false;
};


Viki.SubmitForm = function (sender, e) {
  var f = $(sender);
  var v = f.attr('viki-validator');
  var isValid = v ? Validator.Check(v) : true;
  if (v)
    f.attr('viki-validation-submitted', '1');

  if (!isValid)
    return false;
  var ajax = f.attr('viki-ajax-type');
  if (ajax) {
    Viki.AjaxMapTo(f, f.attr('action'), Viki.Serialize(null, f), ajax, null, true);
    return false;
  };
  return true;
};

Viki.ParentActionSelector = function (f) {
  var action = f.attr('viki-action-click');
  if (!action)
    action = f.attr('viki-action-change');
  if (!action)
    action = f.attr('viki-action');
  var selector = f;
  selector = f.parents('[viki-action="' + action + '"]:first');
  if (selector.length == 0) {
    selector = f.parents('[action="' + action + '"]:first');
  };
  if (selector.length == 0 && !action) {
    selector = f.parents('[viki-action]:first');
  };
  if (selector.length == 0 && !action) {
    selector = f.parents('form');
  };
  if (selector.length == 0) {
    selector = f;
  };
  return selector;
};

Viki.Serialize = function (dataselector, selector) {
  if (dataselector) {
    var fnd = $(dataselector).find('input:not([viki-noserialize]), textarea:not([viki-noserialize]), select:not([viki-noserialize])');
    return fnd.length == 0 ? $(dataselector).serialize() : fnd.serialize();
  }
  var fnd = $(selector).find('input:not([viki-noserialize]), textarea:not([viki-noserialize]), select:not([viki-noserialize])');
  return fnd.length == 0 ? $(selector).serialize() : fnd.serialize();
};

Viki.SubmitAjaxForm = function (sender, e) {
  /*e.preventDefault();*/
  var f = $(sender);
  var selector = Viki.ParentActionSelector(f);

  if (f.attr('viki-submit'))
    f = selector;

  var action = selector.attr('viki-action-click');
  if (!action)
    action = selector.attr('viki-action-change');
  if (!action)
    action = selector.attr('viki-keypress');
  if (!action)
    action = selector.attr('viki-action');
  if (!action)
    action = selector.attr('action');


  var v = selector.attr('viki-validator');
  if (v) {
    selector.attr('viki-validation-submitted', '1');
    var isValid = Validator.Check(v);
    if (!isValid)
      return false;
  }

  v = selector.attr('viki-validation-change');
  if (v) {
    validselector = selector.parents('[viki-validator="' + v + '"]');
    if (validselector.length > 0) {
      var subm = validselector.attr('viki-validation-submitted');
      if (subm)
        Validator.Check(v);
    };
  };

  var ajax = f.attr('viki-ajax-type');
  if (!ajax) {
    ajax = selector.attr('viki-ajax-type');
  };

  if (ajax && $(sender).get(0) != $(f).get(0)) {
    var onBegin = $(sender).attr('viki-ajax-on-begin');
    if (onBegin) {
      var ret = eval(onBegin)($(sender));
      if (!ret)
        return false;
    };
  };

  if (ajax) {

    var dataselector = selector.attr('viki-ajax-dataselector');
    var data = Viki.Serialize(dataselector, selector);
    if (data.length == 0)
      data = Viki.Serialize(null, selector);

    Viki.AjaxMapTo(f, action, data, ajax, null, true);
  } else if (selector[0].tagName == 'FORM') {
    $(selector[0]).submit();
  };
  return false;
};

Viki.ValidationChange = function (sender, e) {
  var f = $(sender);
  var v = f.attr('viki-validation-change');
  var parent = $(document.body).find('[viki-validator=' + v + ']');
  if (parent.length == 0) {
    return false;
  };

  var submitted = $(parent[0]).attr('viki-validation-submitted');
  var summary = $(parent[0]).attr('viki-validation-summary');
  if (Viki.IsNullOrEmpty(submitted)) {
    return false;
  };
  if (!Viki.IsNullOrEmpty(summary) && summary == 'set') {
    $(parent[0]).attr('viki-validation-summary', '')
    return false;
  };

  if (v) Validator.Check(v);

  return false;
};


Viki.Ajax = function () { };
Viki.Ajax.onBegin = function (sender) {
  var onBegin = sender.attr('viki-ajax-on-begin');
  if (onBegin) {
    var ret = eval(onBegin)(sender);
    return ret;
  };
  return true;
};
Viki.Ajax.onSuccess = function (sender, data) {
  var onSuccess = sender.attr('viki-ajax-on-success');
  if (onSuccess) {
    eval(onSuccess)(sender, data);
  };
};
Viki.Ajax.onComplete = function (sender) {
  var onComplete = sender.attr('viki-ajax-on-complete');
  if (onComplete) {
    eval(onComplete)(sender);
  };
};


Viki.AjaxMapTo = function (sender, url, data, ajaxType, afterComplete, isIndicateWait) {
  var realSender;
  if (ajaxType == 'none') {
    Viki.Redirect(url, sender);
    return false;
  };

  $.ajax({
    url: Viki.UrlNoCach(url),
    dataType: "json",
    type: 'POST',
    async: (ajaxType == 'async'),
    data: data,
    beforeSend: function () {
      realSender = sender;

      if (!Viki.Ajax.onBegin(sender))
        return false;

      if (realSender == null)
        return true;

      if ($(sender)[0].tagName == 'FORM' || $(sender).attr('viki-action')) {
        realSender = $(sender).find('input[type=submit], [viki-submit]');
        $(realSender).attr('disabled', 'disabled');
      } else if ($(sender)[0].tagName == 'SELECT') {
        $(realSender).attr('disabled', 'disabled');
      } else if ($(sender)[0].tagName == 'A') {
        if ($(realSender).hasClass('viki-ajax-worked')) {
          return false;
        };
        $(realSender).addClass('viki-ajax-worked');
      };

      var i = 0;
      if (isIndicateWait) {
        $(realSender).each(function () {
          i++;
          var pos = $(this).offset();
          if (Viki.IsNullOrEmpty($(this).attr('id'))) {
            $(this).attr('id', 'viki-ajax-' + getRnd(1, 10000));
          };
          var waitId = $(this).attr('id') + '-wait';
          var wait = $('#' + waitId);
          if (wait == undefined || wait.length <= 0) {
            if (!Viki.IsNullOrEmpty($(this).attr('viki-ajax-float'))) {
              var fl = $(this).attr('viki-ajax-float');
              if (fl == 'right') {
                pos.left = pos.left + 35 + $(this).outerWidth(true);
              };
            };

            $(document.body).append('<div id="' + waitId + '" class="viki-ajax-wait" style="top:' + (pos.top - 3) + 'px;left:' + (pos.left - 30 < 0 ? 0 : pos.left - 30) + 'px"></div>');
            wait = $('#' + waitId);
          };
          $(wait).fadeIn();
        });
      };

      if (!sender.attr('viki-partial-loader')) {
        var updateSelectors = sender.attr('viki-ajax-update');
        if (updateSelectors) {
          var selectors = updateSelectors.split(',');
          for (var i = 0; i < selectors.length; i++) {
            $(selectors[i]).animate({ opacity: 0.1 });
            $(selectors[i]).find('select, input')
                                   .attr('disabled', 'disabled')
                                   .addClass('viki-ajax-worked');
          };
        };
      };

    },
    success: function (data) {
      if (data.Redirect !== null && typeof (data.Redirect) != 'undefined' && data.Redirect.length > 0) {
        Viki.Redirect(data.Redirect, sender);
      };

      if (data.Validation !== null && typeof (data.Validation) != 'undefined') {
        var v = data.Validation.Group;
        if (v != null && typeof (v) != 'undefined' && v.length > 0) {
          Validator.SetSummary(v, data.Validation.Messages, '{0}', true);
        };
      };

      var updateSelectors = sender.attr('viki-ajax-update');
      var updateSelectorsType = sender.attr('viki-ajax-update-type');
      if (updateSelectors && data.Html !== null && typeof (data.Html) != 'undefined') {
        var selectors = updateSelectors.split(',');
        var updateTypes = updateSelectorsType ? updateSelectorsType.split(',') : null;
        for (var i = 0; i < selectors.length; i++) {
          if (data.Html.length >= i + 1) {
            if (updateTypes == null) { //replace
              $(selectors[i]).html(data.Html[i]).show();
            } else if (updateTypes[i] == 1) { //to end
              $(selectors[i]).append(data.Html[i]).show();
            };
          };
        };
        Viki.SetupPartial(updateSelectors);
      };

      if (data.Error !== null && typeof (data.Error) != 'undefined' && !Viki.IsNullOrEmpty(data.Error)) {
        alert(data.Error);
      };
      Viki.Ajax.onSuccess(sender, data);

    },
    complete: function () {

      if (sender != null || realSender != null) {

        if ($(sender)[0].tagName == 'FORM' || $(sender).attr('viki-action') || $(sender)[0].tagName == 'SELECT') {
          $(realSender).removeAttr('disabled');
        } else if ($(sender)[0].tagName == 'A') {
          $(realSender).removeClass('viki-ajax-worked');
        };

        var i = 0;
        if (isIndicateWait) {
          $(realSender).each(function () {
            i++;
            var waitId = $(this).attr('id') + '-wait';
            var wait = $('#' + waitId);
            $(wait).fadeOut();
            $(wait).remove();
          });
        };

        if (!sender.attr('viki-partial-loader')) {
          var updateSelectors = sender.attr('viki-ajax-update');
          var animateType = sender.attr('viki-ajax-update-animationtype');
          if (updateSelectors) {
            var selectors = updateSelectors.split(',');
            for (var i = 0; i < selectors.length; i++) {
              if (animateType && animateType == 'not') {
                $(selectors[i]).stop().css('opacity', '1');
              } else {
                $(selectors[i]).animate({ opacity: 1 }, function () { });
              }
              $(selectors[i]).find('select, input')
                                   .removeAttr('disabled')
                                   .removeClass('viki-ajax-worked');
            };
          };
        };

      };

      Viki.Exec(afterComplete);
      Viki.Ajax.onComplete(sender);
    },
    error: function (req, status, e) {
      if (req.status == 500) {
        var stxt = 'Извините, сервис временно недоступен. Попробуйте зайти через несколько минут.';
        if (!sender.attr('viki-partial-loader')) {
          alert(stxt);
        } else { sender.html(stxt) };
      }
    }
  });
};












var Validator = {

  SetSummary: function (validName, messages, itemTemplate, isAnimation) {
    if (messages.length <= 0)
      return;
    var summary = $('[' + validName + '_summary]');
    if (!summary)
      return;
    $('[' + validName + '_summary] [custom]').remove();
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      summary.append("<li custom='1' style='display:block'>" + itemTemplate.replace('{0}', message.Text) + "</li>");
      if (message.Key != '') {
        $('[' + validName + '_for="' + message.Key + '"]').addClass('err-field');
      };
    };

    summary.stop().show(isAnimation ? 200 : 0);

    var v = $('[viki-validator="' + validName + '"]');
    if (v) {
      v.attr('viki-validation-submitted', '1');
      v.attr('viki-validation-summary', 'set');
    };
  },

  GetValue: function (it) {
    var watermark = $(it).attr('viki-watermark');
    if (watermark) {
      var v = $(it).val();
      if ($.trim(v) == $.trim(watermark))
        return '';
    };
    return $(it).val();
  },

  ValidateRequired: function (prevResult, attr, val) {
    var result = { lastRule: prevResult.lastRule, isValid: prevResult.isValid };
    if (prevResult.isValid && attr.indexOf('required') != -1) {
      result.lastRule = 'required';
      result.isValid = !Validator.isEmpty(val);
    }
    return result;
  },

  ValidateMail: function (prevResult, attr, val) {
    var result = { lastRule: prevResult.lastRule, isValid: prevResult.isValid };
    if (prevResult.isValid && attr.indexOf('email') != -1) {
      result.lastRule = 'email';
      result.isValid = Validator.isEmpty(val) ? true : !Validator.Test(val, /^([\w-+\.]+)@((?:[\w-+]+\.)+)([a-zA-Z]{2,4})$/);
    }
    return result;
  },

  ValidateRange: function (prevResult, attr, val) {
    var result = { lastRule: prevResult.lastRule, isValid: prevResult.isValid };
    if (prevResult.isValid && (attr.indexOf('max[') != -1 || attr.indexOf('min[') != -1)) {
      var minIndex = attr.indexOf('min[');
      var maxIndex = attr.indexOf('max[');

      if (result.isValid && minIndex != -1) {
        result.lastRule = 'min';
        var nextIndex = attr.indexOf(']', minIndex);
        var minVal = parseInt(attr.substring(minIndex + 4, nextIndex));
        if (!isNaN(minVal)) {
          result.isValid = Validator.isMin(val, minVal);
        }
      }

      if (result.isValid && maxIndex != -1) {
        result.lastRule = 'max';
        var nextIndex = attr.indexOf(']', maxIndex);
        var maxVal = parseInt(attr.substring(maxIndex + 4, nextIndex));
        if (!isNaN(maxVal)) {
          result.isValid = Validator.isMax(val, maxVal);
        }
      }
    }
    return result;
  },

  ValidateInt: function (prevResult, attr, val) {
    var result = { lastRule: prevResult.lastRule, isValid: prevResult.isValid };
    if (result.isValid && attr.indexOf('int') != -1) {
      result.lastRule = 'int';
      var valNum = parseInt(val);
      result.IsValid = !isNaN(valNum);

      if (result.isValid) {
        result.isValid = valNum.toString().length == val.length;
        if (result.isValid) {
          var intIndex = attr.indexOf('int[');
          if (intIndex != -1) {
            var nextIndex = attr.indexOf(']', intIndex);
            var valMinMax = attr.substring(intIndex + 4, nextIndex);
            var arrMinMax = valMinMax.split(';');
            var valMin = Number.NaN, valMax = Number.NaN;
            if (arrMinMax.length == 1 && attr.indexOf(';', intIndex) == -1) {
              valMin = parseFloat(arrMinMax[0]);
            } else if (arrMinMax.length == 1 && attr.indexOf(';', intIndex) != -1) {
              valMax = parseFloat(arrMinMax[0]);
            } else {
              valMin = parseFloat(arrMinMax[0]);
              valMax = parseFloat(arrMinMax[1]);
            }
            if (!isNaN(valMin) && valNum < valMin) result.isValid = false;
            if (!isNaN(valMax) && valNum > valMax) result.isValid = false;
          }
        }
      }
    }
    return result;
  },

  ValidateDate: function (prevResult, attr, val) {
    var result = { lastRule: prevResult.lastRule, isValid: prevResult.isValid };
    if (result.isValid && attr.indexOf('datetime') != -1) {
      result.lastRule = 'datetime';

      var all = attr.split(' ');
      var curr = '';
      for (var i = 0; i < all.length; i++) {
        if (all[i].indexOf('datetime') != -1) {
          curr = all[i];
          break;
        }
      }

      var first = curr.indexOf('[');
      var last = curr.indexOf(']');

      if (first != -1 && last != -1) {
        var args = curr.substring(first + 1, curr.length - 1);
        var splitting = args.split(',');
        var min = splitting.length == 0 ? args : splitting[0];
        var max = splitting.length == 2 ? splitting[1] : '';

        var toDate = function (str) {
          var split = str.split('.');
          if (split.length == 3) {
            var dt = new Date();
            dt.setFullYear(split[2]);
            dt.setMonth(split[1]);
            dt.setDate(split[0]);

            dt.setHours(0);
            dt.setMinutes(0);
            dt.setSeconds(0);
            dt.setMilliseconds(0);
            return dt;
          }
          return '';
        }

        var minDate = min != '' ? toDate(min) : null;
        var maxDate = max != '' ? toDate(max) : null;

        if (result.isValid && minDate) {
          result.isValid = toDate(val) >= minDate;
        }

        if (result.isValid && maxDate) {
          result.isValid = toDate(val) <= maxDate;
        }

      } else {
        result.isValid = new Date().setDate(val);
      }

    }
    return result;
  },

  ValidateCustom: function (prevResult, attr, val) {
    var result = { lastRule: prevResult.lastRule, isValid: prevResult.isValid };
    var prefix = 'custom_';
    var index = attr.indexOf(prefix);
    if (result.isValid && index != -1) {
      result.lastRule = prefix;
      var code = "Validator." + attr.substring(index + prefix.length) + '(' + val + ')';
      try { result.isValid = eval(code); }
      catch (e) { result.isValid = true; }
    }
    return result;
  },

  CheckSet: function (validName, isSetToValid, isBySelector) {

    $('[' + validName + '_summary] [custom]').remove();
    $('[' + validName + '_summary] > li').each(function () {
      if ($(this).css('display') != 'none') {
        var atr = $(this).attr(validName + '_show_for');
        var fld = $('[' + validName + '_item=' + atr + ']');
        if (!fld || fld.length <= 0)
          $(this).hide(0);
      }
    });



    var ret = true;
    if (!isBySelector) {
      isBySelector = false;
    }

    if (ret) {
      $(':input[' + validName + ']').each(function () {

        var needValidate = true;
        var attrValid = $(this).attr('data-viki-validate');
        if (Viki.IsNullOrEmpty(attrValid) || attrValid.indexOf('validate') == -1) {
          if ($(this).attr('type') != 'hidden') {
            if ($(this).is(':reallyvisible') == false)
              needValidate = false;
          };
        };


        if (!$.isArray($(this).val()))
          $(this).val($.trim($(this).val()));
        var val = Validator.GetValue(this);


        var attr = $(this).attr(validName);
        var r = { lastRule: '', isValid: true };

        if (needValidate) {
          if (isSetToValid) {
            $(this).val('');
          } else {
            r = Validator.ValidateRequired(r, attr, $(this).attr('type') == 'checkbox' && !$(this).is(':checked') ? '' : val);
            r = Validator.ValidateMail(r, attr, val);
            r = Validator.ValidateRange(r, attr, val);
            r = Validator.ValidateInt(r, attr, val);
            r = Validator.ValidateDate(r, attr, val);
            r = Validator.ValidateCustom(r, attr, val);

            var attrSameVal = $(this).attr(validName + '_sameval');
            if (attrSameVal) {
              r.lastRule = 'sameval';
              var sameVal = Validator.GetValue(this);
              $(':input[' + validName + '_sameval:' + attrSameVal + ']').each(function () {
                if (sameVal != Validator.GetValue(this)) {
                  Validator.SetField(this, validName, isBySelector, false, '');
                  r.IsValid = false;
                }
              });
            }
            Validator.SetField(this, validName, isBySelector, r.isValid, r.lastRule);
            ret = ret && r.isValid;
          }
        }
      });
    }

    $('[' + validName + '_show]').each(function () {
      if (!$(this).attr(validName + '_show_for')) {
        Validator.ShowBlock(this, validName, ret);
      }
    });
    return ret;
  },
  Check: function (validName) {
    return Validator.CheckSet(validName, false);
  },
  CheckBySelector: function (validName) {
    return Validator.CheckSet(validName, false, true);
  },
  SetField: function (it, validName, isBySelector, isvalid, invalidRuleName) {
    var changecss = isBySelector ? it.id : $(it).attr(validName + '_item');

    var e = $('[' + validName + '_for="' + changecss + '"]');
    if (!isvalid) { e.addClass('err-field'); }
    else { e.removeClass('err-field'); }

    var invalidRuleName_ = (invalidRuleName.length > 0 ? '_' + invalidRuleName : '');
    $('[' + validName + '_show_for="' + changecss + '"]').each(function () {
      var attr_rules = $(this).attr(validName + '_show_rules');
      if (!attr_rules) { Validator.ShowBlock(this, validName, isvalid); }
      else {
        if (attr_rules.indexOf(invalidRuleName) != -1) { Validator.ShowBlock(this, validName, isvalid); }
        else { Validator.ShowBlock(this, validName, true); }
      }
    });
  },
  ShowBlock: function (it, validName, isvalid) {
    var attr = $(it).attr(validName + '_show');
    if (attr == 'none') $(it).css("display", "none");
    if (attr == 'valid') $(it).css("display", (isvalid ? "block" : "none"));
    if (attr == 'invalid') $(it).css("display", (isvalid ? "none" : "block"));
    if (attr == 'invalid animation') {
      if (isvalid) { $(it).hide(0); }
      else { $(it).show(500); }
    }
  },
  isMax: function (val, max) {
    return (val.length <= max);
  },
  isMin: function (val, min) {
    return (val.length >= min);
  },
  isEmpty: function (val) {
    return val ? (val.length <= 0) : true;
  },
  Test: function (val, p) {
    return !(val == '' || new RegExp(p).test(val));
  }
};


/*----- Viki.Tree -----*/
Viki.Tree = function () { };
Viki.Tree.Init = function (selector) {
  /*$(selector).find("img.viki-tree-expander").live('click', {}, function (e) { Viki.Tree.Controller($(this)); });*/
  $(document).on('click', 'img.viki-tree-expander', function (e) { Viki.Tree.Controller($(this)); });
  $(selector).find(".viki-tree").each(function () {
    if ($(this).attr("viki-tree-loaded") == "0") {
      //$(selector).find(".viki-tree").children('tbody').addClass('viki-tree-loading');
      Viki.Tree.GetData(this, "0", $(this).attr("viki-tree-type"));
    }
  });
};

Viki.Tree.GetData = function (selector, id, type) {
  var url = $(selector).parents('.viki-tree').attr('viki-tree-controller');
  var tr = $(selector).parents("tr:first");
  var requared = "";
  if (id == "0") {
    tr = $(selector);
    url = $(selector).attr('viki-tree-controller');
    if ($(selector).attr('viki-tree-preloadedid')) {
      requared = $(selector).attr('viki-tree-preloadedid');
    }
  }
  $.ajax({
    url: Viki.UrlNoCach(url),
    dataType: "json",
    type: 'POST',
    async: 'async',
    data: { root: id, type: type, requared: requared },
    success: function (data) {
      $(selector).find("th.viki-tree-loading").removeClass('viki-tree-loading');
      Viki.Tree.NodeCreate(tr, data);
    },
    error: function (req, status, e) {
    }
  });
};

Viki.Tree.Controller = function (selector) {
  var tr = $(selector).parents("tr:first");
  Viki.Tree.SetLoading(selector, true);
  if (tr.attr('viki-tree-loaded') == '1') {
    if (tr.attr('viki-tree-opened') == '1') {
      Viki.Tree.NodeClose(tr, selector, true);
    } else {
      Viki.Tree.NodeOpen(tr, selector, true);
    }
  } else {
    Viki.Tree.GetData(selector, tr.attr('id'), tr.attr('viki-tree-type'));
  }
};

Viki.Tree.SetLoading = function (selector, loading) {
  var div = $(selector).parent("div:first");

  if (loading) {
    div.children("img.viki-tree-icon-parrent").addClass('viki-tree-loading');
  } else {
    div.children("img.viki-tree-loading").removeClass('viki-tree-loading');
  }
};

Viki.Tree.NodeClose = function (tr, current, setClosed) {
  var nodes = tr.parents(".viki-tree").find("[viki-tree-parrentid='" + tr.attr('id') + "']");
  nodes.each(function () {
    Viki.Tree.NodeClose($(this), false);
  });
  Viki.Tree.SetLoading(current, false);

  nodes.fadeOut('fast', function () {
    if (setClosed) {
      tr.attr('viki-tree-opened', '0');
      if (current.hasClass('viki-tree-elbow-minus')) {
        current.removeClass('viki-tree-elbow-minus');
        current.addClass('viki-tree-elbow-plus');
      } else {
        current.removeClass('viki-tree-elbow-end-minus');
        current.addClass('viki-tree-elbow-end-plus');
      }
    }
  });
};

Viki.Tree.NodeOpen = function (tr, current, setOpened) {
  if (!setOpened && tr.attr("viki-tree-opened") == 0) return;
  var nodes = tr.parents(".viki-tree").find("[viki-tree-parrentid='" + tr.attr('id') + "']");

  nodes.fadeIn('fast', function () {
    tr.attr("viki-tree-opened", "1");
    if (tr.attr("id") == "0") return;
    if (setOpened) {
      if (current.hasClass('viki-tree-elbow-plus')) {
        current.removeClass('viki-tree-elbow-plus');
        current.addClass('viki-tree-elbow-minus');
      } else {
        current.removeClass('viki-tree-elbow-end-plus');
        current.addClass('viki-tree-elbow-end-minus');
      }
    }
  });

  nodes.each(function () {
    Viki.Tree.NodeOpen($(this), false);
  });
  Viki.Tree.SetLoading(current, false);
};

Viki.Tree.NodeCreate = function (tr, data) {
  var parrentId = tr.hasClass("viki-tree") ? "0" : tr.attr("id");
  if (typeof data != 'undefined') {
    if (tr.attr("viki-tree-loaded") == "0") {
      tr.attr("viki-tree-loaded", "1").attr("viki-tree-opened", "1");
    }
    var parrentDiv = tr.find(".viki-tree-inner-cell-grid:first");
    var buf = $("<data/>");
    $.each(data, function (index) {
      var sd = Viki.Tree.ParseData(data[index].Data, data[index].Id, data[index].Type, data[index].HasChildren, ((data.length - 1) == index), parrentId, parrentDiv);
      sd.appendTo(buf);
    });
    if (tr.hasClass("viki-tree")) {
      buf.children().appendTo(tr);
      tr = tr.children("tbody:first");
    } else {
      buf.children().insertAfter(tr);
    }

    Viki.Tree.NodeOpen(tr, tr.find('img.viki-tree-expander'), true);
    $.each(data, function (index) {
      if (data[index].RequiredChildren.length > 0)
        Viki.Tree.NodeCreate(tr.parents(".viki-tree").find("tr#" + data[index].Id + ""), data[index].RequiredChildren);
    });
  };
};

Viki.Tree.ParseData = function (data, id, rbr, isFolder, isLast, parrentId, parrentDiv) {
  var tr = $("<tr/>").attr("id", id).attr("viki-tree-parrentid", parrentId).attr("viki-tree-loaded", "0").attr("viki-tree-opened", "0").attr("viki-tree-type", rbr).attr("style", "display: none;");

  var dataRow = 0;
  $.each(data, function (index) {
    var td = $("<td/>").appendTo(tr);
    var div = $("<div/>").addClass("viki-tree-inner-cell-grid").addClass("viki-tree-inner-cell-grid-" + dataRow).appendTo(td);
    if (index == 0)
      div = Viki.Tree.CreateIndentation(parrentDiv, div, isFolder, isLast);
    div.append(data[index]);
    dataRow++;
  });

  return tr;
};

Viki.Tree.CreateIndentation = function (parrentDiv, targetBlock, isFolder, isLast) {
  var icon = $('<img />').addClass(isFolder ? "viki-tree-icon-parrent" : "viki-tree-icon-leaf").attr("src", "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");

  if (parrentDiv.size() != 0) {
    parrentDiv.children("img").clone().appendTo(targetBlock);
    targetBlock.children("img:last").remove();

    targetBlock.children("img").each(function () {

      if ($(this).hasClass('viki-tree-elbow-plus') || $(this).hasClass('viki-tree-elbow')) {
        $(this).removeClass('viki-tree-elbow');
        $(this).removeClass('viki-tree-expander');
        $(this).removeClass('viki-tree-elbow-plus');
        $(this).addClass('viki-tree-elbow-line');
      }

      if ($(this).hasClass('viki-tree-elbow-end') || $(this).hasClass('viki-tree-elbow-end-plus')) {
        $(this).removeClass('viki-tree-elbow-end-plus');
        $(this).removeClass('viki-tree-elbow-end');
        $(this).removeClass('viki-tree-expander');
        $(this).addClass('viki-tree-elbow-empty');
      }

    });
  }

  $("<img/>").addClass(isFolder ? (isLast ? "viki-tree-elbow-end-plus viki-tree-expander" : "viki-tree-elbow-plus viki-tree-expander") : (isLast ? "viki-tree-elbow-end" : "viki-tree-elbow")).attr('src', 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==').appendTo(targetBlock);
  icon.appendTo(targetBlock);
  return targetBlock;
};


Viki.ShoppingCart = function () { };
Viki.ShoppingCart.Set = function (it, data) {
  if (data.Html[0].length > 0) {
    var mask = data.Html[1];
    $(data.Html[2]).each(function () {
      var arr = this.id.split('-');
      $(this).html(mask.replaceAll('$id$', arr[arr.length - 1]));
    });
  };
};
Viki.ShoppingCart.lastServerData = null;
Viki.ShoppingCart.SetQuantityLocal = function () {
  var data = Viki.ShoppingCart.lastServerData;
  if (data.Html[0].length > 0) {
    var mask = data.Html[1];
    var arrdiv = data.Html[2].split(',');
    for (var i = 0; i < arrdiv.length; i = i + 1) {
      var arrQnt = arrdiv[i].split(':');
      var arr = arrQnt[0].split('-');
      $(arrQnt[0]).html(mask.replaceAll('$id$', arr[arr.length - 1]).replaceAll('$qnt$', arrQnt[arrQnt.length - 1]));
    };
  };
  $('body').trigger({ type: 'Viki.ShoppingCart.SetQuantity.After', value: data });
};
Viki.ShoppingCart.SetQuantity = function (it, data) {
  Viki.ShoppingCart.lastServerData = data;
  Viki.ShoppingCart.SetQuantityLocal();
};

Viki.ShoppingCart.RedirectToPay = function (selector) {
  $(selector).find('#cart-pay-form').submit();
};

Viki.ShoppingCart.Init = function (selector) {
  /*$(selector).find('[data-viki-int]').live('click', {}, function (e) {*/
  $(document).on('click', '[data-viki-int]', function (e) {
    var form = $(this).parents('form:first');
    var inp = form.find('input[type=text]');
    var val = parseInt(inp.val());
    if (!isNaN(val)) {
      var addVal = parseInt($(this).attr('data-viki-int'));
      var newVal = val + addVal;
      if (newVal < 0)
        newVal = 0;
      inp.val(newVal);
    };
  });
  /*$(selector).find('.pay-methods input').live('change', {}, function (e) {*/
  $(document).on('change', '.pay-methods input', function (e) {
    $('.pay-methods div').css('display', 'none');
    $('.pay-methods input:checked').parents('li:first').children("div:first").css('display', 'block');
  });
  /*$(selector).find('.pay-methods select').live('change', {}, function (e) {*/
  $(document).on('change', '.pay-methods select', function (e) {
    $('.pay-methods div.pay-methods-desc').css('display', 'none');
    var val = $('.pay-methods select:first').val();
    $('.pay-methods div#pay-methods-desc-' + val).css('display', 'block');
  });

};


Viki.AjaxPaging = function () { };
Viki.AjaxPaging.thisPageNum = 2;
Viki.AjaxPaging.thisWork = 1;
Viki.AjaxPaging.footerHeight = 300;
Viki.AjaxPaging.action = "";
Viki.AjaxPaging.Init = function (selector) {
  var cont = $("[data-viki-ajax-paging-action]:first");
  if (cont && cont.length > 0) {
    var scrH = $(window).height();
    var scrHP = cont.height();
    Viki.AjaxPaging.action = cont.attr("data-viki-ajax-paging-action");
    Viki.AjaxPaging.action = Viki.AjaxPaging.action + (Viki.AjaxPaging.action.indexOf("?") != -1 ? "&" : "?") + 'pageNum=';
    Viki.AjaxPaging.footerHeight = parseInt(cont.attr("data-viki-ajax-paging-footer"));
    $(window).scroll(function () {
      var scro = $(this).scrollTop();
      var scrHP = $("[data-viki-ajax-paging-action]:first").height();
      var scrH2 = 0;
      scrH2 = scrH + scro;
      var leftH = scrHP - scrH2;
      if (leftH < Viki.AjaxPaging.footerHeight) { Viki.AjaxPaging.getNextP(); }
    });
  };
};
Viki.AjaxPaging.getNextP = function () {
  if (Viki.AjaxPaging.thisWork == 1) {
    if (!Viki.Ajax.onBegin($("[data-viki-ajax-paging-action]:first")))
      return false;
    Viki.AjaxPaging.thisWork = 0;
    $("#viki-ajax-paging-loading").css('display', 'block');
    $.get(Viki.AjaxPaging.action + Viki.AjaxPaging.thisPageNum, function (data) {
      $("#viki-ajax-paging-loading").css('display', 'none');
      var cont = $("[data-viki-ajax-paging-action]:first");
      cont.append(data);
      if (!Viki.IsNullOrEmpty($.trim(data))) {
        Viki.AjaxPaging.thisPageNum++;
        Viki.AjaxPaging.thisWork = 1;
      };
      Viki.Ajax.onSuccess(cont, data);
      Viki.SetupPartial("[data-viki-ajax-paging-action]:first");
    });
  };
};


$(document).ready(function () {
  Viki.IsSetup = false;
  if (!Viki.IsSetup) {
    Viki.Setup();
  };
  Viki.IsSetup = true;
});