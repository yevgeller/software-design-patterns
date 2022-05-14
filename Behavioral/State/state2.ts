class SupportTicket {
  id: string;
  description: string;
  assignedTechnician: string;
  assignedQA: string;
  isResolved: boolean;
  resolutionComment: string;

  currentState: SupportTicketState;
  constructor(id: string = "N/A", description: string = "N/A") {
    this.id = id;
    this.description = description;
    console.log(`Created support ticket ${this.id}.`);
    this.currentState = new SupportTicketState_New(this);
  }
  assignTechnician(techName: string) {
    this.currentState.assignTechnician(techName);
  }
  assignQA(qaName: string) {
    this.currentState.assignQA(qaName);
  }
  resolve(result: boolean, resolutionComment: string = "N/A") {
    this.currentState.resolve(result, resolutionComment);
  }
  moveBack() {
    this.currentState.moveBack();
  }
}

abstract class SupportTicketState {
  state: string;
  ticket: SupportTicket;
  abstract assignTechnician(techName: string);
  abstract assignQA(qaName: string);
  abstract resolve(result: boolean, resolutionComment: string);
  abstract summary(): void;
  abstract moveBack(): void;
}

class SupportTicketState_New extends SupportTicketState {
  constructor(ticket: SupportTicket) {
    super();
    this.ticket = ticket;
    console.log(`Support ticket ${this.ticket.id} is now in New state`);
  }
  assignTechnician(techName: string) {
    this.ticket.assignedTechnician = techName;
    this.ticket.currentState = new SupportTicketState_TechnicianAssigned(
      this.ticket
    );
  }
  assignQA(qaName: string) {
    console.log("Assign QA: Cannot assign QA while ticket is New");
  }
  resolve(result: boolean, resolutionComment: string) {
    console.log(
      `Resolve: Ticket ${this.ticket.id} is in the 'New' status. Cannot resolve a new ticket`
    );
  }
  summary(): void {
    console.log(`Support ticket ${this.ticket.id} created.`);
  }
  moveBack(): void {
    console.log(
      `Move back: Ticket ${this.ticket.id} is in the 'New' status. Cannot move back because there is no state prior to New.`
    );
  }
}
class SupportTicketState_TechnicianAssigned extends SupportTicketState {
  constructor(ticket: SupportTicket) {
    super();
    this.ticket = ticket;
    console.log(
      `Support ticket ${this.ticket.id} is now in \'Technician Assigned\' state`
    );
  }
  assignTechnician(techName: string) {
    console.log(
      `Assign Tech: Technician ${this.ticket.assignedTechnician} is already assigned on ticket ${this.ticket.id}`
    );
  }
  assignQA(qaName: string) {
    this.ticket.assignedQA = qaName;
    console.log(
      `Ticket ${this.ticket.id} has been assigned a QA tech: ${qaName}.`
    );
    this.ticket.currentState = new SupportTicketState_QAReview(this.ticket);
  }
  resolve(result: boolean, resolutionComment: string) {
    console.log(
      `Resolve: Ticket ${this.ticket.id} is in the 'Technician Assigned' state. It can either have a QA assigned or be moved back to 'New'`
    );
  }
  summary(): void {
    throw new Error("Method not implemented.");
  }
  moveBack(): void {
    console.log(
      `Move back: Moving ticket ${this.ticket.id} from 'Technician Assigned' to 'New' state.`
    );
    this.ticket.assignedTechnician = undefined;
    this.ticket.currentState = new SupportTicketState_New(this.ticket);
  }
}

class SupportTicketState_QAReview extends SupportTicketState {
  constructor(ticket: SupportTicket) {
    super();
    this.ticket = ticket;
    console.log(`Support ticket ${this.ticket.id} is now in 'QA Review' state`);
  }
  assignTechnician(techName: string) {
    console.log(
      `Assign Tech: Technician ${this.ticket.assignedTechnician} is already assigned on ticket ${this.ticket.id}`
    );
  }
  assignQA(qaName: string) {
    console.log(
      `Assign QA: QA Specialist ${this.ticket.assignedQA} is already assigned on ticket ${this.ticket.id}`
    );
  }
  resolve(result: boolean, resolutionComment: string = null) {
    this.ticket.isResolved = result;
    if (resolutionComment) this.ticket.resolutionComment = resolutionComment;
  }
  summary(): void {
    console.log(``);
  }
  moveBack(): void {
    console.log(
      `Move back: Moving ticket ${this.ticket.id} from 'QA Review' to 'Technician Assigned' state.`
    );
    this.ticket.assignedTechnician = null;
    this.ticket.currentState = new SupportTicketState_TechnicianAssigned(
      this.ticket
    );
  }
}
class SupportTicketState_Resolved extends SupportTicketState {
  constructor(ticket: SupportTicket) {
    super();
    this.ticket = ticket;
    console.log(
      `Support ticket ${
        this.ticket.id
      } is now in 'Resolved' state. Resolved successfully: ${
        this.ticket.isResolved
      }, comment: ${
        this.ticket.resolutionComment
          ? this.ticket.resolutionComment
          : "No comment provided"
      }`
    );
  }
  assignTechnician(techName: string) {
    console.log(
      `Assign Tech: Technician ${this.ticket.assignedTechnician} is already assigned on ticket ${this.ticket.id}`
    );
  }
  assignQA(qaName: string) {
    console.log(
      `QA Specialist ${this.ticket.assignedQA} is already assigned on ticket ${this.ticket.id}`
    );
  }
  resolve(result: boolean, resolutionComment: string = null) {
    console.log(`Resolve: Ticket ${this.ticket.id} has already been resolved.`);
  }
  summary(): void {
    console.log(``);
  }
  moveBack(): void {
    console.log(
      `Move back: Moving ticket ${this.ticket.id} from 'Resolved' to 'QA Review' state.`
    );
    this.ticket.isResolved = null;
    this.ticket.resolutionComment = null;
    this.ticket.currentState = new SupportTicketState_QAReview(this.ticket);
  }
}

let supportTicket1 = new SupportTicket("12345", "test ticket");

supportTicket1.moveBack(); //error
//supportTicket1.assignTechnician("Jeff the Tech");
supportTicket1.assignQA("Jane the QA");
supportTicket1.resolve(true, "Finished successfully");
console.log("--- Moving on to the next State ---");

supportTicket1.assignTechnician("Jeff the Tech");

supportTicket1.assignTechnician("Jeff the Tech");
//supportTicket1.assignQA("Jane the QA");
supportTicket1.resolve(true, "Finished successfully");
console.log("--- Moving on to the next State ---");
supportTicket1.assignQA("Jane the QA");

supportTicket1.assignTechnician("Jeff the Tech");
supportTicket1.assignQA("Jane the QA");
//supportTicket1.resolve(true, "Finished successfully");
console.log("--- Moving on to the next State ---");
supportTicket1.resolve(true, "Finished successfully");

console.log("--- Moving all the way back to New State: ---");

supportTicket1.moveBack();
supportTicket1.moveBack();
supportTicket1.moveBack();
supportTicket1.moveBack();
console.log("--- Moving all the way forward without errors:  ---");
supportTicket1.assignTechnician("Jeff the Tech");
supportTicket1.assignQA("Jane the QA");
supportTicket1.resolve(true, "Finished successfully again!");
