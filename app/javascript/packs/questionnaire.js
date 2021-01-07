var questionnaireFunctions = (function () {
  setCurrentAffairName = function(element) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var selectedOptionText = $(element).find('option:selected').text();
    if( selectedOptionText == "Daily Current Affairs" ||
        selectedOptionText == "Computer Awareness" ){
      var questionnaireName = $(element).find('option:selected').text() + " : " +
        months[date.getMonth()] + " " + date.getDate() + ", " +
        date.getFullYear();
      $("#name").val(questionnaireName);
    } else {
      $("#name").val("");
    }
  },
  setMessage = function(msg){
    if(!$("#alert-message").hasClass("alert-danger")){
      $("#alert-message").addClass("alert-danger");
    }
    $("#alert-message-span").html(msg);
    $("#alert-message").show();
    $("#alert-message").fadeOut(2000);
  },
  validateQuestionnaireForm = function(){
    var isTrue = true;
    var questionnaireType = $("#questionnaire_questionnaire_category_id").val();
    var questionnaireName = $("#name").val().trim();

    if(questionnaireType.length == 0){
      isTrue = false;
      questionnaireFunctions.setMessage("Questionnaire Type can't be blank.");
    }else if(questionnaireName.length == 0){
      isTrue = false;
      questionnaireFunctions.setMessage("Questionnaire Name can't be blank.");

    }
    return isTrue;
  };
  return {
    setCurrentAffairName: setCurrentAffairName,
    validateQuestionnaireForm: validateQuestionnaireForm,
    setMessage: setMessage
  }
})();

$(document).on("turbolinks:load", function(){
  $("#questionnaire_questionnaire_category_id").on("change", function(){
    questionnaireFunctions.setCurrentAffairName(this);
    $("#questionnaire_submit").prop("disabled", false);
  });
  $("#name").on("focusout", function(){
    var vl = $(this).val().trim();
    console.log(vl);
    if(vl.length > 0) {
      $("#questionnaire_submit").prop("disabled", false);
    }
  });
});
