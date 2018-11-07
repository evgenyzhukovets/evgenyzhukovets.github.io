$(document).ready(function($) {

		var lastId,
			topMenu = $(".main-menu"),
			topMenuHeight = topMenu.outerHeight()+15,
            
			menuItems = topMenu.find(".main-menu__link"),
            
			scrollItems = menuItems.map(function(){
			  var item = $($(this).attr("href"));
			  if (item.length) { return item; }
			});
    
		menuItems.click(function(e){
		  var href = $(this).attr("href");
            
            if($(href).offset()){
             var href = $(this).attr("href"),
			 offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
            }

		  $('html, body').stop().animate({ 
			  scrollTop: offsetTop
		  }, 300);
		});
    
		$(window).scroll(function(){
		   var fromTop = $(this).scrollTop()+topMenuHeight;
		   
		   var cur = scrollItems.map(function(){
			 if ($(this).offset().top < fromTop)
                
			   return this;
		   });
           
        
		   cur = cur[cur.length-1];
           
		   var id = cur && cur.length ? cur[0].id : "";
		   
		   if (lastId !== id) {
			   lastId = id;
			   if(lastId){
			   	menuItems.removeClass("active").filter("[href="+id+"]").addClass("active");
               	$("[href='#"+id+"']").addClass("active");
			   }
               
		   }                 
		});
});