var SoMuchBetterWithFactory;
(function (SoMuchBetterWithFactory) {
    var ToyCar = /** @class */ (function () {
        function ToyCar() {
        }
        ToyCar.prototype.whatIsIt = function () {
            return "This is a toy car";
        };
        ToyCar.prototype.play = function () {
            return "vroom!!";
        };
        return ToyCar;
    }());
    var ToyBoat = /** @class */ (function () {
        function ToyBoat() {
        }
        ToyBoat.prototype.play = function () {
            return "Off we go!";
        };
        ToyBoat.prototype.whatIsIt = function () {
            return "This is a toy boat";
        };
        return ToyBoat;
    }());
    var BagOfCoal = /** @class */ (function () {
        function BagOfCoal() {
        }
        BagOfCoal.prototype.play = function () {
            return "You now have a dirty face!";
        };
        BagOfCoal.prototype.whatIsIt = function () {
            return "Bag of coal";
        };
        return BagOfCoal;
    }());
    var ToyType;
    (function (ToyType) {
        ToyType[ToyType["car"] = 0] = "car";
        ToyType[ToyType["boat"] = 1] = "boat";
        ToyType[ToyType["coal"] = 2] = "coal";
    })(ToyType || (ToyType = {}));
    //Creator class
    var ToyFactory = /** @class */ (function () {
        function ToyFactory() {
        }
        ToyFactory.prototype.makeAToy = function (typeOfToy) {
            switch (typeOfToy) {
                case ToyType.boat: {
                    return new ToyBoat();
                }
                case ToyType.car: {
                    return new ToyCar();
                }
                case ToyType.coal: {
                    return new BagOfCoal();
                }
            }
        };
        return ToyFactory;
    }());
    var ElvesFactory = /** @class */ (function () {
        function ElvesFactory(toyFactory) {
            this.toyFactory = toyFactory;
        }
        ElvesFactory.prototype.makeToys = function (order) {
            var _this = this;
            order.forEach(function (x) {
                var toy = _this.toyFactory.makeAToy(x);
                console.log(toy.whatIsIt());
                console.log(toy.play());
                console.log();
            });
        };
        return ElvesFactory;
    }());
    var tf = new ToyFactory();
    var toyProductionFacility = new ElvesFactory(tf);
    var order = new Array(ToyType.boat, ToyType.car, ToyType.boat, ToyType.car, ToyType.coal, ToyType.car);
    toyProductionFacility.makeToys(order);
    /*
    let boat = tf.makeAToy(ToyType.boat);
    console.log(boat.whatIsIt());
  
    let car = tf.makeAToy(ToyType.car);
    console.log(car.whatIsIt());
  
    let coal = tf.makeAToy(ToyType.coal);
    console.log(coal.whatIsIt());
  
     So what? We just added another level of complexity.
  
  The answer is that if we need to extend it further to other toys, it'll be easier
  */
})(SoMuchBetterWithFactory || (SoMuchBetterWithFactory = {}));
