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
  }
  return {
    selectDataSource: selectDataSource
  }
})();

$(document).ready(function(){
  $(".scrapping-widget").on("click", function(){
    functionsBlock.selectDataSource(this);
  });

  $("#fetch_data").on("click", function(){
    var data_source = $("input[name='scrapping_input']:checked").parent().text().trim();
    if(data_source.length == 0) {
      alert("Please select the data source")
    } else {
      alert("Your data source is : " + data_source)
    }
  })
});
