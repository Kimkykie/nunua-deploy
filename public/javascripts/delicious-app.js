import '../sass/style.scss'

import { $, $$ } from './modules/bling'
import './semanticplugs.js'

import cartUpdate from './modules/cart'
import removeCart from './modules/removecart'
import followUser from './modules/follow'
import typeAhead from './modules/typeAhead'
import toggle from './modules/toggle'
import addFields from './modules/addprediction'

const cardForms = $$('.card-form')
const cartItems = $$('.cart-item')
const followForm = $$('.follow-form')
const toggleButton = $$('.more-predictions')
const addButton = $$('#addFields')

cardForms.on('submit', cartUpdate)
cartItems.on('submit', removeCart)
followForm.on('submit', followUser)
toggleButton.on('click', toggle)
addButton.on('click', addFields)
typeAhead($('.search'))
