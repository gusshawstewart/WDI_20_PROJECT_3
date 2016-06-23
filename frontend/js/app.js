$(document).ready(function(){

//current position

navigator.geolocation.getCurrentPosition(function(position){
  var latlng = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);
  var marker = new google.maps.Marker({
      position: latlng,
      map: gigInput.map,
      icon: 'images/marker.png'
  });

  markers.push(marker);

  var startCircle = new google.maps.Circle({
       strokeColor: 'grey',
       strokeOpacity: 0.8,
       strokeWeight: 2,
       fillColor: 'rgba(0,255,127,0.5)',
       fillOpacity: 0.35,
       map: gigInput.map,
       center: latlng,
       radius: 4000
     });

  gigInput.circle = startCircle;

  }, function(err){console.log("failed" + err)}, {timeout: 5000});

console.log("gig input is" + gigInput.location);

   $('body').on('click', '.edit-gig', editGig);
   $("form#login").on("submit", createSession);
   $("body").on("click", ".show-user", showUser);
   $("body").on("click", ".show-gig", showGig);
   $("body").on("click", ".edit-user", editUser);
   $("body").on("click", ".createGig", createGig);
   $("body").on("click", ".createUser", createUser);
   $("body").on("click", ".attend-button", attendGig);
   $("body").on("click", ".unattend-button", UnAttendGig);
   $("body").on("click", ".updateGig", updateGig);
   $("body").on("click", ".createSession", createSession);
   $("body").on("click", ".delete-gig", removeGig);

});

$(document).ready(function(){
  $('.navmenu').offcanvas({toggle: true, autohide: false, disableScrolling: false, canvas: 'map-canvas'});

  // $('#burger').click(function(){
  //  $('#sidemenu').offcanvas('toggle');
  // });


  $("#btn-create").click(function(e){
   e.preventDefault();
   showDiv('#create'); 
  });

  $("#btn-signup").click(function(e){
   e.preventDefault();
   showDiv('#register'); 
  });

  $("#btn-login").click(function(e){
   e.preventDefault();
   showDiv('#session'); 
  });

//SHOW THE RELEVANT DIV AND HIDE OTHERS

function showDiv(name) {
  var divArray = ['#create', '#register', '#session'];
  var toRemove = divArray.indexOf(name);
  divArray.splice(toRemove, 1);
  for (var i = 0; i < divArray.length; i++) {
    $(divArray[i]).css('display', 'none')
    $(name).css('display', 'block');
}
}

//Datepicker

$('#datetimepicker2').datetimepicker({toolbarPlacement: 'bottom', sideBySide: true});

//navbar
$('#navbar').hover(
  function(){$(this).addClass('background-off')
})

// Scrolling to speicific section with js

$('.down').click(function() {
  $('html body').animate({
    scrollTop: $(".index").offset().top
  }, 800, function() {
     $('.homepage').hide()
     $('#sidemenu').show();
  });
});

// show homepage again

$('.showHome').click(function(e){
 e.preventDefault();
 $('.homepage').show(); 
});


// Don't show sidemenu with homepage
if($('.homepage').show()){
  $('#sidemenu').hide();
}

// toggle sidemenu
$('#burger').click(function(){

  if($('#sidemenu').show()){
    $('#sidemenu').hide();
  }else{
  $('#sidemenu').show()
  }

});



});
