import '../sass/style.scss'

import { $, $$ } from './modules/bling'

import cartUpdate from './modules/cart'
import removeCart from './modules/removecart'

const cardForms = $$('.card-form')
const cartItems = $$('.cart-item')
cardForms.on('submit', cartUpdate)
cartItems.on('submit', removeCart)
