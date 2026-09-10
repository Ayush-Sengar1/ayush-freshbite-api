const assert=require('node:assert/strict');
const {store}=require('../data/store');
const repo=require('../repositories/repository');
const orderService=require('../services/orderService');

const customer=repo.userByEmail('customer@freshbite.in');
const dish=store.dishes.find(x=>x.name==='Truffle Mushroom Pizza');
assert(customer,'seed customer exists');
assert(dish,'seed dish exists');
assert(store.dishes.length>=15,'catalog contains at least 15 dishes');

const calculated=orderService.calculate(customer._id,{items:[{dishId:dish._id,quantity:1,price:1}],couponCode:''});
assert.equal(calculated.items[0].priceAtPurchase,dish.price,'server owns the dish price');
assert.notEqual(calculated.total,1,'frontend price cannot control the total');
assert.equal(calculated.deliveryFee,0,'free-delivery threshold is applied');

const order=orderService.createOrder(customer._id,{items:[{dishId:dish._id,quantity:1,price:1}],address:{fullName:'Demo Customer',phone:'9000000000',house:'12A',street:'Main Road',city:'Gurugram',state:'Haryana',pincode:'122001'},paymentMethod:'cod'});
assert(order._id&&order.orderNumber,'order receives identifiers');
assert.equal(order.items[0].priceAtPurchase,dish.price,'order stores a price snapshot');
assert.equal(order.paymentMethod,'cod');
assert.equal(order.status,'confirmed');
assert(orderService.hydrate(order).statusHistory.length>=2,'status history is recorded');
console.log('Food platform smoke tests passed: pricing, snapshots, COD order, status history, and seeded catalog.');
