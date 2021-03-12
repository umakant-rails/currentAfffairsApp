var factsheetFunctions = function () {
  var createFactsheet = function(title, description){
    $.ajax({
      url: '/admin/factsheets',
      type:"post",
      data: {factsheet: {title: title, description:
        description}},
      dataType: 'script',
      success: function (response) {
      }
    });
  };
  var editFactsheet = function(id, title, description){
    $.ajax({
      url: '/admin/factsheets/'+id,
      type:"put",
      data: {factsheet: {title: title, description:
        description}},
      dataType: 'script',
      success: function (response) {
      }
    });
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
  $
});
