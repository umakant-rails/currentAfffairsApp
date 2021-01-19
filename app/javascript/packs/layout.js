/*(function(){})(); is anonymous function, it can't be assign to any name.*/

window.appFunctions = function () {
  setAlertMessage = function(msg, cls){
    $("#alert-message").addClass(cls);
    $("#alert-message-span").html($.parseHTML(msg));
    $("#alert-message").show();
    $("#alert-message").fadeOut(2000);
    setTimeout(() => {
      $("#alert-message").removeClass(cls);
    }, 2000);
  };
  getQuestionnaireQuestions = function(questionnaireId, isPresentation){
    $.ajax({
      url: '/admin/questionnaires/'+questionnaireId+'/get_questions',
      type:"GET",
      data: {'is_presentation': isPresentation},
      dataType: 'script',
      success: function (response) {
        if(!isPresentation){
          $("#added-question-count").attr('data-count', JSON.parse(response).length);
          $("#added-question-count").html(JSON.parse(response).length);
        }
      }
    });
  };
  return {
    setAlertMessage: setAlertMessage,
    getQuestionnaireQuestions: getQuestionnaireQuestions,
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