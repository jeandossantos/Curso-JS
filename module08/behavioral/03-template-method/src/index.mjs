import OrderBusiness from './business/orderBusiness.mjs';
import { Order } from './entities/order.mjs';

const order = new Order({
  customerId: Date.now(),
  amount: 1000.0,
  products: [
    {
      description: 'ferrari',
    },
  ],
});

const orderBusiness = new OrderBusiness();

console.info('order created', orderBusiness.create(order));
