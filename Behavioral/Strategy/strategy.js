var Strategy;
(function (Strategy) {
    var SMS = /** @class */ (function () {
        function SMS() {
        }
        SMS.prototype.notify = function () {
            return "Notified via Short Message Service (SMS).";
        };
        return SMS;
    }());
    var PhoneCall = /** @class */ (function () {
        function PhoneCall() {
        }
        PhoneCall.prototype.notify = function () {
            return "Notified via a phone call.";
        };
        return PhoneCall;
    }());
    var Email = /** @class */ (function () {
        function Email() {
        }
        Email.prototype.notify = function () {
            return "Notified via an e-mail.";
        };
        return Email;
    }());
    var Context = /** @class */ (function () {
        function Context() {
        }
        Context.prototype.setStrategy = function (strategy) {
            this.strategy = strategy;
        };
        Context.prototype.executeStrategy = function () {
            return this.strategy.notify();
        };
        return Context;
    }());
    var NotificationService = /** @class */ (function () {
        function NotificationService(preferredNotificationMethod) {
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
        NotificationService.prototype.notify = function () {
            return this.context.executeStrategy();
        };
        return NotificationService;
    }());
    var text = new NotificationService("sms");
    console.log("Notification via SMS: ", text.notify());
    var call = new NotificationService("call");
    console.log("Notification via a call: ", call.notify());
    var email = new NotificationService("email");
    console.log("Notification via email: ", email.notify());
})(Strategy || (Strategy = {}));
