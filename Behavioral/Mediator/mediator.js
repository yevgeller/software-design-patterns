var Mother = /** @class */ (function () {
    function Mother() {
    }
    Mother.prototype.saySomethingToDaughter = function () {
        //...
    };
    Mother.prototype.saySomethingToSpouse = function () {
        //...
    };
    Mother.prototype.saySomethingToSon = function () { };
    return Mother;
}());
var Father = /** @class */ (function () {
    function Father() {
    }
    Father.prototype.saySomethingToDaughter = function () {
        //...
    };
    Father.prototype.saySomethingToSpouse = function () {
        //...
    };
    Father.prototype.saySomethingToSon = function () { };
    return Father;
}());
var Son = /** @class */ (function () {
    function Son() {
    }
    Son.prototype.saySomethingToMother = function () {
        //...
    };
    Son.prototype.saySomethingToFather = function () {
        //...
    };
    Son.prototype.saySomethingToOtherSibling = function () {
        //...
    };
    return Son;
}());
var Daughter = /** @class */ (function () {
    function Daughter() {
    }
    Daughter.prototype.saySomethingToMother = function () {
        //...
    };
    Daughter.prototype.saySomethingToFather = function () {
        //...
    };
    Daughter.prototype.saySomethingToOtherSibling = function () {
        //...
    };
    return Daughter;
}());
var FamilyMember = /** @class */ (function () {
    function FamilyMember(name, position, room) {
        this.name = name;
        this.position = position;
        this.room = room;
    }
    FamilyMember.prototype.getName = function () {
        return this.name;
    };
    FamilyMember.prototype.getPosition = function () {
        return this.position;
    };
    FamilyMember.prototype.send = function (message) {
        console.log("".concat(this.name, " sent ").concat(message));
        this.room.notify(message, this.name, false);
    };
    FamilyMember.prototype.sendPrivate = function (message, to) {
        this.room.notifyDirectly(this.name, message, to);
    };
    FamilyMember.prototype.receive = function (message, from, isPrivate) {
        if (!isPrivate) {
            console.log("".concat(this.position, " ").concat(this.name, " received message ").concat(message, " from ").concat(from));
        }
        else {
            console.log("".concat(this.position, " ").concat(this.name, " received a PRIVATE message ").concat(message, " from ").concat(from));
        }
    };
    FamilyMember.prototype.setChatRoom = function (room) {
        this.room = room;
    };
    return FamilyMember;
}());
var ChatRoom = /** @class */ (function () {
    function ChatRoom() {
        this.recipients = [];
    }
    ChatRoom.prototype.notifyDirectly = function (from, message, name) {
        var recipient = this.recipients.filter(function (r) { return r.getName() === name; });
        if (recipient && recipient.length > 0 && recipient[0] != undefined) {
            recipient[0].receive(message, from, true);
        }
        else {
            throw new Error("Recipient ".concat(name, " is not registered"));
        }
    };
    ChatRoom.prototype.notify = function (message, from, isPrivate) {
        this.recipients.forEach(function (r) { return r.receive(message, from, false); });
        console.log();
    };
    ChatRoom.prototype.register = function (person) {
        this.recipients.push(person); //check for duplicates
    };
    ChatRoom.prototype.registerInBulk = function (people) {
        var _a;
        var _this = this;
        (_a = this.recipients).push.apply(_a, people);
        this.recipients.forEach(function (r) { return r.setChatRoom(_this); });
    };
    return ChatRoom;
}());
var cha = new ChatRoom();
var fa = new FamilyMember("John", "father", cha);
var ma = new FamilyMember("Mary", "mother", cha);
var so = new FamilyMember("Jack", "son", cha);
var da = new FamilyMember("Jill", "daughter", cha);
cha.registerInBulk([fa, ma, so, da]);
fa.send("hi!");
da.sendPrivate("hello!", "Jack");
ma.sendPrivate("Hey!", "Jill");
