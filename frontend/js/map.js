var gigInput = {
  coordinates: null,
  map: null,
  userLat: 51.506178,
  userLng: -0.088369,
  circle: null
}

var markers = []

$(document).ready(function(){
  initMap();
})

//SUBMIT NEW GIG MAP
//******************

function initMap() {  console.log('initialising map');

    var inputMap = new google.maps.Map(document.getElementById('maphere'), {
      zoom: 8,
      center: new google.maps.LatLng(51.506178,-0.088369)
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit-geocode').addEventListener('click', function() {
      geocodeAddress(geocoder, inputMap);
    }
    );

  $("#submitGig").on("shown.bs.modal", function(e) {
    console.log("MAP IS" + inputMap)
    google.maps.event.trigger(inputMap, "resize");
    inputMap.setCenter(new google.maps.LatLng(51.506178,-0.088369)); 
  });

  }

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    var searchBox = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(searchBox);
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        console.log("INSIDE THE FUNCTION LOCATION" + results[0].geometry.location.lat())
        gigInput.coordinates = results[0].geometry.location;
      
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

// HOMEPAGE MAP
// ************

    var canvas = document.getElementById("map-canvas");

    var mapOptions = {
      zoom:12,
      center: new google.maps.LatLng(51.506178,-0.088369),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
    }


  var map = new google.maps.Map(canvas , mapOptions);
  //!!!assignment for future use of this map elsewhere
  gigInput.map = map;


    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

//HOMEPAGE MAP EVENT LISTENERS
//****************************

//DRAGGING A MAP
//**************
  google.maps.event.addListener(map, 'dragend', function() {

    var newCenter = map.getCenter();

    //set new center marker
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    
    var marker = new google.maps.Marker({
        position: newCenter,
        map: gigInput.map,
        icon: 'images/marker.png'
    });

    markers.push(marker);

   //updating global object properties
   gigInput.userLat = newCenter.lat()
   gigInput.userLng = newCenter.lng()

   gigInput.circle.setMap(null);

   var dragCircle = new google.maps.Circle({
        strokeColor: 'grey',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'rgba(0,255,127,0.5)',
        fillOpacity: 0.35,
        map: gigInput.map,
        center: newCenter,
        radius: 4000
      });

   gigInput.circle = dragCircle;

   //updating frontend
   $("#gigs-side-listing").empty();
   getGigs();

  });

//SEARCH BOX EVENT LISTENER
//*************************

searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();
  if (places.length == 0) {
    return;
  }

  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();
  var place = places[0]

  //updating global object properties
  gigInput.userLat = place.geometry.location.lat
  gigInput.userLng = place.geometry.location.lng

  var latlng = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng);

   //putting circle on map

  gigInput.circle.setMap(null);

  var searchCircle = new google.maps.Circle({
        strokeColor: 'grey',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'rgba(0,255,127,0.5)',
        fillOpacity: 0.35,
        map: gigInput.map,
        // center: new google.maps.LatLng(place.geometry.location),
        center: place.geometry.location,
        radius: 4000
      })

  gigInput.circle = searchCircle;

  getGigs();

  // Create a marker for each place.
  markers.push(new google.maps.Marker({
    map: map,
    title: place.name,
    position: latlng
  }));

  if (place.geometry.viewport) {
    // Only geocodes have viewport.
    bounds.union(place.geometry.viewport);
  } else {
    bounds.extend(latlng);
  }
  
//centering map after search and limiting zoom
  map.fitBounds(bounds);
  map.setZoom(12);

  console.log("YYYYYYYYYYY")

});




