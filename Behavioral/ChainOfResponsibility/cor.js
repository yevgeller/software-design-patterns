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
var ToyCar = /** @class */ (function () {
    function ToyCar(wheels, hornHonking, wheelsTurning, serialNumber) {
        this.issues = [];
        this.wheels = wheels;
        this.hornHonking = hornHonking;
        this.wheelsTurning = wheelsTurning;
        this.serialNumber = serialNumber;
    }
    return ToyCar;
}());
var AbstractHandler = /** @class */ (function () {
    function AbstractHandler() {
    }
    AbstractHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        return handler;
    };
    AbstractHandler.prototype.handle = function (request) {
        if (this.nextHandler) {
            this.nextHandler.handle(request);
        }
        return null;
    };
    return AbstractHandler;
}());
var NumberOfWheelsCheckHandler = /** @class */ (function (_super) {
    __extends(NumberOfWheelsCheckHandler, _super);
    function NumberOfWheelsCheckHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberOfWheelsCheckHandler.prototype.handle = function (request) {
        if (request.wheels !== 4) {
            request.issues.push("unacceptable number of wheels, ".concat(request.wheels, " instead of 4"));
        }
        return _super.prototype.handle.call(this, request);
    };
    return NumberOfWheelsCheckHandler;
}(AbstractHandler));
var HornHonksCheckHandler = /** @class */ (function (_super) {
    __extends(HornHonksCheckHandler, _super);
    function HornHonksCheckHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HornHonksCheckHandler.prototype.handle = function (request) {
        if (request.hornHonking !== true) {
            request.issues.push("horn does not work");
        }
        return _super.prototype.handle.call(this, request);
    };
    return HornHonksCheckHandler;
}(AbstractHandler));
var WheelsTurnCheckHandler = /** @class */ (function (_super) {
    __extends(WheelsTurnCheckHandler, _super);
    function WheelsTurnCheckHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WheelsTurnCheckHandler.prototype.handle = function (request) {
        if (!request.wheelsTurning) {
            request.issues.push("wheels are not turning");
        }
        return _super.prototype.handle.call(this, request);
    };
    return WheelsTurnCheckHandler;
}(AbstractHandler));
var wheelsCheck = new NumberOfWheelsCheckHandler();
var hornCheck = new HornHonksCheckHandler();
var wheelsTurnCheck = new WheelsTurnCheckHandler();
wheelsCheck.setNext(hornCheck).setNext(wheelsTurnCheck);
var goodCar = new ToyCar(4, true, true, "TOYCAR001");
var badCar1 = new ToyCar(3, false, false, "TOYCAR002");
var badCar2 = new ToyCar(3, false, false, "TOYCAR003");
var badCar3 = new ToyCar(3, false, false, "TOYCAR004");
function processResult(item) {
    if (item.issues.length > 0) {
        console.log("car ".concat(item.serialNumber, " was found to have the following issues during the inspection: "));
        console.table(item.issues);
    }
    else
        console.log("car ".concat(item.serialNumber, " processed inspection without issues"));
}
wheelsCheck.handle(goodCar);
processResult(goodCar);
wheelsCheck.handle(badCar1);
processResult(badCar1);
hornCheck.handle(badCar2);
processResult(badCar2);
wheelsTurnCheck.handle(badCar3);
processResult(badCar3);
