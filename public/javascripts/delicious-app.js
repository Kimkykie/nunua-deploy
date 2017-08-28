import '../sass/style.scss'

import { $, $$ } from './modules/bling'

import cartUpdate from './modules/cart'

const cardForms = $$('.card-form')
cardForms.on('submit', cartUpdate)
