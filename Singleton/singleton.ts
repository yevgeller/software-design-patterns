class TicketChecker {
  private static instance: TicketChecker;
  private ticketsInUse: string[] = [];
  private constructor() {}

  public static getInstance(): TicketChecker {
    if (!TicketChecker.instance) {
      TicketChecker.instance = new TicketChecker();
    }

    return TicketChecker.instance;
  }

  public validateTicket(ticketNumber: string): string {
    if (this.ticketsInUse.indexOf(ticketNumber) >= 0)
      return `Ticket ${ticketNumber} has already been used.`;

    this.ticketsInUse.push(ticketNumber);
    return `Ticket ${ticketNumber} has not been used yet. Welcome to the show!`;
  }

  public ticketIsAlreadyInUse(ticketNumber: string): string {
    if (this.ticketsInUse.indexOf(ticketNumber) >= 0)
      return `Ticket ${ticketNumber} has already been used.`;
    return `Ticket ${ticketNumber} has not been used yet.`;
  }
}

let tc1 = TicketChecker.getInstance();
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
let tc2 = TicketChecker.getInstance();
console.log("--- Using a different Ticket Checker ---");
console.log(
  "Has ticket 'abc' been used already? ",
  tc1.ticketIsAlreadyInUse("abc")
);
console.log(
  "Has ticket 'def' been used already? ",
  tc1.ticketIsAlreadyInUse("def")
);
console.log(tc1 === tc2);