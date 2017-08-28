module.exports = function Cart (oldCart) {
  this.items = oldCart.items || {}
  this.totalQuantity = oldCart.totalQuantity || 0
  this.totalPrice = oldCart.totalPrice || 0
  this.add = function (item, id) {
    var storedItem = this.items[id]
    if (!storedItem) {
      storedItem = this.items[id] = {item: item, price: 0}
      storedItem.price = storedItem.item.price
      this.totalQuantity++
      this.totalPrice += storedItem.price
    } else {
      this.totalQuantity = this.totalQuantity
      this.totalPrice = this.totalPrice
    }
  }
  this.removeItem = function (id) {
    this.totalQuantity -= 1
    this.totalPrice -= this.items[id].price
    delete this.items[id]
  }
  this.generateArray = function () {
    let arr = []
    for (let id in this.items) {
      arr.push(this.items[id])
    }
    return arr
  }
  this.content = oldCart.content || []
}
