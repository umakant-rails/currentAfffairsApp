$(document).on("turbolinks:load", function(){
  
  $("#submenuList1").on('click', function(){
    if(!$("#submenu1").hasClass("show")){
      $("#crt-afr-icon").removeClass("fa-plus");
      $("#crt-afr-icon").addClass("fa-minus");
    } else {
      $("#crt-afr-icon").removeClass("fa-minus");
      $("#crt-afr-icon").addClass("fa-plus");
    }
  });

});