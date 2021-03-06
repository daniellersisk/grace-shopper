const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const CartItem = require('./cart-item')
const Order = require('./order')
const OrderLine = require('./orderline')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.belongsToMany(Category, {through: 'productCategory'})
Category.belongsToMany(Product, {through: 'productCategory'})

//Potential future routes
//Review.belongsToMany(Product)
//Product.hasMany(Review)
//User.hasOne(Cart)
//Cart.belongsTo(User)

User.hasMany(CartItem)
CartItem.belongsTo(User)
CartItem.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)
Order.hasMany(OrderLine)
OrderLine.belongsTo(Order)

Product.hasMany(Review)
User.hasMany(Review)
Review.belongsTo(Product)
Review.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
*/

module.exports = {
  User,
  Product,
  Category,
  CartItem,
  Order,
  OrderLine,
  Review
}
