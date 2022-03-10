var TicketChecker = /** @class */ (function () {
    function TicketChecker() {
        this.ticketsInUse = [];
    } //private constructor
    TicketChecker.getInstance = function () {
        if (!TicketChecker.instance) {
            TicketChecker.instance = new TicketChecker();
        }
        return TicketChecker.instance;
    };
    TicketChecker.prototype.validateTicket = function (ticketNumber) {
        if (this.ticketsInUse.indexOf(ticketNumber) >= 0)
            return "Ticket '".concat(ticketNumber, "' has already been used.");
        this.ticketsInUse.push(ticketNumber);
        return "Ticket '".concat(ticketNumber, "' has not been used yet. Welcome to the show!");
    };
    TicketChecker.prototype.ticketIsAlreadyInUse = function (ticketNumber) {
        if (this.ticketsInUse.indexOf(ticketNumber) >= 0)
            return "Ticket '".concat(ticketNumber, "' has already been used.");
        return "Ticket '".concat(ticketNumber, "' has not been used yet.");
    };
    TicketChecker.prototype.displayUsedTickets = function () {
        if (this.ticketsInUse.length === 0)
            return "none";
        return this.ticketsInUse
            .slice(1, this.ticketsInUse.length)
            .reduce(function (prev, current) { return prev + ", " + current; }, this.ticketsInUse[0]);
    };
    return TicketChecker;
}());
var tc1 = TicketChecker.getInstance();
console.log("--- Using TicketChecker1: ---");
console.log("Attempting to use ticket 'abc': ", tc1.validateTicket("abc"));
console.log("Attempting to use ticket 'def': ", tc1.validateTicket("def"));
console.log("Has ticket 'abc' been used already? ", tc1.ticketIsAlreadyInUse("abc"));
console.log("Has ticket 'def' been used already? ", tc1.ticketIsAlreadyInUse("def"));
var tc2 = TicketChecker.getInstance();
console.log("--- Using TicketChecker2: ---");
console.log("Has ticket 'abc' been used already? ", tc1.ticketIsAlreadyInUse("abc"));
console.log("Has ticket 'def' been used already? ", tc1.ticketIsAlreadyInUse("def"));
console.log("Attempting to use ticket 'ghi': ", tc2.validateTicket("ghi"));
console.log("--- Switching back to TicketChecker1: ---");
console.log("Has ticket 'ghi' been used already? ", tc1.ticketIsAlreadyInUse("ghi"));
console.log("--- Just for kicks, let's instantiate another TicketChecker and check status: ---");
var tc3 = TicketChecker.getInstance();
console.log("Validated tickets, as tc3 reports: ", tc3.displayUsedTickets());
console.log("Are ticket checkers point to the same instance? Is tc2 === tc3?", tc3 === tc2);
