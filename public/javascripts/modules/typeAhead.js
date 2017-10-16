import axios from 'axios'
import dompurify from 'dompurify'

function searchResultsHTML (users) {
  return users.map(user => {
    return `
    <a href="/user/profile/${user.username}" class='search__result'>
      <strong>${user.username}</strong>
    </a>
    `
  }).join('')
}
function typeAhead (search) {
  if (!search) return
  const searchInput = search.querySelector('input[name="search"]')
  const searchResults = search.querySelector('.search__results')

  searchInput.on('input', function () {
    if (!this.value) {
      searchResults.style.display = 'none'
      return // stop
    }
    //  show results
    searchResults.style.display = 'block'
    axios
      .get(`/api/search?q=${this.value}`)
      .then(res => {
        if (res.data.length) {
          searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data))
          return
        }
        searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for ${this.value} found!</div>`)
      })
      .catch(err => {
        console.error(err)
      })
  })

  //  handle keyboard
  searchInput.on('keyup', (e) => {
      // if not up, down or enter skip
    if (![38, 40, 13].includes(e.keyCode)) {
      return
    }
    const activeClass = 'grey'
    const current = search.querySelector(`.${activeClass}`)
    const items = search.querySelectorAll('.result')
    let next
    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0]
    } else if (e.keyCode === 40) {
      next = items[0]
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1]
    } else if (e.keyCode === 38) {
      next = items[items.length - 1]
    } else if (e.keyCode === 13 && current) {
      window.location = current.href
      return
    }
    if (current) {
      current.classList.remove(activeClass)
    }
    next.classList.add(activeClass)
  })
}

export default typeAhead
