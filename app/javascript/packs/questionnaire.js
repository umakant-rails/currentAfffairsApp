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
  var submitQuestions = function(questionArray, actionType){
    var questionnaireId = $("#questionnaire_id").val();
    if(questionnaireId.length == 0 ){
      appFunctions.setAlertMessage("Please Select Questionnaire first.", "alert-danger");
    } else if(questionArray.length == 0){
      appFunctions.setAlertMessage("Please Select questions for Questionnaire.", "alert-danger");
    } else if( (questionnaireId.length > 0) && (questionArray.length > 0) ){
      $.ajax({
        url: '/admin/questionnaires/'+questionnaireId+'/add_questions',
        type:"POST",
        data: {question_array: questionArray,
          action_type: actionType
        },
        dataType: 'script',
        success: function (response) {
        }
      });
    }
  };
  var setSelectedQuestions = function(){
    var setSelectedQuestionCount = $(".question-checkbox:checkbox:checked").length;
    $("#selected-ques-count").html(setSelectedQuestionCount);
  };
  var addQuestionsPageOfQuestionnaire = function(questionnaireId){
    $.ajax({
      url: '/admin/questionnaires/add_questions_page',
      type:"GET",
      data: {questionnaire_id: questionnaireId},
      dataType: 'script',
      success: function (response) {
      }
    });
  };
  var getFilteredQuestions = function(questionnaireId, fromDate, toDate, questionCategory){
    $.ajax({
      url: '/admin/questionnaires/add_questions_page',
      type:"GET",
      data: {questionnaire_id: questionnaireId,
        from_date: fromDate, to_date: toDate,
        question_category_id: questionCategory
      },
      dataType: 'script',
      success: function (response) {
      }
    });
  };
  return {
    setCurrentAffairName: setCurrentAffairName,
    validateQuestionnaireForm: validateQuestionnaireForm,
    submitQuestions: submitQuestions,
    setSelectedQuestions: setSelectedQuestions,
    addQuestionsPageOfQuestionnaire: addQuestionsPageOfQuestionnaire,
    getFilteredQuestions: getFilteredQuestions
  };
})();

$(document).ready(function(){

  $("#questionnaire_category_id").on("change", function(){
    questionnaireFunctions.setCurrentAffairName(this);
    $("#questionnaire_submit").prop("disabled", false); 
  });

  $("#name").on("focusout", function(){
    var vl = $(this).val().trim();
    if(vl.length > 0) {
      $("#questionnaire_submit").prop("disabled", false);
    }
  });

  /* start- add question in questionnaire funtions */
  $("#questionnaire-question-list").on("click", "#question-status", function(){
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
      questionnaireFunctions.addQuestionsPageOfQuestionnaire(questionnaireId);
    } else {
      window.location = window.location.href;
    }
  });

  $("#questionnaire-question-list").on("click", "#question-block .add-questions", function(){
    var questionArray = [];
    $(".question-checkbox:checkbox:checked").each(function(){
      var questionId = $(this).val();
      questionArray.push(questionId);
    });
    questionnaireFunctions.submitQuestions(questionArray, 'addition');
  });
  $("#questionnaire-question-list").on("click", "#question-block .ques-plus", function(){
    var questionArray = [];
    var questionId = $(this).siblings(".question-checkbox").val();
    questionArray.push(questionId);
    questionnaireFunctions.submitQuestions(questionArray, 'addition');
  });
  $("#questionnaire-question-list").on("click", "#questionnaire-question-block .remove-questions", function(){
    var questionArray = [];
    $(".added-question-checkbox:checkbox:checked").each(function(){
      var questionId = $(this).val();
      questionArray.push(questionId);
    });
    questionnaireFunctions.submitQuestions(questionArray, 'removal');
  });
  $("#questionnaire-question-list").on("click", "#questionnaire-question-block .ques-cross", function(){
    var questionArray = [];
    var questionId = $(this).siblings(".added-question-checkbox").val();
    questionArray.push(questionId);
    questionnaireFunctions.submitQuestions(questionArray, 'removal');
  });
  $("#questionnaire-question-list").on("click", "#questions-checkbox", function(){
    $("#question-block input").each(function(index){
      if($(this).hasClass("question-checkbox")){
        $(this).is(":checked") ? $(this).prop('checked', false) : $(this).prop('checked', true);
      }
    });
    if($("#questions-checkbox").is(":checked")){
      $("#selected-ques-count").html($("#question-block input").length-1);
    }else{
      $("#selected-ques-count").html(0);
    }
  });
  $("#questionnaire-question-list").on("click", "#added-questions-checkbox", function(){
    $("#added-question-div input").each(function(index){
      if($(this).hasClass("added-question-checkbox")){
        $(this).is(":checked") ? $(this).prop('checked', false) : $(this).prop('checked', true);
      }
    });
    if($("#added-questions-checkbox").is(":checked")){
      $("#added-ques-count").html($("#added-question-div input").length);
    }else{
      $("#added-ques-count").html(0);
    }
  });
  $(".qustnr-row").on("click", "#filterQuestion", function(){
    var questionnaireId = $("#questionnaire_id").val();
    var fromDate = $("#fromdatetimepicker").val();
    var toDate = $("#todatetimepicker").val();
    var quesCategory = $("#ques_category_id").val();
    if(fromDate == toDate){
      appFunctions.setAlertMessage("Both Date cann't be equal.", "alert-danger");
    } else if (fromDate == ""){
      appFunctions.setAlertMessage("From Date cann't be blank.", "alert-danger");
    } else if (toDate == ""){
      appFunctions.setAlertMessage("To Date cann't be blank.", "alert-danger");
    }
    questionnaireFunctions.getFilteredQuestions(questionnaireId, fromDate, toDate, quesCategory);
  });
  /* end- add question in questionnaire funtions */  
});