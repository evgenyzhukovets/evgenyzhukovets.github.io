$(document).ready(function($) {

});
$(window).load(function() {
	$(".loader__inner").fadeOut();
	$(".loader").delay(400).fadeOut('slow');

	$(".main-logo").addClass('fadeInUp animated');


	/*$('.main-title').hover(function() {
		$(this).append('<br>плиз')
	}, function() {
	});*/


	$('.hover-img').hover(function() {
        var newImgPath=$(this).attr('src').replace('_def', '_hover')
        console.log(newImgPath);
        $(this).attr('src',newImgPath);

    }, function() {
        var newImgPath=$(this).attr('src').replace('_hover', '_def')
        console.log(newImgPath);
        $(this).attr('src',newImgPath);
    });


    $(".comment-form").submit(function(e) { 

        e.preventDefault(); 
        
        var adminEmail=$(this).find(".admin-email").val();
        var name=$(this).find(".input-name").val();
        var phone=$(this).find(".input-phone").val();
        
        var email=$(this).find(".input-email").val();
        var comment=$(this).find(".input-comment").val();

        var data_all = new FormData();
        
        data_all.append("name",name);
        data_all.append("phone",phone);
        data_all.append("adminEmail",adminEmail);

        data_all.append("email",email);
        data_all.append("comment",comment);


        var $form = $(this);
        console.log(data_all);

       $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data:data_all, //$form.serialize()
          processData: false,
          contentType: false
        }).done(function(data) {
          $form.append('<p class="ajax-notification">'+data+'</p>');
        }).fail(function() {
          $form.append('<p class="ajax-notification">Ошибка подключения к серверу</p>');
          
        });
        
        $(this)[0].reset();
    });
});




