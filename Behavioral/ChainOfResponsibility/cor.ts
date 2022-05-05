class ToyCar {
  serialNumber: string;
  wheels: number;
  hornHonking: boolean;
  wheelsTurning: boolean;
  issues: any = [];

  constructor(
    wheels: number,
    hornHonking: boolean,
    wheelsTurning: boolean,
    serialNumber: string
  ) {
    this.wheels = wheels;
    this.hornHonking = hornHonking;
    this.wheelsTurning = wheelsTurning;
    this.serialNumber = serialNumber;
  }
}

interface IToyCarQualityControlHandler {
  setNext(handler: IToyCarQualityControlHandler): IToyCarQualityControlHandler;
  handle(request: ToyCar): void;
}

abstract class AbstractHandler implements IToyCarQualityControlHandler {
  private nextHandler: IToyCarQualityControlHandler;
  public setNext(
    handler: IToyCarQualityControlHandler
  ): IToyCarQualityControlHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: ToyCar): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
    return null;
  }
}

class NumberOfWheelsCheckHandler extends AbstractHandler {
  public handle(request: ToyCar): void {
    if (request.wheels !== 4) {
      request.issues.push(
        `unacceptable number of wheels, ${request.wheels} instead of 4`
      );
    }
    return super.handle(request);
  }
}

class HornHonksCheckHandler extends AbstractHandler {
  public handle(request: ToyCar): void {
    if (request.hornHonking !== true) {
      request.issues.push("horn does not work");
    }
    return super.handle(request);
  }
}

class WheelsTurnCheckHandler extends AbstractHandler {
  public handle(request: ToyCar): void {
    if (!request.wheelsTurning) {
      request.issues.push("wheels are not turning");
    }
    return super.handle(request);
  }
}

let wheelsCheck = new NumberOfWheelsCheckHandler();
let hornCheck = new HornHonksCheckHandler();
let wheelsTurnCheck = new WheelsTurnCheckHandler();

wheelsCheck.setNext(hornCheck).setNext(wheelsTurnCheck);

let goodCar = new ToyCar(4, true, true, "TOYCAR001");
let badCar1 = new ToyCar(3, false, false, "TOYCAR002");
let badCar2 = new ToyCar(3, false, false, "TOYCAR003");
let badCar3 = new ToyCar(3, false, false, "TOYCAR004");
function processResult(item: ToyCar) {
  if (item.issues.length > 0) {
    console.log(
      `car ${item.serialNumber} was found to have the following issues during the inspection: `
    );
    console.table(item.issues);
  } else
    console.log(`car ${item.serialNumber} processed inspection without issues`);
}

wheelsCheck.handle(goodCar);
processResult(goodCar);
wheelsCheck.handle(badCar1);
processResult(badCar1);
hornCheck.handle(badCar2);
processResult(badCar2);
wheelsTurnCheck.handle(badCar3);
processResult(badCar3);
