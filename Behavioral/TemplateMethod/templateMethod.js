var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TemplateMethod;
(function (TemplateMethod) {
    var Email = /** @class */ (function () {
        function Email() {
        }
        Email.prototype.compose = function () {
            this.salutation();
            this.summary();
            this.discussion();
            this.figures();
            this.closingStatements();
            this.signature();
            this.contactInfo();
        };
        Email.prototype.summary = function () { };
        Email.prototype.figures = function () { };
        Email.prototype.closingStatements = function () { };
        Email.prototype.signature = function () { };
        Email.prototype.contactInfo = function () { };
        return Email;
    }());
    var EmailToCEO = /** @class */ (function (_super) {
        __extends(EmailToCEO, _super);
        function EmailToCEO() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EmailToCEO.prototype.salutation = function () {
            console.log("Dear Mr. CEO");
        };
        EmailToCEO.prototype.summary = function () {
            console.log("Everything is great");
        };
        EmailToCEO.prototype.discussion = function () {
            console.log("Since you have been our CEO and making such great decisions, our profits increased.");
        };
        EmailToCEO.prototype.figures = function () {
            console.log("Here are three tables that show how much more money we are making.");
        };
        EmailToCEO.prototype.closingStatements = function () {
            console.log("In summary, all is well");
        };
        EmailToCEO.prototype.signature = function () {
            console.log("Sincerely yours, your best worker.");
        };
        EmailToCEO.prototype.contactInfo = function () {
            console.log("You can contact me at 555-5555");
        };
        return EmailToCEO;
    }(Email));
    var EmailToFriend = /** @class */ (function (_super) {
        __extends(EmailToFriend, _super);
        function EmailToFriend() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EmailToFriend.prototype.salutation = function () {
            console.log("yo!");
        };
        EmailToFriend.prototype.discussion = function () {
            console.log("let's have a party!");
        };
        EmailToFriend.prototype.contactInfo = function () {
            console.log;
        };
        return EmailToFriend;
    }(Email));
    console.log("Email to CEO:");
    var c = new EmailToCEO();
    c.compose();
    console.log("\nEmail to a friend:");
    var f = new EmailToFriend();
    f.compose();
})(TemplateMethod || (TemplateMethod = {}));
