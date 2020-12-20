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
  fetchDataFromBankerAdd = function(dataSource) {
    /*$.ajax({
      url: dataHref,
      type:"GET",
      dataType: 'script',
      data: params,
      success: function (html) {
      }
    });*/
    $.ajax({
      //url: '/scrapping_data',
      url: '/scrapping_data/scrap_data/' + dataSource,
      type:"GET",
      dataType: 'json',
      //dataType: 'script',
      data: {},
      success: function (html) {
        console.log(html)
        var objCount = html.length;
        for ( var count=0; count< objCount; count++) {
          var element = html[count];
          var htmlTxt = "<h3>" + element['title'] + "</h3><br/>" + element['description'];
          if(element['keypoints'] != undefined && element['keypoints'].length > 0){
            htmlTxt = htmlTxt + '<h4> Keypoints : </h4> <br/>' + element['keypoints'];
          }
          if(count == 0 ){
            $(".scrapping-data").html(htmlTxt);  
          } else {
            $(".scrapping-data").append(htmlTxt);
          }
        }
      }
    });
  }
  return {
    selectDataSource: selectDataSource,
    fetchDataFromBankerAdd: fetchDataFromBankerAdd
  }
})();

$(document).ready(function(){
  $(".scrapping-widget").on("click", function(){
    functionsBlock.selectDataSource(this);
  });

  $("#fetch_data").on("click", function(){
    //var data_source = $("input[name='scrapping_input']:checked").parent().text().trim();
    var dataSource = $(".scrapping-widget input:checked").val();
    if(dataSource.length == 0) {
      alert("Please select the data source")
    } else {
      functionsBlock.fetchDataFromBankerAdd(dataSource)
    }
  })
});
