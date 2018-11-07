$ = jQuery.noConflict();

$(document).ready(function() {
    VikiCommonInit();
});

function VikiCommonInit() {
    VikiAdminFile.Init();
    
    VikiTabs.Init();
};



VikiTabs = function() { };
VikiTabs.Init = function() {
    var $tabs = $('.viki-tabs').tabs({
        select: function(event, ui) {
            $(this).find("#tabs-selected").val(ui.index);
        }
    });
//    $tabs.each(
//             function() {
//                 var i = $(this).find("#tabs-selected").val();
//                 $(this).tabs("select", parseInt(i));
//             }
//        );
};

function padNumber(number) {
    var ret = new String(number);
    if (ret.length == 1)
        ret = '0' + ret;
    return ret;
};


function DGrid_ChangeSorting(DGrid_id, unique_id, isSortDesc) {
    var element = document.getElementById(DGrid_id + '_IsSortDesc');
    if (element != null)
        element.value = isSortDesc;
    element = document.getElementById(DGrid_id + '_IsCtrlPressed');
    if (element != null)
        element.value = event.ctrlKey;

    __doPostBack(unique_id, '');
    return false;
};
function getId(ids) { return document.getElementById(ids); };

function getRnd(min, max) {
    var randomNum = Math.random() * (max - min);
    return (Math.round(randomNum) + min);
};
function getRnd10000() { return getRnd(1000, 10000); };

/*------Viki.Load--------*/
var VikiLoad_IsDisplay = false;
function CheckLoadingState() {
    if (!window.VikiLoad_IsLoading) {
        showWaitingLayer(false);
        window.VikiLoad_CheckStateTime = 0;
    }
    else {
        if (window.VikiLoad_CheckStateTime >= window.VikiLoad_Timeout)
            showWaitingLayer(true);
        else
            window.VikiLoad_CheckStateTime += 100;

        window.setTimeout(CheckLoadingState, 100);
    }
};
function showWaitingLayer(isShow) {
    if (isShow) {
        var cont = $('#VikiLoadContainer');
        if (!VikiLoad_IsDisplay) {
            cont.css('display', 'block');
            VikiLoad_IsDisplay = true;
            $('#UpDiv_Fade').css('display', 'block');
            $('#UpDiv_Fade').animate({ opacity: 0.6 }, function() { });
        }
    }
    else {
        VikiLoad_IsDisplay = false;
        $('#VikiLoadContainer').css('display', 'none');
        $('#UpDiv_Fade').animate({ opacity: 0 }, function() { });
        $('#UpDiv_Fade').css('display', 'none');
        SetFocusToActiveCtrl();
    }
};
function SetFocusToActiveCtrl() {
    try {
        if (window.VikiLoad_focusCtrlID != null) {
            var ctrl = document.getElementById(window.VikiLoad_focusCtrlID);
            if (ctrl != null) ctrl.focus();
        }
    }
    catch (e) { }
};



/*---AJAXFormCommand---*/
function AJAXFormCommand(sender, action, value) {
    $('#formActionSender').val(sender);
    $('#formAction').val(action);
    $('#formActionValue').val(value);
    try {
        __doPostBack(sender, '');
    }
    catch (e) {
        document.forms[0].submit();
    }
    setTimeout(function() { ResetFormAction(); }, 1000);
    return false;
};
function ResetFormAction() {
    try {
        $('#formActionSender').val('');
        $('#formAction').val('');
        $('#formActionValue').val('');
    }
    catch (e) { }
};

/*---VikiAdminFile---*/
VikiAdminFile = function() { };
VikiAdminFile.Init = function() {
    $('[viki-admin-file] > .viki-upload').on('click', function() {
        var block = $(this).parents('[viki-admin-file]:first');
        var bl_input = block.find('input')[0];
        var bl_img = block.find('img')[0];
        var bl_a = block.find('a[class!=viki-upload]')[0];
        var bl_type = block.attr('viki-admin-file');

        window.SetUrl = function(value) {
            $(bl_a).attr('href', value);
            $(bl_input).val(value);
            if (bl_type == 'File')
                $(bl_img).attr('src', VikiFileManager.SiteUrl() + 'images/Admin/LogoFile.gif');
            else
                $(bl_img).attr('src', value);
        };

        var sType = (bl_type == 'Img' ? '&Type=Image' : '');
        window.open(VikiFileManager.FileManager() + '?Connector=' + VikiFileManager.Connector() + sType, 'fileupload', 'modal,width=600,height=400');
        return false;
    });

    $('[viki-admin-file] > input').on('change', function() {
        var block = $(this).parents('[viki-admin-file]:first');
        var bl_img = block.find('img')[0];
        var bl_a = block.find('a[class!=viki-upload]')[0];
        var bl_type = block.attr('viki-admin-file');

        var value = $.trim($(this).val());
        $(this).val(value);
        if (value == '') {
            $(bl_a).attr('href', VikiFileManager.SiteUrl() + 'images/Admin/LogoNA.gif');
            $(bl_img).attr('src', VikiFileManager.SiteUrl() + 'images/Admin/LogoNA.gif');
        } else {
            $(bl_a).attr('href', value);
            if (bl_type == 'File')
                $(bl_img).attr('src', VikiFileManager.SiteUrl() + 'images/Admin/LogoFile.gif');
            else
                $(bl_img).attr('src', value);
        };
    });

};


