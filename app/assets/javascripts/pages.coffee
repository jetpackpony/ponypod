# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

# Navbar's multiple toggle parts
$('#collapse-all').click ->
  $('#collapsingContent-lg').show()
  $('#collapsingContentAll').slideToggle 300

$('#collapse-lg').click ->
  $('#collapsingContent-lg').slideToggle 300
