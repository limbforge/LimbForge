$(document).ready(function (){
  console.log("flash.js loaded");
  $('#flash-message-alert').on( "click", function() {
    $('#flash-message-alert').remove();
  });
});
