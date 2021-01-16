var questionFunctions = (function () {
  var setAnswer = function(element){
    var checkedRadio = $(".answer_option input:checked").length;

    if(checkedRadio > 0){
      $(".answer_option input:checked").parent().removeClass('set-answer');
      $(".answer_option input:checked").prop("checked", false);
    }
    $(element).find("input:radio").prop("checked", true);
    var optionId = $(element).find("input:radio").data("option_id");
    $("#answer").val($("#"+optionId).val());
    $(element).find("input:radio").parent().addClass('set-answer');
  };
  setScrappingDataId = function(element) {
    var question = $(element).val();
    if(question.length > 8){
      var scrappingDataId = $(".scrapping-data").data("scrap_data_id");
      $("#scrapping_datum_id").val(scrappingDataId);
    }
  };
  validateQuestionForm = function(){
    var isTrue = true;
    var question = $("#question").val().trim();
    var option1 = $("#option1").val().trim();
    var option2 = $("#option2").val().trim();
    var option3 = $("#option3").val().trim();
    var option4 = $("#option4").val().trim();
    var answer = $("#answer").val().trim();

    if(question.length == 0){
      isTrue = false;
      appFunctions.setAlertMessage("Question can't be blank.", "alert-danger");
    }else if(option1.length == 0 || option2.length == 0 || 
      option3.length == 0 || option4.length == 0 ){
      isTrue = false;
      appFunctions.setAlertMessage("Options can't be blank.", "alert-danger");
    } else if (answer.length == 0 ){
      isTrue = false;
      appFunctions.setAlertMessage("Answer can't be blank.", "alert-danger");
    }
    return isTrue;
  };
  return {
    setAnswer: setAnswer,
    setScrappingDataId: setScrappingDataId,
    validateQuestionForm: validateQuestionForm
  };
})();

$(document).ready(function(){
  $(".answer_option").on("click", function(){
    questionFunctions.setAnswer(this);
  });

  $("#question").on('focusout', function(){
    questionFunctions.setScrappingDataId(this);
    questionFunctions.setAnswer();
  });

});
