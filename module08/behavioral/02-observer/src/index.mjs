import Payment from './events/payment.mjs';
import Marketing from './observers/marketing.mjs';
import Shipment from './observers/shipment.mjs';
import PaymentSubject from './subjects/paymentSubject.mjs';

const paymentSubject = new PaymentSubject();

const marketing = new Marketing();
paymentSubject.subscribe(marketing);

const shipment = new Shipment();
paymentSubject.subscribe(shipment);

const payment = new Payment(paymentSubject);

const data = { username: 'Jean dos Santos', id: Date.now() };

payment.creditCard(data);

paymentSubject.unsubscribe(marketing);

payment.creditCard({ username: 'Mariazinha', id: Date.now() });
