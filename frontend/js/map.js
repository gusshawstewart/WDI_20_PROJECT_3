$(document).ready(function(){

// initialise map
  var canvas = document.getElementById("map-canvas");

  var mapOptions = {
    zoom:12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"geometry.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"geometry.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#f6f7fb"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#f6f7fb"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f6f7fb"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"},{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#f6f7fb"}]},{"featureType":"road.local","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#d1dfff"},{"lightness":17}]}]
    

  }

var map = new google.maps.Map(canvas , mapOptions);

// Create the search box and link it to the UI element.
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});

var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();
  if (places.length == 0) {
    return;
  }

  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();

  places.forEach(function(place) {
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});

});

// $.get("/cameras" , function(data){

  // $(data.cameras).each(function(index, camera){

    // var latlng = new google.maps.LatLng(51.519170 , -0.101879);

    // var marker = new google.maps.Marker({
    //     position: latlng,
    //     map: map
    // });

    // create the info window
    // var infowindow = new google.maps.InfoWindow({
    //     content: " gig example"
    // });

    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.open(map, marker);
    // });

  // });

// });

// initialise map
// var canvas = document.getElementById("map-canvas");

// var mapOptions = {
//   zoom:12,
//   center: new google.maps.LatLng(51.506178,-0.088369),
//   mapTypeId: google.maps.MapTypeId.ROADMAP
// }

// var map = new google.maps.Map(canvas , mapOptions);

// navigator.geolocation.getCurrentPosition(function(position){

//   var latlng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);

//   var marker = new google.maps.Marker({
//       position: latlng,
//       map: map,
//       icon: '/images/marker.png'
//   });

// });



 