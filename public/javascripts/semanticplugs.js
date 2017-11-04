$(document).ready(() => {
  $('.rating').rating()
  // Toggle the sidebar to show and hide
  $('#toggle').click(() => {
    $('.ui.sidebar').sidebar('toggle')
  })
  $('.ui.modal')
  .modal('attach events', '.edit_profile_btn', 'show')
  // Sidebar transitions
  if ($('.ui.left.sidebar').hasClass('hidden')) {
    $('.ui.left.sidebar').show()
  } else {
    $('.ui.left.sidebar').hide()
  }
  // Dropdown
  $('.ui.dropdown').dropdown()

  // Active Menu

  switch (window.location.pathname) {
    case '/':
      $('.home').addClass('active')
      break
    case '/user/account':
      $('.account').addClass('active')
      break
    case '/user/games':
      $('.games').addClass('active')
      break
    case '/user/orders':
      $('.orders').addClass('active')
      break
    case '/help':
      $('.help').addClass('active')
      break
    default:
      break
  }
})
