namespace Attempt1 {
  enum SupportTicketStatus {
    New = 1,
    TechnicianAssigned,
    QAReview,
    Resolved,
  }

  class SupportTicket {
    id: string;
    description: string;
    assignedTechnician: string;
    assignedQA: string;

    //  currentStatus: string;
    currentState: SupportTicketState;
    constructor(
      id: string = "N/A",
      description: string = "N/A",
      assignedTechnician: string = "N/A",
      assignedQA: string = "N/A"
    ) {
      this.id = id;
      this.description = description;
      this.assignedTechnician = assignedTechnician;
      this.assignedQA = assignedQA;
    }
  }

  abstract class SupportTicketState {
    ticket: SupportTicket;
    abstract moveForward(info: string): void;
    abstract moveBack(): void;
  }

  class SupportTicketState_New extends SupportTicketState {
    constructor(ticket: SupportTicket) {
      super();
      this.ticket = ticket;
    }
    moveForward(info: string): void {
      this.ticket.currentState = new SupportTicketState_TechnicianAssigned(
        info,
        this.ticket
      );
    }
    moveBack(): void {
      throw new Error("There is no state prior to New");
    }
  }
  class SupportTicketState_TechnicianAssigned extends SupportTicketState {
    constructor(info: string, ticket: SupportTicket) {
      super();
      this.ticket = ticket;
      this.ticket.assignedTechnician = info;
    }
    moveForward(info: string): void {
      //this.ticket.currentState =
    }
    moveBack(): void {
      this.ticket.assignedTechnician = undefined;
      this.ticket.currentState = new SupportTicketState_New(
        new SupportTicket(this.ticket.id, this.ticket.description)
      );
    }
  }

  class SupportTicketState_QAReview extends SupportTicketState {
    constructor(info: string, ticket: SupportTicket) {
      super();
      this.ticket = ticket;
      this.ticket.assignedQA = info;
    }
    moveForward(info: string): void {
      //this.ticket.currentState = new SupportTicketState_TechnicianAssigned('n/a')
    }
    moveBack(): void {
      this.ticket.assignedTechnician = undefined;
      this.ticket.currentState = new SupportTicketState_New(
        new SupportTicket(this.ticket.id, this.ticket.description)
      );
    }
  }
}
