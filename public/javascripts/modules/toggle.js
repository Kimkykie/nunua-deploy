function toggle () {
  const content = this.parentElement
  const card = content.parentElement
  const more = card.querySelectorAll('.more')
  const viewMore = card.querySelector('.view-more')

  for (var i = 0; i <= more.length - 1; i++) {
    if (more[i].classList.contains('show-more')) {
      viewMore.innerText = 'LESS'
      more[i].style.visibilty = 'visible'
      more[i].classList.remove('show-more')
    } else {
      viewMore.innerText = ' VIEW MORE'
      more[i].style.visibilty = 'hidden'
      more[i].classList.add('show-more')
    }
  }
}

export default toggle
