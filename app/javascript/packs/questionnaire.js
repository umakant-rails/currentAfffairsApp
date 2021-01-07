var questionnaireFunctions = (function () {
  setCurrentAffairName = function(element) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var selectedOptionText = $(element).find('option:selected').text();
    if( selectedOptionText == "Daily Current Affairs" ||
        selectedOptionText == "Computer Awareness" ){
      var questionnaireName = $(element).find('option:selected').text() + " : " +
        months[date.getMonth()] + " " + date.getDate() + ", " +
        date.getFullYear();
      $("#name").val(questionnaireName);
    } else {
      $("#name").val("");
    }
  };
  return {
    setCurrentAffairName: setCurrentAffairName
  }
})();

$(document).on("turbolinks:load", function(){
  $("#questionnaire_questionnaire_category_id").on("change", function(){
    questionnaireFunctions.setCurrentAffairName(this);
  });
  /*$(“#questionnaire_form).validate({
    debug: true,
    rules: {
    “questionnaire[questionnaire_category_id]“: {required: true},
    “questionnaire[name]“: {required: true}
    }
  });*/
});
