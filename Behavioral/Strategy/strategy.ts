namespace Strategy {
  interface Strategy {
    notify(): string;
  }

  class SMS implements Strategy {
    notify(): string {
      return "Notified via Short Message Service (SMS) using Twilio.";
    }
  }

  class PhoneCall implements Strategy {
    notify(): string {
      return "Notified via a phone call using some robot service.";
    }
  }

  class Email implements Strategy {
    notify(): string {
      return "Notified via an e-mail via an e-mail relay.";
    }
  }

  class Context {
    strategy: Strategy;
    setStrategy(strategy: Strategy) {
      this.strategy = strategy;
    }

    executeStrategy() {
      return this.strategy.notify();
    }
  }

  class NotificationService {
    private context: Context;
    constructor(preferredNotificationMethod: string) {
      this.context = new Context();
      switch (preferredNotificationMethod.toLowerCase()) {
        case "sms":
          this.context.setStrategy(new SMS());
          break;
        case "call":
          this.context.setStrategy(new PhoneCall());
          break;
        default:
          this.context.setStrategy(new Email());
          break;
      }
    }

    notify(): string {
      return this.context.executeStrategy();
    }
  }

  let text = new NotificationService("sms");
  console.log("Notification via SMS: ", text.notify());

  let call = new NotificationService("call");
  console.log("Notification via a call: ", call.notify());

  let email = new NotificationService("email");
  console.log("Notification via email: ", email.notify());
}
