import { NotificationContext } from './util/notificationContext.js';

export class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super();

    this.name = name;
    this.age = age;
  }

  isValid() {
    if (this.name?.length < 4) {
      this.addNotification('hero name must be at least 4 characters');
    }

    if (this.age < 20) {
      this.addNotification('age must be 20 or higher than 20');
    }

    return !this.hasNotifications();
  }
}
