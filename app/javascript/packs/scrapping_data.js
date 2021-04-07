var scrappingDataFunctions = (function () {
  var selectDataSource = function(element){
    var checkedRadio = $(".scrapping-widget input:checked")
    if(checkedRadio != undefined){
      $(".scrapping-widget input:checked").parent().removeClass('selelcted-data-source');
      $(".scrapping-widget input:checked").prop("checked", false);      
    }
    $(element).find("input:radio").prop("checked", true);
    $(element).find("input:radio").parent().addClass('selelcted-data-source');
  },
  fetchDataFromScrappingSource = function(dataSource, date_txt, linkTxt) {
    $.ajax({
      url: '/super_admin/scrapping_data/scrap_data/' + dataSource,
      type:"GET",
      //dataType: 'json',
      dataType: 'script',
      data: {date: date_txt, link_txt: linkTxt},
      success: function () {
      }
    });
  },
  markAsHoldOrRead = function(scrappingDatumId, action_type){
    $.ajax({
      url: '/super_admin/scrapping_data/' + scrappingDatumId + "/mark_as_hold_or_read",
      type:"GET",
      dataType: 'json',
      data: {action_type: action_type},
      success: function (response) {
        console.log(response.status);
        if(response.status == true){-
          appFunctions.setAlertMessage("Suceessfully '"+ action_type +"' to selected scrap data.", 
            "alert-success");
          $("#scrap-data-"+scrappingDatumId).remove();
        } else {
          appFunctions.setAlertMessage(action_type + " action is failed.", "alert-danger");
        }
      }
    });
  },
  markAsUnHold = function(scrappingDatumId, action_type){
    $.ajax({
      url: '/super_admin/scrapping_data/' + scrappingDatumId + "/unhold",
      type:"GET",
      dataType: 'json',
      data: {action_type: action_type},
      success: function (response) {
        console.log(response.status);
        if(response.status == true){-
          appFunctions.setAlertMessage("Suceessfully '"+ action_type +"' to selected scrap data.", 
            "alert-success");
          $("#scrap-data-"+scrappingDatumId).remove();
        } else {
          appFunctions.setAlertMessage(action_type + " action is failed.", "alert-danger");
        }
      }
    });
  };
  return {
    selectDataSource: selectDataSource,
    fetchDataFromScrappingSource: fetchDataFromScrappingSource,
    markAsHoldOrRead: markAsHoldOrRead,
    markAsUnHold: markAsUnHold
  }
})();

//$(document).on("turbolinks:load", function(){
$(document).ready(function(){
  $(".scrapping-widget").on("click", function(){
    scrappingDataFunctions.selectDataSource(this);
  });

  $("#fetch_data").on("click", function(){
    var dataSource = $("#scrapping_source").val().trim();
    var date_txt = $("#datetimepicker").val();
    var linkTxt = '';

    if(dataSource == undefined || dataSource.length == 0) {
      appFunctions.setAlertMessage("Please select the data source.", "alert-danger");
    } else {
      scrappingDataFunctions.fetchDataFromScrappingSource(dataSource, date_txt, linkTxt);
    }
  });
  $(document).on("click", "#link-fetch-btn", function(){
    var dataId = $(this).attr("data-id");
    var linkTxt = $("#label"+dataId).text().trim();
    var dataSource = $("#scrapping_source").val().trim();
    var date_txt = $("#datetimepicker").val();
    scrappingDataFunctions.fetchDataFromScrappingSource(dataSource, date_txt, linkTxt); 
  });
  
  $(".mark-as-hold, .mark-as-read").on("click", function(){
    var scrappingDatumId = $(this).attr("data-id");
    var action_type = $(this).val();
  
    if((action_type.toLowerCase() == "mark as read") && scrappingDatumId.length > 0) {
      if(confirm("Are you sure to mark as read")){
        scrappingDataFunctions.markAsHoldOrRead(scrappingDatumId, action_type);
      }
    }else if(action_type.toLowerCase() == "mark as hold" && scrappingDatumId.length > 0) {
      scrappingDataFunctions.markAsHoldOrRead(scrappingDatumId, action_type);
    } else {
      appFunctions.setAlertMessage("A Error has ocurred regarding this action.", "alert-danger");
    }
  });
  $(".mark-as-unhold").on("click", function(){
    var scrappingDatumId = $(this).attr("data-id");
    var action_type = $(this).val();
    if(scrappingDatumId.length > 0) {
      scrappingDataFunctions.markAsUnHold(scrappingDatumId, action_type);
    } else {
      appFunctions.setAlertMessage("A Error has ocurred regarding this action.", "alert-danger");
    }
  });
});
