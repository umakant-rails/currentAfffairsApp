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
  },
  setScrappingDataId = function(element) {
    var question = $(element).val();
    if(question.length > 8){
      var scrappingDataId = $(".scrapping-data").data("scrap_data_id");
      $("#scrapping_datum_id").val(scrappingDataId);
    }
  },
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
    setAnswer: setAnswer,
    setScrappingDataId: setScrappingDataId,
    setCurrentAffairName: setCurrentAffairName
  }
})();

$(document).on("turbolinks:load", function(){
  $(".answer_option").on("click", function(){
    questionFunctions.setAnswer(this);
  });

  $("#question").on('focusout', function(){
    questionFunctions.setScrappingDataId(this);
  });

  $("#questionnaire_questionnaire_category_id").on("change", function(){
    questionFunctions.setCurrentAffairName(this);
  });
 /* $("#fetch_data").on("click", function(){
    //var data_source = $("input[name='scrapping_input']:checked").parent().text().trim();
    var dataSource = $(".scrapping-widget input:checked").val();
    if(dataSource == undefined || dataSource.length == 0) {
      alert("Please select the data source")
    } else {
      functionsBlock.fetchDataFromBankerAdd(dataSource)
    }
  });*/
});
