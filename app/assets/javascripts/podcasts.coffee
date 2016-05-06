# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  $('input[type=radio][name=show-radios]').change ->
    window.location = $('input[type=radio][name=show-radios]:checked').attr('data-href')
  $('input[type=radio][name=sort-radios]').change ->
    window.location = $('input[type=radio][name=sort-radios]:checked').attr('data-href')
