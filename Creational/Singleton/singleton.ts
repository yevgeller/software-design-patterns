class TicketChecker {
  private static instance: TicketChecker; //field to hold the instance of the class
  private ticketsInUse: string[] = [];
  private constructor() {} //private constructor

  public static getInstance(): TicketChecker {
    if (!TicketChecker.instance) {
      TicketChecker.instance = new TicketChecker();
    }

    return TicketChecker.instance;
  }

  public validateTicket(ticketNumber: string): string {
    if (this.ticketsInUse.indexOf(ticketNumber) >= 0)
      return `Ticket '${ticketNumber}' has already been used.`;

    this.ticketsInUse.push(ticketNumber);
    return `Ticket '${ticketNumber}' has not been used yet. Welcome to the show!`;
  }

  public ticketIsAlreadyInUse(ticketNumber: string): string {
    if (this.ticketsInUse.indexOf(ticketNumber) >= 0)
      return `Ticket '${ticketNumber}' has already been used.`;
    return `Ticket '${ticketNumber}' has not been used yet.`;
  }

  public displayUsedTickets(): string {
    if (this.ticketsInUse.length === 0) return "none";
    return this.ticketsInUse
      .slice(1, this.ticketsInUse.length)
      .reduce((prev, current) => prev + ", " + current, this.ticketsInUse[0]);
  }
}

const tc1 = TicketChecker.getInstance();
console.log("--- Using TicketChecker1: ---");
console.log("Attempting to use ticket 'abc': ", tc1.validateTicket("abc"));
console.log("Attempting to use ticket 'def': ", tc1.validateTicket("def"));
console.log(
  "Has ticket 'abc' been used already? ",
  tc1.ticketIsAlreadyInUse("abc")
);
console.log(
  "Has ticket 'def' been used already? ",
  tc1.ticketIsAlreadyInUse("def")
);
const tc2 = TicketChecker.getInstance();
console.log("--- Using TicketChecker2: ---");
console.log(
  "Has ticket 'abc' been used already? ",
  tc1.ticketIsAlreadyInUse("abc")
);
console.log(
  "Has ticket 'def' been used already? ",
  tc1.ticketIsAlreadyInUse("def")
);
console.log("Attempting to use ticket 'ghi': ", tc2.validateTicket("ghi"));
console.log("--- Switching back to TicketChecker1: ---");
console.log(
  "Has ticket 'ghi' been used already? ",
  tc1.ticketIsAlreadyInUse("ghi")
);
console.log(
  "--- Just for kicks, let's instantiate another TicketChecker and check status: ---"
);
const tc3 = TicketChecker.getInstance();
console.log("Validated tickets, as tc3 reports: ", tc3.displayUsedTickets());
console.log(
  "Are ticket checkers point to the same instance? Is tc2 === tc3?",
  tc3 === tc2
);
