var factsheetFolderFunctions = function () {
  var addFactsheet = function(elementId){
    var htmlTxt = $("#"+elementId)[0].outerHTML;
    hideElement(elementId);
    $("#add-factsheet-div").append(htmlTxt);
  };
  var removeFactsheet = function(self){
    var isElementAdded = false;
    var parentDivId = $(self).attr('data-id');
    $(self).siblings(".add-arr-div").show();
    var htmlTxt = $("#"+parentDivId)[0].outerHTML;
    var factsheetId = $(self).attr("data-factsheetId");

    $("#factsheet-block").find(".factsheet-div").each(function(){
      var fsId = $(this).attr("data-factsheetId");
      if(fsId>factsheetId && !isElementAdded){
        $(this).before(htmlTxt);
        isElementAdded = true;
      }
    });
    if(!isElementAdded){
      $("#factsheet-block .factsheet-div").last().after(htmlTxt);
    }
    $(self).closest(".factsheet-div").remove();
  };
  var hideElement = function(elementId){
    $("#"+elementId).hide();
  };
  var showAllHideElement = function(){
    var arry = []
    $("#folder-factsheet-block").find(".factsheet-div").each(function(){
      var txtId = $(this).attr("id");
      arry.push(txtId);
    });
    $("#factsheet-block").find(".factsheet-div").each(function(){
      var txtId = $(this).attr("id");
      if(!$(this).is(":visible") && arry.indexOf(txtId)<0){
        $(this).show();
      }
    });
  };
  var submitFactsheets = function(){
    var arry = []
    var folderId = $("#fs_folder_id").val();

    $("#folder-factsheet-block").find(".factsheet-div").each(function(){
      var txtId = $(this).attr("data-factsheetId");
      arry.push(txtId);
    });

    if(arry.length > 0 && folderId != ""){
      $.ajax({
        url: '/admin/factsheet_folders/'+folderId+'/add_factsheets',
        type:"POST",
        data: {factsheet_arry: arry, updation_allowed: true},
        dataType: 'script',
        success: function (response) {
        }
      });
    } else if (folderId == ""){
      appFunctions.setAlertMessage("Please select Factsheet Folder first.", "alert-danger");
    }else {
      appFunctions.setAlertMessage("Please add some Factsheet first.", "alert-danger");
    }
  };
  var getFolderFactsheets = function(self){
    var folderId = $(self).val();
    $.ajax({
      url: '/admin/factsheet_folders/'+folderId+'/add_factsheets',
      type:"POST",
      data: {updation_allowed: false},
      dataType: 'script',
      success: function (response) {
      }
    });
  };
  var folderFilter = function(filterText){
    $.ajax({
      url: '/admin/factsheet_folders/add_factsheet_page',
      type:"get",
      data: {filter: filterText},
      dataType: 'json',
      success: function (response) {
        $("#fs_folder_id").children('option:not(:first)').remove()
        $.each(response, function(ind, obj){
          $('#fs_folder_id').append($("<option></option>")
          .attr("value",obj['id']).text(obj['name']));
        });
      }
    });
  };
  validateFactsheetForm = function(){
    var description = tinymce.get("factsheet-box").getContent();
    $("#description").val(description);
  };
  return {
    addFactsheet: addFactsheet,
    removeFactsheet: removeFactsheet,
    hideElement: hideElement,
    showAllHideElement: showAllHideElement,
    submitFactsheets: submitFactsheets,
    getFolderFactsheets: getFolderFactsheets,
    folderFilter: folderFilter
  };
}();

$(document).ready(function(){
  $("#questionnaire-question-list").on('click',"#factsheet-block .cross-div", function(){
      var factsheetId = $(this).attr('data-id');
      factsheetFolderFunctions.hideElement(factsheetId);
  });
  $("#questionnaire-question-list").on('click',"#factsheet-block .add-arr-div", function(){
      var factsheetId = $(this).attr('data-id');
      $(this).hide();
      factsheetFolderFunctions.addFactsheet(factsheetId);
  });
  $("#questionnaire-question-list").on('click',"#factsheet-block #show-all", function(){
      factsheetFolderFunctions.showAllHideElement();
  });
  $("#questionnaire-question-list").on('click',"#folder-factsheet-block .cross-div", function(){
      factsheetFolderFunctions.removeFactsheet(this);
  });
  $("#questionnaire-question-list").on('click',"#folder-factsheet-block .add-factsheets", function(){
    factsheetFolderFunctions.submitFactsheets();
  });
  $("#add_factsheets").on('click', function(){
    factsheetFolderFunctions.submitFactsheets();
  });
  $("#fs_folder_id").on('change', function(){
    factsheetFolderFunctions.getFolderFactsheets(this);
  });
  $("#fs_folder_filter").on("change", function(){
    var filterText = $(this).val();
    factsheetFolderFunctions.folderFilter(filterText);
  });
});