var factsheetPrFunctions = (function () {
  var getFolderFactsheets = function(element){
    var presentationName = $(element).find('option:selected').text();
    var folderId = $(element).val();
    $.ajax({
      url: '/admin/presentations/'+folderId+'/get_factsheets',
      type:"GET",
      data: {'is_presentation': true},
      dataType: 'script',
      success: function (response) {
        $(".fs-current-affair-block").show();
        $("#select-factsheet-folder-block").hide();
      }
    });
  };
  var resetFolderSelectionBlock = function(){
    $("#select-factsheet-folder-block").show();
    $(".fs-current-affair-block").hide();
    $("#factsheet_id").val("");
    $("#download-pdf").attr("href", "javascript:void(0);");
  }
  var setDataIdAndShowFactsheet = function(oldDataId, newDataId){
    $("#presentation-left-arrow").attr('data-id', newDataId);
    $("#presentation-right-arrow").attr('data-id', newDataId);
    $("#factsheet"+oldDataId).hide();
    $("#factsheet"+newDataId).show();
  };
  var showNewFactsheet = function(element, traverseType){
    var newDataId;
    var dataId = $(element).attr('data-id');
    if(traverseType == "right" && dataId == 0){
      $("#pr-factsheets-block").removeClass("margin-top-200");
    } else if(traverseType == "left" && dataId == 1) {
      $("#pr-factsheets-block").addClass("margin-top-200");
    }
    if(traverseType == 'right'){
      newDataId = parseInt(dataId) + 1;
      
      factsheetPrFunctions.setDataIdAndShowFactsheet(dataId,newDataId);
      if ($("#factsheet"+(newDataId+1)).length == 0){
        $(element).removeClass("active").addClass("non-active");
      }
      if($("#presentation-left-arrow").hasClass("non-active")){
        $("#presentation-left-arrow").removeClass("non-active").addClass("active");
      }
    } else if(traverseType == 'left') {
      newDataId = parseInt(dataId) - 1;
      factsheetPrFunctions.setDataIdAndShowFactsheet(dataId, newDataId);
      if(newDataId == 0){
        $(element).removeClass("active").addClass("non-active");
      }
      if($("#presentation-right-arrow").hasClass("non-active")){
        $("#presentation-right-arrow").removeClass("non-active").addClass("active");
      }
    }
  };
  var showHideHelpBox = function(){
    if($(".fs-help-block").is(':visible')){
      $(".fs-help-block").hide();
    } else {
      $(".fs-help-block").show();
    }
  };
  return {
    getFolderFactsheets: getFolderFactsheets,
    showNewFactsheet: showNewFactsheet,
    setDataIdAndShowFactsheet: setDataIdAndShowFactsheet,
    resetFolderSelectionBlock: resetFolderSelectionBlock,
    showHideHelpBox: showHideHelpBox
  };
})();

//$(document).on("turbolinks:load", function(){
$(document).ready(function(){
  $("#factsheet_id").on("change", function(){
    var questionnaireId = $(this).val();
    if(questionnaireId.length != ""){
      factsheetPrFunctions.getFolderFactsheets(this);
    }
  });

  $(".fs-current-affair-block").on("click", "#presentation-left-arrow", function(){
    var traverseType = 'left';
    if($(this).hasClass('active')){
      factsheetPrFunctions.showNewFactsheet(this, traverseType)
    }
  });
  $(".fs-current-affair-block").on("click", "#presentation-right-arrow", function(){
    var traverseType = 'right';
    if($(this).hasClass('active')){
      factsheetPrFunctions.showNewFactsheet(this, traverseType)
    }
  });
  $(".fs-current-affair-block").on("click", ".questionnaire-close", function(){
    factsheetPrFunctions.resetFolderSelectionBlock();
  });/*
  $("#fs-help-node").on("click", function(){
    factsheetPrFunctions.showHideHelpBox();
  });*/

});

export {factsheetPrFunctions};