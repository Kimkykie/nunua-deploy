import axios from 'axios'
import { $ } from './bling'

function cartUpdate (e) {
  e.preventDefault()
  axios
    .post(this.action)
    .then((res) => {
      this.buy.classList.toggle('disabled')
      this.children.preditable.classList.add('ui', 'inverted', 'pink')
      $('.cart-length').textContent = res.data.content.length
    })
    .catch(console.error)
}

export default cartUpdate
