
$(window).on("load", function () {


  var myVar;
  var allarray = new Array();



  getmydata2();

  function getmydata2() {

    console.log("545444444444444444444");

   // var corsProxy = "https://cors-anywhere.herokuapp.com/";
    var apiUrl = "https://min-api.cryptocompare.com/data/all/coinlist";
   // var url = corsProxy + apiUrl;

    $.ajax({
      url: apiUrl,

      type: "GET"
    })

      .then(function (response) {

        allarray = (Object.getOwnPropertyNames((response.Data)));
        allarray.sort();

        myVar = setInterval(retrivemydata, 1000);
        retrivemydata();

        function retrivemydata() {
          $("#loading").empty();
          $("#tablehead").append('<tr> <th>' + "#" + '</th> <th>' + "Symbol" + '</th> <th>' + "Full Name" + '</th><th>' + "Logo" + '</th></tr>')

          for (var t = 0; t < allarray.length; t++) {

            var imagesrc = "https://www.cryptocompare.com" + response.Data[allarray[t]]["ImageUrl"]


            $("#listtable").append('<tr> <td>' + (t + 1) + '</td> <td>' + response.Data[allarray[t]]["Name"] + '</td> <td>' + '<img src="' + imagesrc + '" class="myimages" style="width:60px">' + '</td><td>' + response.Data[allarray[t]]["FullName"] + '</td></tr>')

            //$("#listtable").append('<tr> <td>' + (t + 1) + '</td> <td>' + response.Data[allarray[t]]["Name"] + '</td> <td>' + '<img src="' + imagesrc + '" style="width:60px">' + '</td><td>' + response.Data[allarray[t]]["FullName"] + '</td></tr>')


          }
          clearTimeout(myVar);
        }
      });



  };

})
