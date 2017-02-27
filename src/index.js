window.onload = function () {
  
  var x = 0;
  var streamers = ["dreamhackcs", "skyzhar", "faceittv", "comster404", "brunofin", "terakilobyte", "robotcaleb", "sheevergaming", "esl_sc2", "ogamingsc2", "jacksofamerica"];

  for (var i = 0; i < streamers.length; i++) {  
    streamAjax();
    statusAjax();
  };   

  function statusAjax () {
    $.ajax({
      url: "https://wind-bow.gomix.me/twitch-api/channels/" + streamers[i] + "?callback=?",
      dataType: "jsonp",
      data: {
        format: "jsonp"
      },

      success: function (data) {
        fetchStatusData(data);
      },

      error: function () {
        console.log("unable to access json");
      }
    });
  }

  function fetchStatusData(data) {
    if (data.status === 404) {
      $("#unavailable-container").append("<div class='display-item-unavailable' id='" + x + "'><img src='https://www.placecage.com/200/300'></div>");
      $("#" + x).html(data.message);
    }        
    x++;
  };
  
  function streamAjax () {
    $.ajax({
      url: "https://wind-bow.gomix.me/twitch-api/streams/" + streamers[i] + "?callback=?",
      dataType: "jsonp",
      data: {
        format: "json"
      },

      success: function (data) {
        fetchStreamData(data);
      },

      error: function () {
        console.log("unable to access json");
      }
    });
  }

  function fetchStreamData(data) {
    if (data.stream === null) {
      $("#offline-container").append('<div class="display-item-offline" id="' + x + '"><img src="https://www.placecage.com/c/200/300"></div>')      
      $("#" + x).append(data._links.self + " is offline!")
    }  else {
      $("#online-container").append('<span class="channel-name">' + data.stream.channel.name + '</span><a href="' + data.stream.channel.url + '" target="_blank"><div class="display-item-online" id="' + x + '"><img src="' + data.stream.channel.logo + '"></div></a>')      
      $("#" + x).append(data.stream.channel.status);
    }
    x++
  };  
  
};

function all() {
    $("#all").click(function() {
        $("#online-container").css("display", "inline-block");
        $("#offline-container").css("display", "inline-block");
        $("#unavailable-container").css("display", "inline-block");
    });
};
all();

function online() {
    $("#online").click(function() {
        $("#online-container").css("display", "inline-block");
        $("#offline-container").css("display", "none");
        $("#unavailable-container").css("display", "none");
    });
};
online();

function offline() {
    $("#offline").click(function() {
        $("#online-container").css("display", "none");
        $("#offline-container").css("display", "inline-block");
        $("#unavailable-container").css("display", "none");        
    });
};
offline();

function unavailable() {
    $("#unavailable").click(function() {
        $("#online-container").css("display", "none");
        $("#offline-container").css("display", "none");
        $("#unavailable-container").css("display", "inline-block");        
    });
};
unavailable();