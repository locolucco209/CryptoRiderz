
$(window).on("load", function () {

  var request;
  var mycurr = "";
  var myarray = ["BTC", "ETH", "LTC", "DASH", "XMR", "BNB", "USD", "XRP", "BCH", "QTUM", "ZEC", "IOT", "XLM"] 
  var myVar;
  var allarray = new Array();
  $("#newtolist").val("");

  getmydata();
  timer();
  function timer() {

    request = setInterval(getmydata, 5000);
  }

  urlcreat()
  function urlcreat() {
    mycurr = "";
    for (var m = 0; m < myarray.length; m++) {
      mycurr = mycurr + [myarray[m]] + ","

    }

    return (mycurr)
  }

  function getmydata() {


    var queryURL = "https://min-api.cryptocompare.com/data/pricemulti?extraParams=myaps&fsyms=" + urlcreat() + "&tsyms=USD,EUR";

    $.ajax({
      url: queryURL,

      method: "GET"
    })

      .then(function (response) {

        $("#mytable").empty();

        for (var x = 0; x < myarray.length; x++) {


          $("#mytable").append('<tr> <td>' + (x + 1) + '</td> <td>' + myarray[x] + '</td> <td>' + "$ " + response[myarray[x]]["USD"] + '</td><td>' + response[myarray[x]]["EUR"] + '</td></tr>')

        }

      });


  }
  getmydata2();

  function getmydata2() {

    console.log("545444444444444444444")

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


          for (var t = 0; t < allarray.length; t++) {



            $("#myoptions").append(' <option>' + response.Data[allarray[t]]["Name"] + '</option>')
          }
          clearTimeout(myVar);
        }
      });



  };


  $("#addbutton").on("click", function (event) {
    var added = $("#newtolist").val().trim();
    if(allarray.includes(added))
    {
      myarray.push(added);
      getmydata();
      $("#newtolist").val("");

    }else{
      alert("Please Enter Correct Name")
      $("#newtolist").val("");
    }


  });

  $("#myoptions").on("change", function (event) {
    var ggg = $("#myoptions").val().trim();
    $("#newtolist").val(ggg);



  });


})
