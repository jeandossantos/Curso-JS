import { describe, expect, test, jest, beforeAll } from '@jest/globals';
import Payment from '../src/events/payment.mjs';
import Marketing from '../src/observers/marketing.mjs';
import Shipment from '../src/observers/shipment.mjs';
import PaymentSubject from '../src/subjects/paymentSubject.mjs';

describe('Test Suite for Observer Patter', () => {
  beforeAll(() =>
    jest.spyOn(console, console.log.name).mockImplementation(() => {})
  );

  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject();

    const observer = {
      update: jest.fn(),
    };

    const data = 'Hello World!';
    const expected = data;

    subject.subscribe(observer);
    subject.notify(data);

    expect(observer.update).toBeCalledWith(expected);
  });

  test("#PaymentSubject shouldn't not unsubscribe observers", () => {
    const subject = new PaymentSubject();

    const observer = {
      update: jest.fn(),
    };

    const data = 'Hello World!';

    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });

  test('#Payment should notify subject after a credit card transaction', () => {
    const paymentSubject = new PaymentSubject();
    const payment = new Payment(paymentSubject);

    const paymentSubjectNotifySpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    );

    const data = { username: 'ErickWendel', id: Date.now() };

    payment.creditCard(data);

    expect(paymentSubjectNotifySpy).toBeCalledWith(data);
  });

  test('#All should notify subscribers after a credit card payment', () => {
    const paymentSubject = new PaymentSubject();
    const marketing = new Marketing();
    const shipment = new Shipment();

    const marketingSpy = jest.spyOn(marketing, marketing.update.name);
    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);

    paymentSubject.subscribe(marketing);
    paymentSubject.subscribe(shipment);

    const payment = new Payment(paymentSubject);

    const data = { username: 'ErickWendel', id: Date.now() };

    payment.creditCard(data);

    expect(marketingSpy).toBeCalledWith(data);
    expect(shipmentSpy).toBeCalledWith(data);
  });
});
