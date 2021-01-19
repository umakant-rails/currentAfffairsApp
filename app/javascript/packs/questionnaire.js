var questionnaireFunctions = (function () {
  var setCurrentAffairName = function(element) {
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
  var addQuestions = function(questionnaireId, questionArray){
    if(questionnaireId.length == 0 ){
      appFunctions.setAlertMessage("Please Select Questionnaire first.", "alert-danger");
    } else if(questionArray.length == 0){
      appFunctions.setAlertMessage("Please Select questions for Questionnaire.", "alert-danger");
    } else if( (questionnaireId.length > 0) && (questionArray.length > 0) ){
      $.ajax({
        url: '/admin/questionnaires/'+questionnaireId+'/add_questions',
        type:"GET",
        data: {question_array: questionArray},
        dataType: 'script',
        success: function (response) {
        }
      });
    }
  };
  var setSelectedQuestions = function(){
    var setSelectedQuestionCount = $(".question-checkbox:checkbox:checked").length;
    $("#selected-question-count").html(setSelectedQuestionCount);
  };
  return {
    setCurrentAffairName: setCurrentAffairName,
    validateQuestionnaireForm: validateQuestionnaireForm,
    addQuestions: addQuestions,
    setSelectedQuestions: setSelectedQuestions
  };
})();

$(document).ready(function(){

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

  $(".question-block").on("click", function(){
    if($(this).find("input").prop('checked')) {
      $(this).find("input").prop('checked', false);
    } else {
      $(this).find("input").prop('checked', true);
    }
    questionnaireFunctions.setSelectedQuestions();
  });

  $("#questionnaire_id").on("change", function(){
    var questionnaireId = $(this).val();
    if(questionnaireId.length != ""){
      appFunctions.getQuestionnaireQuestions(questionnaireId, '');
    }
  });
  /*$("#presentation_id").on("change", function(){
    var questionnaireId = $(this).val();
    if(questionnaireId.length != ""){
      questionnaireFunctions.getQuestionnaireQuestions(questionnaireId, true);
    }
  });*/

  $("#add_questions").on('click', function(){
    var questionArray = [];
    $(".question-checkbox:checkbox:checked").each(function(){
      var questionId = $(this).val();
      questionArray.push(questionId);
    });
    var questionnaireId = $("#questionnaire_id").val();
    questionnaireFunctions.addQuestions(questionnaireId, questionArray);
  });

});