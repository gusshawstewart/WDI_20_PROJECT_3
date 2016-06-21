
var gigInput = {
  coordinates: null,
  map: null,
  userLtd: 51.506178,
  userLng: -0.088369
}

function calculateDistance(){

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

var lat2 = 42.741; 
var lon2 = -71.3161; 
var lat1 = 42.806911; 
var lon1 = -71.290611; 

var R = 6371; // km 
//has a problem with the .toRad() method below.
var x1 = lat2-lat1;
var dLat = x1.toRad();  
var x2 = lon2-lon1;
var dLon = x2.toRad();  
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c; 

alert(d);
}


$(document).ready(function(){

  initMap();


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


// end of initMap
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





// initialise map
  var canvas = document.getElementById("map-canvas");

  var mapOptions = {
    zoom:12,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
  }




var map = new google.maps.Map(canvas , mapOptions);
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

//THIS IS AN IMPORTANT PART HERE BELOW, THIS IS WHERE WE ARE GOING TO GET THE USER LOCATION AND THEN DO THE GET GIGS AJAX REQUEST ON EVERY MAP INPUT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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

    gigInput.userLtd = place.geometry.location.ltd()
    gigInput.userLng = place.geometry.location.lng()

    
    getGigs();

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

