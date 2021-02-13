var functionsBlock = (function () {
  var selectDataSource = function(element){
    /*$(".scrapping-widget").find("input").each(function(){
      $(this).prop("checked", false);
    });*/
    var checkedRadio = $(".scrapping-widget input:checked")
    if(checkedRadio != undefined){
      $(".scrapping-widget input:checked").parent().removeClass('selelcted-data-source');
      $(".scrapping-widget input:checked").prop("checked", false);      
    }
    $(element).find("input:radio").prop("checked", true);
    $(element).find("input:radio").parent().addClass('selelcted-data-source');
  },
  fetchDataFromScrappingSource = function(dataSource) {
    $.ajax({
      url: '/admin/scrapping_data/scrap_data/' + dataSource,
      type:"GET",
      //dataType: 'json',
      dataType: 'script',
      data: {},
      success: function () {
      }
    });
  },
  markAsHoldOrRead = function(scrappingDatumId, action_type){
    $.ajax({
      url: '/admin/scrapping_data/' + scrappingDatumId + "/mark_as_hold_or_read",
      type:"GET",
      dataType: 'json',
      data: {action_type: action_type},
      success: function (response) {
        console.log(response.status);
        if(response.status == true){-
          appFunctions.setAlertMessage("Suceessfully '"+ action_type +"' to selected scrap data.", "alert-success");
          $("#scrap-data-"+scrappingDatumId).remove();
        } else {
          appFunctions.setAlertMessage(action_type + " action is failed.", "alert-danger");
        }
      }
    });
  }
  return {
    selectDataSource: selectDataSource,
    fetchDataFromScrappingSource: fetchDataFromScrappingSource,
    markAsHoldOrRead: markAsHoldOrRead
  }
})();

//$(document).on("turbolinks:load", function(){
$(document).ready(function(){
  $(".scrapping-widget").on("click", function(){
    functionsBlock.selectDataSource(this);
  });

  $("#fetch_data").on("click", function(){
    //var data_source = $("input[name='scrapping_input']:checked").parent().text().trim();
    var dataSource = $(".scrapping-widget input:checked").val();
    if(dataSource == undefined || dataSource.length == 0) {
      //alert("Please select the data source");
      appFunctions.setAlertMessage("Please select the data source.", "alert-danger");
    } else {
      functionsBlock.fetchDataFromScrappingSource(dataSource);
    }
  });
  
  $(".mark-as-hold").on("click", function(){
    var scrappingDatumId = $(this).attr("data-id");
    var action_type = $(this).val();
    if(scrappingDatumId.length > 0) {
      functionsBlock.markAsHoldOrRead(scrappingDatumId, action_type);
    } else {
      appFunctions.setAlertMessage("A Error has ocurred regarding this action.", "alert-danger");
    }
  });
});
