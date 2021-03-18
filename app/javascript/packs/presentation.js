import {quesnrePrFunctions} from './presentation_questionnaire.js'
import {factsheetPrFunctions} from './presentation_factsheet.js'
var presentationFunctions = (function () {
  var showHideHelpBox = function(){
    if($(".help-block").is(':visible')){
      $(".help-block").hide();
    } else {
      $(".help-block").show();
    }
  };
  return {
    showHideHelpBox: showHideHelpBox
  };
})();

//$(document).on("turbolinks:load", function(){
$(document).ready(function(){
  $(".hlp-node").on("click", function(){
    presentationFunctions.showHideHelpBox();
  });

  $(document).on("keyup", function(e){
    console.log(e.keyCode);
    if(e.keyCode == 39){
      var traverseType = 'right';
      if($("#presentation-right-arrow").hasClass('active')){
        var prType = $("#presentation-right-arrow").attr("data-pr-type");
        if(prType == "question"){
          quesnrePrFunctions.showNewQuestion($("#presentation-right-arrow"), traverseType);
        }else{
          factsheetPrFunctions.showNewFactsheet($("#presentation-right-arrow"), traverseType);
        }
      }
    }else if(e.keyCode == 37){
      var traverseType = 'left';
      if($("#presentation-left-arrow").hasClass('active')){
        var prType = $("#presentation-right-arrow").attr("data-pr-type");
        if(prType == "question"){
          quesnrePrFunctions.showNewQuestion($("#presentation-left-arrow"), traverseType);
        } else {
          factsheetPrFunctions.showNewFactsheet($("#presentation-left-arrow"), traverseType);
        }
      }
    } else if(e.keyCode == 40){
      quesnrePrFunctions.showAnswerOfQuestion();
    } else if(e.keyCode == 38){
      quesnrePrFunctions.hideAnswerOfQuestion();
    } else if (e.keyCode == 18){
      quesnrePrFunctions.showKeypointsOfQuestion();
    }
  });

});