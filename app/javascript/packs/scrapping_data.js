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
  fetchDataFromBankerAdd = function(dataHref) {
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
      url: '/scrapping_data/fetch_data/bankder_adda',
      type:"GET",
      dataType: 'json',
      data: {},
      success: function (html) {
        console.log(html)
        var objCount = html.length;
        for ( var count=0; count< objCount; count++) {
          var element = html[count];
          var htmlTxt = "<ul><li><h3>" + element['title'] +"</h3></li><li>"+
            element['description']+"</li></ul>"
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
    var data_source = $(".scrapping-widget input:checked").val();
    if(data_source.length == 0) {
      alert("Please select the data source")
    } else {
      var href = "/scrapping_data/fetch_data/" + data_source;
      functionsBlock.fetchDataFromBankerAdd(href)
    }
  })
});
