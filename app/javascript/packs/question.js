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
  var setScrappingDataId = function(element) {
    var question = $(element).val();
    if(question.length > 8){
      var scrappingDataId = $(".scrapping-data-fr-ques").data("scrap_data_id");
      $("#scrapping_datum_id").val(scrappingDataId);
    }
  };
  validateQuestionForm = function(){
    var isTrue = true;
    $("#question_form input").each(function(){
      $(this).val($(this).val().trim());
    });
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
  var getQuestoinsForFacts = function(categoryId){
    $.ajax({
      url: '/admin/questions/questions_for_fact',
      type:"GET",
      data: {category_id: categoryId},
      dataType: 'script',
      success: function (response) {
      }
    });
  };
  var editFacts = function(id){
    var quesTxt = $("#fact"+id).text().trim();
    $("#fact-input").val(quesTxt);
    $("#fact-input").attr('data-id', id);
  };
  var closeFacts = function(id){
    var quesTxt = $("#fact"+id).text().trim();
    $("#row-fact"+id).hide();
  };
  var addFacts = function(){
    var id = $("#fact-input").attr("data-id");
    var fact = $("#fact-input").val();
    var factTxt = "<li>"+fact+"</li>";
    $(".facts-div").append(factTxt);
    var htmlOfFacts = $(".facts-div").html();
    console.log(htmlOfFacts);
    $("#facts").val("<ul>" + htmlOfFacts + "</ul>");
    $("#fact-input").val("");$("#fact-input").attr("data-id", "");
    $("#row-fact"+id).remove();
  };
  var questionsOfQuestionnaire = function(questionnaireId){
    $.ajax({
      url: '/admin/questionnaires/'+questionnaireId+'/questions',
      type:"GET",
      data: {},
      dataType: 'script',
      success: function (response) {
      }
    });
  };
  return {
    setAnswer: setAnswer,
    setScrappingDataId: setScrappingDataId,
    validateQuestionForm: validateQuestionForm,
    getQuestoinsForFacts: getQuestoinsForFacts,
    editFacts: editFacts,
    closeFacts: closeFacts,
    addFacts: addFacts,
    questionsOfQuestionnaire: questionsOfQuestionnaire
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

  $("#inputQuestionCategory").on("change", function(){
    var categoryId = $("#inputQuestionCategory").val();
    if(categoryId.length != 0){
      questionFunctions.getQuestoinsForFacts(categoryId);
    }
  });

  $(document).on("click", ".edit-fact", function(){
    var id = $(this).attr('data-id');
    questionFunctions.editFacts(id);
  });

  $(document).on("click", ".remove-fact", function(){
    var id = $(this).attr('data-id');
    questionFunctions.closeFacts(id);
  });

  $(document).on("click", ".right-ok-sign", function(){
    questionFunctions.addFacts();
  });

  $(".clear-content").on("click", function(){
    $("#inputQuestionCategory").val("");
    $("#fact-input").val("");
    $("#question-facts").html("");
  });

  $("#inputQuestionnaires").on('change', function(){
    var questionnaireId = $(this).val();
    if(questionnaireId.length > 0){
      questionFunctions.questionsOfQuestionnaire(questionnaireId);
    } else {
      window.location = window.location.href;
    }
  });
  $('.question-form-block').on('click', '.remove_fields', function(event) {
    $(this).prev('input[type=hidden]').val('1');
    $(this).closest('.fieldset').hide();
    return event.preventDefault();
  });
  $('.question-form-block').on('click', '.add_fields', function(event) {
    var regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');
    $(this).before($(this).data('fields').replace(regexp, time));
    return event.preventDefault;
  });

});
