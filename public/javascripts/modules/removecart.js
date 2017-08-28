import axios from 'axios'
import { $ } from './bling'

function removeCart (e) {
  e.preventDefault()
  axios
    .post(this.action)
    .then(res => {
    	$('.cart-length').textContent = res.data.content.length
    	$('.total-price').textContent = `KES ${res.data.totalPrice}`
    	this.remove(this)
    })
    .catch(console.error)
}

export default removeCart
