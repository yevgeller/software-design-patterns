var TicketChecker = /** @class */ (function () {
    function TicketChecker() {
        this.ticketsInUse = [];
    }
    TicketChecker.getInstance = function () {
        if (!TicketChecker.instance) {
            TicketChecker.instance = new TicketChecker();
        }
        return TicketChecker.instance;
    };
    TicketChecker.prototype.validateTicket = function (ticketNumber) {
        if (this.ticketsInUse.indexOf(ticketNumber) >= 0)
            return "Ticket ".concat(ticketNumber, " has already been used.");
        this.ticketsInUse.push(ticketNumber);
        return "Ticket ".concat(ticketNumber, " has not been used yet. Welcome to the show!");
    };
    TicketChecker.prototype.ticketIsAlreadyInUse = function (ticketNumber) {
        if (this.ticketsInUse.indexOf(ticketNumber) >= 0)
            return "Ticket ".concat(ticketNumber, " has already been used.");
        return "Ticket ".concat(ticketNumber, " has not been used yet.");
    };
    return TicketChecker;
}());
var tc1 = TicketChecker.getInstance();
console.log("Attempting to use ticket 'abc': ", tc1.validateTicket("abc"));
console.log("Attempting to use ticket 'def': ", tc1.validateTicket("def"));
console.log("Has ticket 'abc' been used already? ", tc1.ticketIsAlreadyInUse("abc"));
console.log("Has ticket 'def' been used already? ", tc1.ticketIsAlreadyInUse("def"));
var tc2 = TicketChecker.getInstance();
console.log("--- Using a different Ticket Checker ---");
console.log("Has ticket 'abc' been used already? ", tc1.ticketIsAlreadyInUse("abc"));
console.log("Has ticket 'def' been used already? ", tc1.ticketIsAlreadyInUse("def"));
console.log(tc1 === tc2);
