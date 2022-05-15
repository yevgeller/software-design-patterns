interface Appliance {
  work(): void;
  accept(repairPerson: RepairPerson): void; //functionality is separate because it's not a primary function of this object
}

interface RepairPerson {
  fixWashingMachine(a: Appliance): void;
  fixDishwasher(a: Appliance): void;
  fixOven(a: Appliance): void;
}

class SuperService implements RepairPerson {
  fixWashingMachine(a: Appliance): void {
    console.log(
      'SuperService reports: "Attempting to fix a washing machine". \nNeed to drain water first, then unscrew the back and fix this washing machine'
    );
    a.work();
  }
  fixDishwasher(a: Appliance): void {
    console.log(
      'SuperService reports: "Attempting to fix a dishwasher". \n First, need to pull it out, then take it from there.'
    );
    a.work();
  }
  fixOven(a: Appliance): void {
    console.log(
      'SuperService reports: "Attempting to fix an oven". \nOh, seems like it was unplugeed. Easy repair!'
    );
    a.work();
  }
}

class WashingMachine implements Appliance {
  work(): void {
    console.log("washing machine is working");
  }
  normalCycle(): void {
    console.log("normal cycle");
  }
  accept(repairPerson: RepairPerson) {
    repairPerson.fixWashingMachine(this);
  }
}
class DishWasher implements Appliance {
  work(): void {
    console.log("Dishwasher is working");
  }
  accept(repairPerson: RepairPerson): void {
    repairPerson.fixDishwasher(this);
  }
}
class Oven implements Appliance {
  work(): void {
    console.log("Oven is working");
  }
  accept(repairPerson: RepairPerson): void {
    repairPerson.fixOven(this);
  }
}

let fixItNow = new SuperService();
let wm = new WashingMachine();
wm.accept(fixItNow);
console.log();
let dw = new DishWasher();
dw.accept(fixItNow);
console.log();
let ov = new Oven();
ov.accept(fixItNow);
