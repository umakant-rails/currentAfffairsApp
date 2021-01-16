var presentationFunctions = (function () {
  var setPresentationName = function(element){
    var presentationName = $(element).find('option:selected').text();
    var questionnaireId = $(element).val();
    if(questionnaireId.length != ""){
      appFunctions.getQuestionnaireQuestions(questionnaireId, true);
    }
    $("#current-affair-title").html(presentationName);
    $(".current-affair-block").show();
    $("#select-questionnaire-block").hide();
  };
  var resetQuestionnaireSelectionBlock = function(){
    $("#select-questionnaire-block").show();
    $(".current-affair-block").hide();
    $("#presentation_id").val("");
  }
  var setDataIdAndShowQuestion = function(oldDataId, newDataId){
    $("#presentation-left-arrow").attr('data-id', newDataId);
    $("#presentation-right-arrow").attr('data-id', newDataId);
    $("#question"+oldDataId).hide();
    $("#question"+newDataId).show();
  };
  var showNewQuestion = function(element, traverseType){
    var newDataId;
    var dataId = $(element).attr('data-id');
    if(traverseType == "right" && dataId == 0){
      $("#questions-block").removeClass("margin-top-200");
    } else if(traverseType == "left" && dataId == 1) {
      $("#questions-block").addClass("margin-top-200");
    }
    console.log(traverseType + "  : " + dataId);
    if(traverseType == 'right'){
      newDataId = parseInt(dataId) + 1;
      presentationFunctions.setDataIdAndShowQuestion(dataId,newDataId);
      //if ($("#question"+newDataId).length > 0){
      if ($("#question"+(newDataId+1)).length > 0){
        $("#presentation-left-arrow").removeClass("non-active").addClass("active");
      } else {
        $(element).removeClass("active").addClass("non-active");
      }
    } else if(traverseType == 'left') {
      newDataId = parseInt(dataId) - 1;
      presentationFunctions.setDataIdAndShowQuestion(dataId, newDataId);
      if(newDataId != 0){
        $("#presentation-right-arrow").removeClass("non-active").addClass("active");
      }else{
        $(element).removeClass("active").addClass("non-active"); 
      }
    }
  };
  var showAnswerOfQuestion = function(){
    var answer = $(".current-affair-question:visible").attr('data-answer');
    $(".question-option:visible").each(function(){
      var id = $(this).attr('id');
      var option = $(this).attr('data-answer');
      if(option == answer){
        $(this).addClass("option-is-answer");
      }
    });
  };
  var hideAnswerOfQuestion = function(){
    $(".option-is-answer:visible").removeClass("option-is-answer");
  };
  var showKeypointsOfQuestion = function(){
    var dataId = $("#presentation-left-arrow").attr('data-id');
    if($("#keypoints"+dataId).is(':visible')){
      $("#keypoints"+dataId).hide();
    } else {
      $("#keypoints"+dataId).show();
    }
  };
  return {
    setPresentationName: setPresentationName,
    showNewQuestion: showNewQuestion,
    setDataIdAndShowQuestion: setDataIdAndShowQuestion,
    resetQuestionnaireSelectionBlock: resetQuestionnaireSelectionBlock,
    showAnswerOfQuestion: showAnswerOfQuestion,
    hideAnswerOfQuestion: hideAnswerOfQuestion,
    showKeypointsOfQuestion: showKeypointsOfQuestion
  };
})();

//$(document).on("turbolinks:load", function(){
$(document).ready(function(){
  $("#presentation_id").on("change", function(){
    var questionnaireId = $(this).val();
    if(questionnaireId.length != ""){
      presentationFunctions.setPresentationName(this);
    }
  });
  $("#presentation-left-arrow").on("click", function(){
    var traverseType = 'left';
    if($(this).hasClass('active')){
      presentationFunctions.showNewQuestion(this, traverseType)
    }
  });
  //$("#presentation-container").on("click", "#presentation-right-arrow", function()
  $("#presentation-right-arrow").on("click", function(){
    var traverseType = 'right';
    if($(this).hasClass('active')){
      presentationFunctions.showNewQuestion(this, traverseType)
    }
  });
  $(".current-affair-block").on("click", ".questionnaire-close", function(){
    presentationFunctions.resetQuestionnaireSelectionBlock();
  });

  $(document).on("keyup", function(e){
  //$("#presentation-container").on("keyup", function(e){
    console.log(e.keyCode);
    if(e.keyCode == 39){
      var traverseType = 'right';
      if($("#presentation-right-arrow").hasClass('active')){
        presentationFunctions.showNewQuestion($("#presentation-right-arrow"), traverseType)
      }
    }else if(e.keyCode == 37){
      var traverseType = 'left';
      if($("#presentation-left-arrow").hasClass('active')){
        presentationFunctions.showNewQuestion($("#presentation-left-arrow"), traverseType)
      }
    } else if(e.keyCode == 40){
      presentationFunctions.showAnswerOfQuestion();
    } else if(e.keyCode == 38){
      presentationFunctions.hideAnswerOfQuestion();
    } else if (e.keyCode == 18){  // alt key
      console.log("alt key");
      presentationFunctions.showKeypointsOfQuestion();
    }
  });

});