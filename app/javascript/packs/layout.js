/*(function(){})(); is anonymous function, it can't be assign to any name.*/

window.appFunctions = function () {
  var setAlertMessage = function(msg, cls){
    $("#alert-message").addClass(cls);
    $("#alert-message-span").html($.parseHTML(msg));
    $("#alert-message").show();
    $("#alert-message").fadeOut(2000);
    setTimeout(() => {
      $("#alert-message").removeClass(cls);
    }, 2000);
  }
  return {
    setAlertMessage: function(msg, cls){ setAlertMessage(msg, cls);}
  };
}();

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