var factsheetFolderFunctions = function () {
  var submitFactsheets = function(factsheetArray, actionType){
    var folderId = $("#fs_folder_id").val();
    if(factsheetArray.length > 0 && folderId.length > 0){
      $.ajax({
        url: '/admin/factsheet_folders/'+folderId+'/add_factsheets',
        type:"POST",
        data: {factsheet_arry: factsheetArray, action_type: actionType},
        dataType: 'script',
        success: function (response) {
        }
      });
    } else if (folderId.length == 0){
      appFunctions.setAlertMessage("Please select Factsheet Folder first.", "alert-danger");
    }else if(factsheetArray.length == 0){
      appFunctions.setAlertMessage("Please add some Factsheet first.", "alert-danger");
    }
  };
  var addFactsheetPageOfFolder = function(self){
    var folderId = $(self).val();
    if(folderId != ""){
      $.ajax({
        url: '/admin/factsheet_folders/add_factsheet_page',
        type:"GET",
        data: {factsheet_folder_id: folderId},
        dataType: 'script',
        success: function (response) {
        }
      });
    } else {
      widnow.location = widnow.location.href;
    }
  };
  var applyFolderFilter = function(filterText){
    $.ajax({
      url: '/admin/factsheet_folders/folder_filter',
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
  var setSelectedQuestions = function(){
    var setSelectedQuestionCount = $(".factsheet-checkbox:checkbox:checked").length;
    $("#selected-factsheet-count").html(setSelectedQuestionCount);
  };
  validateFactsheetForm = function(){
    var description = tinymce.get("factsheet-box").getContent();
    $("#description").val(description);
  };
  return {
    submitFactsheets: submitFactsheets,
    //getFolderFactsheets: getFolderFactsheets,
    applyFolderFilter: applyFolderFilter,
    addFactsheetPageOfFolder: addFactsheetPageOfFolder,
    setSelectedQuestions: setSelectedQuestions
  };
}();

$(document).ready(function(){
  $("#fs_folder_id").on('change', function(){
    factsheetFolderFunctions.addFactsheetPageOfFolder(this);
  });
  $("#fs_folder_filter").on("change", function(){
    var filterText = $(this).val();
    factsheetFolderFunctions.applyFolderFilter(filterText);
  });

  $("#folder-factsheet-list").on("click", "#factsheet-status", function(){
    if($(this).find("input").prop('checked')) {
      $(this).find("input").prop('checked', false);
    } else {
      $(this).find("input").prop('checked', true);
    }
    factsheetFolderFunctions.setSelectedQuestions();
  });

  $("#folder-factsheet-list").on("click", "#factsheet-block .add-factsheets", function(){
    var factsheetArray = [];
    $(".factsheet-checkbox:checkbox:checked").each(function(){
      var factsheetId = $(this).val();
      factsheetArray.push(factsheetId);
    });
    factsheetFolderFunctions.submitFactsheets(factsheetArray, 'addition');
  });
  $("#folder-factsheet-list").on("click", "#factsheet-block .fs-plus", function(){
    var factsheetArray = [];
    var factsheetId = $(this).siblings(".factsheet-checkbox").val();
    factsheetArray.push(factsheetId);
    factsheetFolderFunctions.submitFactsheets(factsheetArray, 'addition');
  });
  $("#folder-factsheet-list").on("click", "#folder-factsheet-block .remove-factsheets", function(){
    var factsheetArray = [];
    $(".added-factsheet-checkbox:checkbox:checked").each(function(){
      var factsheetId = $(this).val();
      factsheetArray.push(factsheetId);
    });
    factsheetFolderFunctions.submitFactsheets(factsheetArray, 'removal');
  });
  $("#folder-factsheet-list").on("click", "#folder-factsheet-block .fs-cross", function(){
    var factsheetArray = [];
    var factsheetId = $(this).siblings(".added-factsheet-checkbox").val();
    factsheetArray.push(factsheetId);
    factsheetFolderFunctions.submitFactsheets(factsheetArray, 'removal');
  });
  

});