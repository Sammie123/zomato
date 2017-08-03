var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#city-submit').click(function() {
    var restaurant = $('#restaurant').val();
    console.log(restaurant);
    $.ajax({
      url : 'https://developers.zomato.com/api/v2.1/cities?q=' + restaurant,
      type: 'POST',
      dataType: 'json',
      success: function(response) {
        console.log(JSON.stringify(response));
        var cityId = response.location_suggestions[0].id;
        console.log(cityId);
        $.ajax({
          url : 'https://developers.zomato.com/api/v2.1/establishments?city_id=' + cityId,
          type : 'GET',
          dataType: 'json',
          success : function(response) {
            console.log(JSON.stringify(response));
          },
        });
      },
      beforeSend: setHeader,
    });

    function setHeader(xhr) {
      xhr.setRequestHeader('user-key', '151b9864fd1f3440f8684268a551db2f');
    }
  });
});
