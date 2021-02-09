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
      url: '/admin/presentations/'+questionnaireId+'/get_questions',
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
  var hideAndShowSubmenu = function(element){
    console.log($(element).find(".crt-afr-icon").hasClass("fa-plus"));
    if($(element).find(".crt-afr-icon").hasClass("fa-plus")){
      $(element).find(".crt-afr-icon").removeClass("fa-plus").addClass("fa-minus");
      //$(".crt-afr-icon").addClass("fa-minus");
    } else {
      $(element).find(".crt-afr-icon").removeClass("fa-minus").addClass("fa-plus");
      //$(".crt-afr-icon").addClass("fa-plus");
    }
  };
  return {
    setAlertMessage: setAlertMessage,
    getQuestionnaireQuestions: getQuestionnaireQuestions,
    hideAndShowSubmenu: hideAndShowSubmenu
  };
}();

$(document).ready(function(){
  
  $("#question-menu").on('click', function(){
    appFunctions.hideAndShowSubmenu(this);
  });
  $("#questionnaire-menu").on('click', function(){
    appFunctions.hideAndShowSubmenu(this);
  });

});