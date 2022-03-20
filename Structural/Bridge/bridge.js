// class Interior {
//   seatMaterial: string;
// }
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
// class ClothInterior extends Interior {
//   constructor() {
//     super();
//     this.seatMaterial = "cloth";
//   }
// }
// class LeatherInterior extends Interior {
//   constructor() {
//     super();
//     this.seatMaterial = "leather";
//   }
// }
// class BlackLeatherInterior extends LeatherInterior {
//   seatColor: string;
//   constructor() {
//     super();
//     this.seatColor = "black";
//   }
//   operate = () => console.log('Black leather');
// }
// class BlackClothInterior extends ClothInterior {
//   seatColor: string;
//   constructor() {
//     super();
//     this.seatColor = "black";
//   }
// }
// class RedLeatherInterior extends LeatherInterior {
//   seatColor: string;
//   constructor() {
//     super();
//     this.seatColor = "red"; //duplication
//   }
// }
// class RedClothInterior extends ClothInterior {
//   seatColor: string;
//   constructor() {
//     super();
//     this.seatColor = "red"; //duplication
//   }
// }
// //what about adding another color? Or another material?
// class SeatColor {
//   seatColor: string;
// }
// class RedSeatColor extends SeatColor {
//   constructor() {
//     super();
//     this.seatColor = "red";
//   }
// }
// class BlackSeatColor extends SeatColor {
//     constructor() {
//         super();
//         this.seatColor = "black";
//     }
// }
// //need to extract one dimension into
// //Abstraction/interface -- control layer, outsource work to implementation
// //Implementation/platform -- does the work
// class Pizza2 {
//   shape: string;
// }
// //chef cooking --
// //pilot and plane
// /*
// pilot can fly intel missions or can fly against aircraft or destroy land targets or practice flights
// plane can have weapons, can have missiles, guns, extra fuel
// implementation
// A single home PC
// + playAGame()
// + sendEmail() //different e-mail application, gmail or Outlook
// + doWork() //use VisualStudio or Word
// Abstraction: user
// */
var CarInterior = /** @class */ (function () {
    function CarInterior(model) {
        var _this = this;
        this.getSummary = function () {
            return console.log("Model: ".concat(_this.model, ", ").concat(_this.interiorColor, " ").concat(_this.interiorMaterial, " interior."));
        };
        this.model = model;
    }
    return CarInterior;
}());
var BlackLeatherInterior = /** @class */ (function (_super) {
    __extends(BlackLeatherInterior, _super);
    function BlackLeatherInterior(model) {
        var _this = _super.call(this, model) || this;
        _this.model = model;
        _this.interiorColor = "black";
        _this.interiorMaterial = "leather";
        return _this;
    }
    return BlackLeatherInterior;
}(CarInterior));
var RedLeatherInterior = /** @class */ (function (_super) {
    __extends(RedLeatherInterior, _super);
    function RedLeatherInterior(model) {
        var _this = _super.call(this, model) || this;
        _this.model = model;
        _this.interiorColor = "red";
        _this.interiorMaterial = "leather";
        return _this;
    }
    return RedLeatherInterior;
}(CarInterior));
var BlackClothInterior = /** @class */ (function (_super) {
    __extends(BlackClothInterior, _super);
    function BlackClothInterior(model) {
        var _this = _super.call(this, model) || this;
        _this.model = model;
        _this.interiorColor = "black";
        _this.interiorMaterial = "cloth";
        return _this;
    }
    return BlackClothInterior;
}(CarInterior));
var RedClothInterior = /** @class */ (function (_super) {
    __extends(RedClothInterior, _super);
    function RedClothInterior(model) {
        var _this = _super.call(this, model) || this;
        _this.model = model;
        _this.interiorColor = "red";
        _this.interiorMaterial = "cloth";
        return _this;
    }
    return RedClothInterior;
}(CarInterior));
var bl = new BlackLeatherInterior("A");
var rc = new RedClothInterior("B");
var bc = new BlackClothInterior("C");
bl.getSummary();
rc.getSummary();
bc.getSummary();
