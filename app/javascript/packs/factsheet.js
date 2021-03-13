var factsheetFunctions = function () {
  var createFactsheet = function(title, description){
  };
  var editFactsheet = function(id, title, description){
  };
  validateFactsheetForm = function(){
    var description = tinymce.get("factsheet-box").getContent();
    $("#description").val(description);
  }
  return {
    createFactsheet: createFactsheet,
    validateFactsheetForm: validateFactsheetForm
  };
}();

$(document).ready(function(){
  $("#factsheet-btn").on('click', function(){
    var title = $("#factsheet-input").val();
    var description = tinymce.get("factsheet-box").getContent();
    if(title.length<5){
      appFunctions.setAlertMessage("Factsheet Title cann't be blank.", "alert-danger");
    }else if(description.length>=0){
      factsheetFunctions.createFactsheet(title, description);
    }
  });
});
