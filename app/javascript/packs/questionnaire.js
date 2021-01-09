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
  };
  validateQuestionnaireForm = function(){
    var isTrue = true;
    var questionnaireType = $("#questionnaire_questionnaire_category_id").val();
    var questionnaireName = $("#name").val().trim();

    if(questionnaireType.length == 0){
      isTrue = false;
      appFunctions.setAlertMessage("Questionnaire Type can't be blank.", "alert-danger");
    } else if(questionnaireName.length == 0){
      isTrue = false;
      appFunctions.setAlertMessage("Questionnaire Name can't be blank.", "alert-danger");
    }
    return isTrue;
  };
  return {
    setCurrentAffairName: setCurrentAffairName,
    validateQuestionnaireForm: validateQuestionnaireForm
  };
})();

$(document).on("turbolinks:load", function(){
  $("#questionnaire_questionnaire_category_id").on("change", function(){
    questionnaireFunctions.setCurrentAffairName(this);
    $("#questionnaire_submit").prop("disabled", false);
  });
  $("#name").on("focusout", function(){
    var vl = $(this).val().trim();
    if(vl.length > 0) {
      $("#questionnaire_submit").prop("disabled", false);
    }
  });
});
