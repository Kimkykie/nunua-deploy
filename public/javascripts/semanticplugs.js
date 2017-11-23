$(document).ready(() => {
  $('.rating').rating()
  // Toggle the sidebar to show and hide
  $('#toggle').click(() => {
    $('.ui.sidebar').sidebar('toggle')
  })
  $('.ui.modal').modal('attach events', '.edit_profile_btn', 'show')
  // Dropdown
  $('.ui.dropdown').dropdown()
  $( '.accordion' ).accordion({
    collapsible: true
  })

  // Active Menu

  switch (window.location.pathname) {
    case '/':
      document.querySelector('.home').classList.add('active')
      break
    case '/user/account':
      document.querySelector('.account').classList.add('active')
      break
    case '/user/games':
      document.querySelector('.games').classList.add('active')
      break
    case '/user/orders':
      document.querySelector('.orders').classList.add('active')
      break
    case '/help':
      document.querySelector('.help').classList.add('active')
      break
    default:
      break
  }
})
