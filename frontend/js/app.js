$(document).ready(function(){

  console.log("hello"); 

  
  // Scrolling to speicific section with js
  $('.down').click(function() {
    $('html body').animate({
      scrollTop: $(".index").offset().top
    }, 800);
  });



  // $.get("/cameras" , function(data){

    // $(data.cameras).each(function(index, camera){

      var latlng = new google.maps.LatLng(51.519170 , -0.101879);

      var marker = new google.maps.Marker({
          position: latlng,
          map: map
      });

      // create the info window
      var infowindow = new google.maps.InfoWindow({
          content: " gig example"
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });

    // });

  // });

  // initialise map
  var canvas = document.getElementById("map-canvas");

  var mapOptions = {
    zoom:12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map(canvas , mapOptions);
  
  navigator.geolocation.getCurrentPosition(function(position){

    var latlng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: '/images/marker.png'
    });

  });

  $('.navmenu').offcanvas({toggle: false, autohide: false})

$('#burger').click(function(){
  $('#sidemenu').offcanvas('toggle');
 

})

$("#btn-create").click(function(e){
  e.preventDefault();
  alert('hello');
  showDiv('.create'); 
});


//SHOW THE RELEVANT DIV AND HIDE OTHERS
function showDiv(name) {
var divArray = ['create'];
for (var i = 0; i < divArray.length; i++) {
  $(divArray[i]).css('display', 'none')
  $('.create').css('display', 'block');
}
}


//Datepicker

$('#datetimepicker2').datetimepicker();






});

