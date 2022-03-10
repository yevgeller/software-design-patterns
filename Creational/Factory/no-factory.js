var WhoNeedsAFactory;
(function (WhoNeedsAFactory) {
    var ToyCar = /** @class */ (function () {
        function ToyCar() {
        }
        ToyCar.prototype.whatIsIt = function () {
            console.log("this is a toy car");
        };
        ToyCar.prototype.play = function () {
            console.log("vroom!!");
        };
        return ToyCar;
    }());
    var ToyProductionPlant = /** @class */ (function () {
        function ToyProductionPlant() {
        }
        ToyProductionPlant.prototype.makePresents = function () {
            var carA = new ToyCar();
            var carB = new ToyCar();
            var carC = new ToyCar();
            return new Array(carA, carB, carC);
        };
        ToyProductionPlant.prototype.makeAToy = function () {
            return new ToyCar();
        };
        return ToyProductionPlant;
    }());
    var tpp = new ToyProductionPlant();
    var car = tpp.makePresents();
    car.forEach(function (x) { return x.play(); });
})(WhoNeedsAFactory || (WhoNeedsAFactory = {}));
