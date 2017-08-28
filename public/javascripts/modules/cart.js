import axios from 'axios'
import { $ } from './bling'

function cartUpdate (e) {
  e.preventDefault()
  axios
    .post(this.action)
    .then(res => {
    	const isBought = this.buy.classList.add('disabled')
      $('.cart-length').textContent = res.data.content.length
    })
    .catch(console.error)
}

export default cartUpdate
