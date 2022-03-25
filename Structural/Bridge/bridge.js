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
var NoBridge;
(function (NoBridge) {
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
    var BeigeLeatherInterior = /** @class */ (function (_super) {
        __extends(BeigeLeatherInterior, _super);
        function BeigeLeatherInterior(model) {
            var _this = _super.call(this, model) || this;
            _this.model = model;
            _this.interiorColor = "beige";
            _this.interiorMaterial = "leather";
            return _this;
        }
        return BeigeLeatherInterior;
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
    var BeigeClothInterior = /** @class */ (function (_super) {
        __extends(BeigeClothInterior, _super);
        function BeigeClothInterior(model) {
            var _this = _super.call(this, model) || this;
            _this.model = model;
            _this.interiorColor = "beige";
            _this.interiorMaterial = "cloth";
            return _this;
        }
        return BeigeClothInterior;
    }(CarInterior));
    var bl = new BlackLeatherInterior("A");
    var rc = new BeigeClothInterior("B");
    var bc = new BlackClothInterior("C");
    bl.getSummary();
    rc.getSummary();
    bc.getSummary();
})(NoBridge || (NoBridge = {}));
var WithBridge;
(function (WithBridge) {
    var CarInterior = /** @class */ (function () {
        function CarInterior(model, color, material) {
            var _this = this;
            this.getSummary = function () {
                return console.log("Model: ".concat(_this.model, ", ").concat(_this.interiorColor.interiorColor, " ").concat(_this.interiorMaterial.interiorMaterial, " interior."));
            };
            this.model = model;
            this.interiorColor = color;
            this.interiorMaterial = material;
        }
        return CarInterior;
    }());
    var BlackInterior = /** @class */ (function () {
        function BlackInterior() {
            this.interiorColor = "black";
        }
        return BlackInterior;
    }());
    var BeigeInterior = /** @class */ (function () {
        function BeigeInterior() {
            this.interiorColor = "beige";
        }
        return BeigeInterior;
    }());
    var LeatherInterior = /** @class */ (function () {
        function LeatherInterior() {
            this.interiorMaterial = "leather";
        }
        return LeatherInterior;
    }());
    var ClothInterior = /** @class */ (function () {
        function ClothInterior() {
            this.interiorMaterial = "cloth";
        }
        return ClothInterior;
    }());
    var ClothLeatherComboInterior = /** @class */ (function () {
        function ClothLeatherComboInterior() {
            this.interiorMaterial = "cloth/leather combo";
        }
        return ClothLeatherComboInterior;
    }());
    var bl = new CarInterior("D", new BlackInterior(), new LeatherInterior());
    var rc = new CarInterior("E", new BeigeInterior(), new ClothInterior());
    var bc = new CarInterior("F", new BlackInterior(), new ClothInterior());
    var rcl = new CarInterior("G", new BeigeInterior(), new ClothLeatherComboInterior());
    bl.getSummary();
    rc.getSummary();
    bc.getSummary();
    rcl.getSummary();
})(WithBridge || (WithBridge = {}));
