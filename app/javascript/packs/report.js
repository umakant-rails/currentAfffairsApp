var reportFunctions = function(){
  var getQuestionFilteredData = function(fromDate, toDate, categoryId){
    $.ajax({
      //url: '/admin/reports/question_data_report',
      url: '/admin/reports/question_reports',
      type:"get",
      data: {from_date: fromDate, to_date: toDate,
        question_category_id: categoryId
      },
      dataType: 'script',
      success: function (response) {
      }
    });
  };
  return {
    getQuestionFilteredData: getQuestionFilteredData    
  };
}();
$(document).ready(function(){
  $("#filteredQuestionRpt").on("click", function(){
    var fromDate = $("#fromdatetimepicker").val();
    var toDate = $("#todatetimepicker").val();
    var categoryId = $("#ques_category_id").val();
    /*if(fromDate == "" && toDate == "" && categoryId == ""){
      appFunctions.setAlertMessage("Please select at least one parameter.", "alert-danger");
    } else*/ if(fromDate != "" && toDate == ""){
      appFunctions.setAlertMessage("Please select To Date parameter.", "alert-danger"); 
    } else if(fromDate == "" && toDate != ""){
      appFunctions.setAlertMessage("Please select From Date parameter.", "alert-danger"); 
    } else {
      reportFunctions.getQuestionFilteredData(fromDate, toDate, categoryId);
    }
  });
})