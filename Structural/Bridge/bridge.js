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
    function CarInterior(model, color, material) {
        var _this = this;
        this.getInteriorMaterial = function () {
            return console.log("base class, ".concat(_this.interiorMaterial, " material"));
        };
        this.getInteriorColor = function () {
            return console.log("base class, ".concat(_this.interiorColor, " interior color"));
        };
        this.model = model;
        this.interiorMaterial = "any";
        this.interiorColor = "any";
    }
    return CarInterior;
}());
var LeatherInterior = /** @class */ (function (_super) {
    __extends(LeatherInterior, _super);
    function LeatherInterior(model, color, material) {
        var _this = _super.call(this, model, color, material) || this;
        _this.model = model;
        _this.interiorColor = color;
        _this.interiorMaterial = material;
        return _this;
    }
    return LeatherInterior;
}(CarInterior));
var li = new LeatherInterior("A", "blue", "leather");
li.getInteriorColor();
li.getInteriorMaterial();
