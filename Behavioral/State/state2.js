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
var SupportTicket = /** @class */ (function () {
    function SupportTicket(id, description) {
        if (id === void 0) { id = "N/A"; }
        if (description === void 0) { description = "N/A"; }
        this.id = id;
        this.description = description;
        console.log("Created support ticket ".concat(this.id, "."));
        this.currentState = new SupportTicketState_New(this);
    }
    SupportTicket.prototype.assignTechnician = function (techName) {
        this.currentState.assignTechnician(techName);
    };
    SupportTicket.prototype.assignQA = function (qaName) {
        this.currentState.assignQA(qaName);
    };
    SupportTicket.prototype.resolve = function (result, resolutionComment) {
        if (resolutionComment === void 0) { resolutionComment = "N/A"; }
        this.currentState.resolve(result, resolutionComment);
    };
    SupportTicket.prototype.moveBack = function () {
        this.currentState.moveBack();
    };
    return SupportTicket;
}());
var SupportTicketState = /** @class */ (function () {
    function SupportTicketState() {
    }
    return SupportTicketState;
}());
var SupportTicketState_New = /** @class */ (function (_super) {
    __extends(SupportTicketState_New, _super);
    function SupportTicketState_New(ticket) {
        var _this = _super.call(this) || this;
        _this.ticket = ticket;
        console.log("Support ticket ".concat(_this.ticket.id, " is now in New state"));
        return _this;
    }
    SupportTicketState_New.prototype.assignTechnician = function (techName) {
        this.ticket.assignedTechnician = techName;
        this.ticket.currentState = new SupportTicketState_TechnicianAssigned(this.ticket);
    };
    SupportTicketState_New.prototype.assignQA = function (qaName) {
        console.log("Assign QA: Cannot assign QA while ticket is New");
    };
    SupportTicketState_New.prototype.resolve = function (result, resolutionComment) {
        console.log("Resolve: Ticket ".concat(this.ticket.id, " is in the 'New' status. Cannot resolve a new ticket"));
    };
    SupportTicketState_New.prototype.summary = function () {
        console.log("Support ticket ".concat(this.ticket.id, " created."));
    };
    SupportTicketState_New.prototype.moveBack = function () {
        console.log("Move back: Ticket ".concat(this.ticket.id, " is in the 'New' status. Cannot move back because there is no state prior to New"));
    };
    return SupportTicketState_New;
}(SupportTicketState));
var SupportTicketState_TechnicianAssigned = /** @class */ (function (_super) {
    __extends(SupportTicketState_TechnicianAssigned, _super);
    function SupportTicketState_TechnicianAssigned(ticket) {
        var _this = _super.call(this) || this;
        _this.ticket = ticket;
        console.log("Support ticket ".concat(_this.ticket.id, " is now in 'Technician Assigned' state"));
        return _this;
    }
    SupportTicketState_TechnicianAssigned.prototype.assignTechnician = function (techName) {
        console.log("Assign Tech: Technician ".concat(this.ticket.assignedTechnician, " is already assigned on ticket ").concat(this.ticket.id));
    };
    SupportTicketState_TechnicianAssigned.prototype.assignQA = function (qaName) {
        this.ticket.assignedQA = qaName;
        console.log("Ticket ".concat(this.ticket.id, " has been assigned a QA tech: ").concat(qaName, "."));
        this.ticket.currentState = new SupportTicketState_QAReview(this.ticket);
    };
    SupportTicketState_TechnicianAssigned.prototype.resolve = function (result, resolutionComment) {
        console.log("Resolve: Ticket ".concat(this.ticket.id, " is in the 'Technician Assigned' state. It can either have a QA assigned or be moved back to 'New'"));
    };
    SupportTicketState_TechnicianAssigned.prototype.summary = function () {
        throw new Error("Method not implemented.");
    };
    SupportTicketState_TechnicianAssigned.prototype.moveBack = function () {
        console.log("Move back: Moving ticket ".concat(this.ticket.id, " from 'Technician Assigned' to 'New' state."));
        this.ticket.assignedTechnician = undefined;
        this.ticket.currentState = new SupportTicketState_New(this.ticket);
    };
    return SupportTicketState_TechnicianAssigned;
}(SupportTicketState));
var SupportTicketState_QAReview = /** @class */ (function (_super) {
    __extends(SupportTicketState_QAReview, _super);
    function SupportTicketState_QAReview(ticket) {
        var _this = _super.call(this) || this;
        _this.ticket = ticket;
        console.log("Support ticket ".concat(_this.ticket.id, " is now in 'QA Review' state"));
        return _this;
    }
    SupportTicketState_QAReview.prototype.assignTechnician = function (techName) {
        console.log("Assign Tech: Technician ".concat(this.ticket.assignedTechnician, " is already assigned on ticket ").concat(this.ticket.id));
    };
    SupportTicketState_QAReview.prototype.assignQA = function (qaName) {
        console.log("Assign QA: QA Specialist ".concat(this.ticket.assignedQA, " is already assigned on ticket ").concat(this.ticket.id));
    };
    SupportTicketState_QAReview.prototype.resolve = function (result, resolutionComment) {
        if (resolutionComment === void 0) { resolutionComment = null; }
        this.ticket.isResolved = result;
        if (resolutionComment)
            this.ticket.resolutionComment = resolutionComment;
    };
    SupportTicketState_QAReview.prototype.summary = function () {
        console.log("");
    };
    SupportTicketState_QAReview.prototype.moveBack = function () {
        console.log("Move back: Moving ticket ".concat(this.ticket.id, " from 'QA Review' to 'Technician Assigned' state."));
        this.ticket.assignedTechnician = null;
        this.ticket.currentState = new SupportTicketState_TechnicianAssigned(this.ticket);
    };
    return SupportTicketState_QAReview;
}(SupportTicketState));
var SupportTicketState_Resolved = /** @class */ (function (_super) {
    __extends(SupportTicketState_Resolved, _super);
    function SupportTicketState_Resolved(ticket) {
        var _this = _super.call(this) || this;
        _this.ticket = ticket;
        console.log("Support ticket ".concat(_this.ticket.id, " is now in 'Resolved' state. Resolved successfully: ").concat(_this.ticket.isResolved, ", comment: ").concat(_this.ticket.resolutionComment
            ? _this.ticket.resolutionComment
            : "No comment provided"));
        return _this;
    }
    SupportTicketState_Resolved.prototype.assignTechnician = function (techName) {
        console.log("Assign Tech: Technician ".concat(this.ticket.assignedTechnician, " is already assigned on ticket ").concat(this.ticket.id));
    };
    SupportTicketState_Resolved.prototype.assignQA = function (qaName) {
        console.log("QA Specialist ".concat(this.ticket.assignedQA, " is already assigned on ticket ").concat(this.ticket.id));
    };
    SupportTicketState_Resolved.prototype.resolve = function (result, resolutionComment) {
        if (resolutionComment === void 0) { resolutionComment = null; }
        console.log("Resolve: Ticket ".concat(this.ticket.id, " has already been resolved."));
    };
    SupportTicketState_Resolved.prototype.summary = function () {
        console.log("");
    };
    SupportTicketState_Resolved.prototype.moveBack = function () {
        console.log("Move back: Moving ticket ".concat(this.ticket.id, " from 'Resolved' to 'QA Review' state."));
        this.ticket.isResolved = null;
        this.ticket.resolutionComment = null;
        this.ticket.currentState = new SupportTicketState_QAReview(this.ticket);
    };
    return SupportTicketState_Resolved;
}(SupportTicketState));
var supportTicket1 = new SupportTicket("12345", "test ticket");
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
