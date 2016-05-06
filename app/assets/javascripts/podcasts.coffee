# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  $('input[type=radio]').click ->
    if $(this).is ':checked'
      window.location = $(this).attr('data-href')

