namespace Strategy {
  interface Strategy {
    notify(): string;
  }

  class SMS implements Strategy {
    notify(): string {
      return "Notified via Short Message Service (SMS).";
    }
  }

  class PhoneCall implements Strategy {
    notify(): string {
      return "Notified via a phone call.";
    }
  }

  class Email implements Strategy {
    notify(): string {
      return "Notified via an e-mail.";
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

  class Game {
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

  let text = new Game("sms");
  console.log("Notification via SMS: ", text.notify());

  //   let trick = new Game("trick");
  //   console.log("Trick strategy's move: ", trick.makeAMove());

  //   let nepotism = new Game("nepotism");
  //   console.log("Nepotims strategy's move: ", nepotism.makeAMove());
}
