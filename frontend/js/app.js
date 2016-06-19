$(document).ready(function(){

  var beepOne = $("#testMusic")[0];
  $("#music-trigger")
    .mouseenter(function() {
      console.log('audio');
      beepOne.play();
    });

  // getUsers();
   $("form#new-user").on("submit", createUser);
   $("form#new-gig").on("submit", createGig);
   // $('body').on('click', '.edit-gig', editGig);
   $("form#login").on("submit", createSession);
   $("body").on("click", ".show-user", showUser);

  // $("#user-form-button" ).on("click", toggleUserForm);
  // $("#user-index-button" ).on("click", toggleShowUsers);
  // $("body").on("click", ".delete-gig", removeGig);

   // $('body').off('click', '.show-gig').on('click', '.show-gig', showGig);

  // $('body').on('click', '#addProject', toggleAddProject);
});

$(document).ready(function(){
 
$('.navmenu').offcanvas({toggle: true, autohide: false, disableScrolling: false, canvas: 'map-canvas'})

$('#burger').click(function(){
  $('#sidemenu').offcanvas('toggle');
})

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

// function showDiv(name) {
// var divArray = ['#create', '#register', '#login'];
// // var toRemove = divArray.indexOf(name);
// // divArray.splice(toRemove, 1);
// for (var i = 0; i < divArray.length; i++) {
//   $(divArray[i]).slideUp("fast");
// }
// setTimeout(function(){
//   // $("#show").html(" ");
//   // $("#projects").html(" ");
//   $(name).()
// }, 500);
// }

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
  }, 800);
});

});
