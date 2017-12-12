import axios from 'axios'
import { $ } from './bling'

function followUser (e) {
  e.preventDefault()
  axios
    .post(this.action)
    .then((res) => {
      if (this.follow.value === 'Following') {
        this.follow.value = 'Follow'
      } else {
        this.follow.value = 'Following'
      }
      this.follow.classList.toggle('following')
      $('.followers-count').textContent = `${res.data.followers.length}`
    })
    .catch(console.error)
}

export default followUser
