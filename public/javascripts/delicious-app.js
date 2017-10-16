import '../sass/style.scss'

import { $, $$ } from './modules/bling'

import cartUpdate from './modules/cart'
import removeCart from './modules/removecart'
import followUser from './modules/follow'
import typeAhead from './modules/typeAhead'

const cardForms = $$('.card-form')
const cartItems = $$('.cart-item')
const followForm = $$('.follow-form')

cardForms.on('submit', cartUpdate)
cartItems.on('submit', removeCart)
followForm.on('submit', followUser)

typeAhead($('.search'))
