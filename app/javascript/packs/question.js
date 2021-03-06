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
  var getQuestoinsForFacts = function(categoryID){
    $.ajax({
      url: '/admin/questions/questions_for_fact',
      type:"GET",
      data: {category_id: categoryID},
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
  return {
    setAnswer: setAnswer,
    setScrappingDataId: setScrappingDataId,
    validateQuestionForm: validateQuestionForm,
    getQuestoinsForFacts: getQuestoinsForFacts,
    editFacts: editFacts,
    closeFacts: closeFacts,
    addFacts: addFacts
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
    var categoryID = $("#inputQuestionCategory").val();
    if(categoryID.length != 0){
      questionFunctions.getQuestoinsForFacts(categoryID);
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
  })
});
