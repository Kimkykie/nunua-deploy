import '../sass/style.scss';

import { $$ } from './modules/bling';

import cartUpdate from './modules/cart';
import removeCart from './modules/removecart';
import followUser from './modules/follow';
import viewMore from './modules/viewmore';


const cardForms = $$('.card-form');
const cartItems = $$('.cart-item');
const followForm = $$('.follow-form');
const viewExpand = $$('.more-predictions');

cardForms.on('submit', cartUpdate);
cartItems.on('submit', removeCart);
followForm.on('submit', followUser);

