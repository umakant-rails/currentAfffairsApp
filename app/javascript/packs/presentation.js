var presentationFunctions = (function () {
  var setPresentationName = function(element){
    var presentationName = $(element).find('option:selected').text();
    var questionnaireId = $(element).val();
    /*if(questionnaireId.length != ""){
      appFunctions.getQuestionnaireQuestions(questionnaireId, true);
    }*/
    $("#current-affair-title").html(presentationName);
    $(".current-affair-block").show();
    $("#select-questionnaire-block").hide();
  };
  var setDataId = function(dataId){
    $("#presentation-left-arrow").attr('data-id', dataId);
    $("#presentation-right-arrow").attr('data-id', dataId);
  };
  var resetQuestionnaireSelectionBlock = function(){
    $("#select-questionnaire-block").show();
    $(".current-affair-block").hide();
  }
  var showNewQuestion = function(element, traverseType){
    var newDataId;
    var dataId = $(element).attr('data-id');
    //alert(dataId + " ;; "+ traverseType)
    if(traverseType == 'right'){
      newDataId = parseInt(dataId) + 1; 
      if ($("#question"+newDataId).length > 0){
        $("#question"+dataId).hide();
        $("#question"+newDataId).show();
        presentationFunctions.setDataId(newDataId);
        $("#presentation-left-arrow").removeClass("non-active");
        $("#presentation-left-arrow").addClass("active");
      } else {
        $(element).removeClass("active");
        $(element).addClass("non-active");
      }
    } else if(traverseType == 'left') {
      if(dataId != 0){
        $("#question"+dataId).hide();
        newDataId = parseInt(dataId) - 1;
        $("#question"+newDataId).show();
        presentationFunctions.setDataId(newDataId);
        $("#presentation-right-arrow").removeClass("non-active");
        $("#presentation-right-arrow").addClass("active");
      }else{
        $(element).removeClass("active");
        $(element).addClass("non-active"); 
      }
    }
  };
  return {
    setPresentationName: setPresentationName,
    showNewQuestion: showNewQuestion,
    setDataId: setDataId,
    resetQuestionnaireSelectionBlock: resetQuestionnaireSelectionBlock
  };
})();

$(document).on("turbolinks:load", function(){
  $("#presentation_id").on("change", function(){
    var questionnaireId = $(this).val();
    if(questionnaireId.length != ""){
      presentationFunctions.setPresentationName(this);
    }
  });
  $("#presentation-left-arrow").on("click", function(){
    var traverseType = 'left';
    presentationFunctions.showNewQuestion(this, traverseType)
  });
  $("#presentation-right-arrow").on("click", function(){
    var traverseType = 'right';
    presentationFunctions.showNewQuestion(this, traverseType)
  });
  $(".questionnaire-close").on("click", function(){
    presentationFunctions.resetQuestionnaireSelectionBlock();
  });
});
