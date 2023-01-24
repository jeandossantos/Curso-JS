export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }

  creditCard(paymentData) {
    console.log(`A payment occurred from ${paymentData.username}`);

    this.paymentSubject.notify(paymentData);
  }
}
