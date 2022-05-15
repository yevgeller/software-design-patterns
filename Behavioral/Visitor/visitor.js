var SuperService = /** @class */ (function () {
    function SuperService() {
    }
    SuperService.prototype.fixWashingMachine = function (a) {
        console.log('SuperService reports: "Attempting to fix a washing machine". \nNeed to drain water first, then unscrew the back and fix this washing machine');
        a.work();
    };
    SuperService.prototype.fixDishwasher = function (a) {
        console.log('SuperService reports: "Attempting to fix a dishwasher". \n First, need to pull it out, then take it from there.');
        a.work();
    };
    SuperService.prototype.fixOven = function (a) {
        console.log('SuperService reports: "Attempting to fix an oven". \nOh, seems like it was unplugeed. Easy repair!');
        a.work();
    };
    return SuperService;
}());
var WashingMachine = /** @class */ (function () {
    function WashingMachine() {
    }
    WashingMachine.prototype.work = function () {
        console.log("washing machine is working");
    };
    WashingMachine.prototype.normalCycle = function () {
        console.log("normal cycle");
    };
    WashingMachine.prototype.accept = function (repairPerson) {
        repairPerson.fixWashingMachine(this);
    };
    return WashingMachine;
}());
var DishWasher = /** @class */ (function () {
    function DishWasher() {
    }
    DishWasher.prototype.work = function () {
        console.log("Dishwasher is working");
    };
    DishWasher.prototype.accept = function (repairPerson) {
        repairPerson.fixDishwasher(this);
    };
    return DishWasher;
}());
var Oven = /** @class */ (function () {
    function Oven() {
    }
    Oven.prototype.work = function () {
        console.log("Oven is working");
    };
    Oven.prototype.accept = function (repairPerson) {
        repairPerson.fixOven(this);
    };
    return Oven;
}());
var fixItNow = new SuperService();
var wm = new WashingMachine();
wm.accept(fixItNow);
console.log();
var dw = new DishWasher();
dw.accept(fixItNow);
console.log();
var ov = new Oven();
ov.accept(fixItNow);
