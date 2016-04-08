# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$('#collapse-all').click ->
  console.log "all"
  $('#collapsingContent-lg').show()
  $('#collapsingContentAll').slideToggle 300

$('#collapse-lg').click ->
  console.log "lg"
  $('#collapsingContent-lg').slideToggle 300
